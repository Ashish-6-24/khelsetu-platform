import { expect, test } from '@playwright/test';

const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 375, height: 812 },
};

const PUBLIC_PAGES = [
  { name: 'landing', path: '/' },
  { name: 'login', path: '/auth/login' },
  { name: 'register', path: '/auth/register' },
  { name: 'tournaments', path: '/tournaments' },
  { name: 'teams', path: '/teams' },
  { name: 'standings', path: '/standings' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
];

for (const { name, path } of PUBLIC_PAGES) {
  test(`visual: ${name} (desktop)`, async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test(`visual: ${name} (mobile)`, async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}

test('visual: landing (dark mode)', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.desktop);
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  await expect(page).toHaveScreenshot('landing-dark-desktop.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});

test('visual: login (dark mode)', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.desktop);
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);

  await expect(page).toHaveScreenshot('login-dark-desktop.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
