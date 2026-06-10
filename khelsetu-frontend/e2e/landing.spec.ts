import { expect, test } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/KhelSetu/);
    await expect(
      page.getByRole('heading', {
        name: /Run your local tournament/,
      }),
    ).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/#features');
    await expect(
      page.getByRole('heading', { name: /Live scoring, ball by ball/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Smart brackets' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Broadcast overlays' }),
    ).toBeVisible();
  });

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: 'Start a tournament' })
      .first()
      .click();
    await expect(page).toHaveURL(/\/auth\/register/);
  });
});
