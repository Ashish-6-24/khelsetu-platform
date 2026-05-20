import { expect, test } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/KhelSetu/);
    await expect(
      page.getByRole('heading', {
        name: /Complete Sports Tournament Management/,
      }),
    ).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Live Scoring')).toBeVisible();
    await expect(page.getByText('Tournament Management')).toBeVisible();
    await expect(page.getByText('OBS Overlays')).toBeVisible();
  });

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page).toHaveURL(/\/auth\/register/);
  });
});
