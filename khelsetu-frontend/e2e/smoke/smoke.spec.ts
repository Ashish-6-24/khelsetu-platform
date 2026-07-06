import { expect, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('smoke: landing page loads', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/KhelSetu/);
    await expect(
      page.getByRole('heading', { name: /tournament/i }).first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('smoke: login page loads', async ({ page }) => {
    const response = await page.goto('/auth/login');
    expect(response?.status()).toBeLessThan(400);
    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('smoke: register page loads', async ({ page }) => {
    const response = await page.goto('/auth/register');
    expect(response?.status()).toBeLessThan(400);
    await expect(
      page.getByRole('heading', { name: /create your account/i }),
    ).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel('Full name')).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('smoke: tournaments page loads', async ({ page }) => {
    const response = await page.goto('/tournaments');
    expect(response?.status()).toBeLessThan(400);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('smoke: teams page loads', async ({ page }) => {
    const response = await page.goto('/teams');
    expect(response?.status()).toBeLessThan(400);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('smoke: 404 page works', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-12345');
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('smoke: no console errors on landing', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('manifest'),
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('smoke: navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLinks = page.getByRole('link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
