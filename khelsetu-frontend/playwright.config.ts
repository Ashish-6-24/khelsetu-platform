import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: [/\/visual\//, /\/smoke\//],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: process.env.CI
    ? [['blob'], ['github']]
    : [['html', { open: 'on-failure' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  projects: [
    // Functional tests — cross-browser
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/a11y\//, /visual\//, /smoke\//],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [/a11y\//, /visual\//, /smoke\//],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: [/a11y\//, /visual\//, /smoke\//],
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: [/a11y\//, /visual\//, /smoke\//],
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testIgnore: [/a11y\//, /visual\//, /smoke\//],
    },

    // A11y tests — public pages (no auth)
    {
      name: 'a11y-public',
      testMatch: /a11y\/public-pages\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // A11y tests — dashboard pages
    {
      name: 'a11y-dashboard',
      testMatch: /a11y\/dashboard-pages\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Auth setup
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
  ],

  webServer: {
    command: process.env.CI ? 'npm run preview' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  globalTimeout: process.env.CI ? 1_800_000 : undefined,
});
