/* eslint-disable no-console */
/**
 * UI Audit Script v2 — Playwright + Visual Review
 * Correct routes, dark mode via localStorage, proper login flow.
 */
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3000';
const SCREENSHOT_DIR = join(__dirname, 'screenshots');
const EMAIL = 'asussubedi321@gmail.com';
const PASSWORD = 'asussubedi321@gmail.com';

mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function audit() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Collect console errors
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Helper: set dark mode via localStorage + DOM
  async function setDarkMode() {
    await page.evaluate(() => {
      localStorage.setItem('khelsetu-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    });
    await page.waitForTimeout(300);
  }

  // ──── 1. Landing page (light) ────
  console.log('1. Landing page (light)...');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '01-landing-light.png'),
    fullPage: true,
  });

  // ──── 2. Landing page (dark) ────
  console.log('2. Landing page (dark)...');
  await setDarkMode();
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '02-landing-dark.png'),
    fullPage: true,
  });

  // ──── 3. Login page (dark) ────
  console.log('3. Login page (dark)...');
  await page.goto(`${BASE}/auth/login`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '03-login-dark.png'),
    fullPage: true,
  });

  // ──── 4. Fill login form ────
  console.log('4. Filling login form...');
  const emailInput = page
    .locator(
      'input[type="email"], input[name="email"], input[placeholder*="email" i]',
    )
    .first();
  const passwordInput = page
    .locator('input[type="password"], input[name="password"]')
    .first();

  await emailInput.waitFor({ timeout: 5000 });
  await emailInput.fill(EMAIL);
  await page.waitForTimeout(200);
  await passwordInput.fill(PASSWORD);
  await page.waitForTimeout(200);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '04-login-filled-dark.png'),
    fullPage: true,
  });

  // ──── 5. Submit login ────
  console.log('5. Submitting login...');
  const submitBtn = page.locator('button[type="submit"]').first();
  if (await submitBtn.isVisible()) {
    await submitBtn.click();
  } else {
    // Try pressing Enter
    await passwordInput.press('Enter');
  }
  await page.waitForTimeout(3000);
  await setDarkMode();
  await page.waitForTimeout(1000);
  const postLoginUrl = page.url();
  console.log(`   Post-login URL: ${postLoginUrl}`);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '05-after-login-dark.png'),
    fullPage: true,
  });

  // ──── 6. Dashboard ────
  console.log('6. Dashboard...');
  await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '06-dashboard-dark.png'),
    fullPage: true,
  });

  // ──── 7. Tournaments ────
  console.log('7. Tournaments...');
  await page.goto(`${BASE}/tournaments`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '07-tournaments-dark.png'),
    fullPage: true,
  });

  // ──── 8. Teams ────
  console.log('8. Teams...');
  await page.goto(`${BASE}/teams`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '08-teams-dark.png'),
    fullPage: true,
  });

  // ──── 9. Scoring ────
  console.log('9. Scoring...');
  await page.goto(`${BASE}/scoring`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '09-scoring-dark.png'),
    fullPage: true,
  });

  // ──── 10. Mobile dashboard ────
  console.log('10. Mobile dashboard...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '10-dashboard-mobile-dark.png'),
    fullPage: true,
  });

  // ──── 11. Mobile landing ────
  console.log('11. Mobile landing...');
  await page.goto(`${BASE}`, { waitUntil: 'networkidle' });
  await setDarkMode();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(SCREENSHOT_DIR, '11-landing-mobile-dark.png'),
    fullPage: true,
  });

  // ──── Report errors ────
  if (errors.length > 0) {
    console.log('\nConsole errors:');
    errors.forEach((e) => console.log(`  ❌ ${e}`));
  } else {
    console.log('\n✅ No console errors');
  }

  await browser.close();
  console.log(`Screenshots saved to ${SCREENSHOT_DIR}`);
}

audit().catch(console.error);
