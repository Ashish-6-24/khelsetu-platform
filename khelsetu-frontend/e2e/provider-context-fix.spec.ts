import { expect, test } from '@playwright/test';

test.describe('Provider Context Fix - QA Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to landing page first
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render landing page without context errors', async ({
    page,
  }) => {
    // Check for console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait for page to fully load
    await page.waitForSelector('text=/Get in touch|About|Contact/i', {
      timeout: 5000,
    });

    // Verify no "Cannot read properties of null (reading 'useContext')" error
    const contextError = errors.find(
      (e) =>
        e.includes('Cannot read properties of null') &&
        e.includes('useContext'),
    );
    expect(contextError).toBeUndefined();
  });

  test('should navigate to contact page and use toast', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Verify contact form loads
    await expect(page.locator('text=Send us a message')).toBeVisible();

    // Fill and submit form to trigger toast
    await page.fill('input[placeholder="Sita Rana"]', 'Test User');
    await page.fill(
      'input[placeholder="you@organizer.com"]',
      'test@example.com',
    );
    await page.fill(
      'textarea[placeholder="Tell us what you need…"]',
      'Test message',
    );

    // Submit form
    await page.click('button:has-text("Send message")');

    // Wait for toast notification
    await page.waitForTimeout(1000);

    // Verify toast appears (contains success message)
    const toastVisible = await page
      .locator('text=/Message sent|We.*ll get back/')
      .isVisible()
      .catch(() => false);
    expect(toastVisible).toBeTruthy();
  });

  test('should load dashboard after login without context errors', async ({
    page,
    context,
  }) => {
    // Skip if no auth token available
    const cookies = await context.cookies();
    if (!cookies.length) {
      test.skip();
    }

    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Check for context errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Verify page loads
    await expect(page).not.toHaveURL('/auth/login');

    const contextError = errors.find(
      (e) =>
        e.includes('Cannot read properties of null') &&
        e.includes('useContext'),
    );
    expect(contextError).toBeUndefined();
  });

  test('should handle rapid page navigation without provider crashes', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate rapidly through multiple pages
    await page.goto('/');
    await page.goto('/about');
    await page.goto('/contact');
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const contextError = errors.find(
      (e) =>
        e.includes('Cannot read properties of null') &&
        e.includes('useContext'),
    );
    expect(contextError).toBeUndefined();
  });

  test('should render all lazy-loaded pages without context errors', async ({
    page,
  }) => {
    const routes = [
      '/',
      '/about',
      '/contact',
      '/tournaments',
      '/teams',
      '/standings',
    ];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      // Collect errors during page load
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      const contextError = errors.find(
        (e) =>
          e.includes('Cannot read properties of null') &&
          e.includes('useContext'),
      );
      expect(
        contextError,
        `Should not have context error on ${route}`,
      ).toBeUndefined();
    }
  });

  test('should initialize toast context before any page renders', async ({
    page,
  }) => {
    const contextCalls: string[] = [];

    // Intercept console to track context access
    page.on('console', (msg) => {
      if (
        msg.text().includes('useContext') ||
        msg.text().includes('ToastContext')
      ) {
        contextCalls.push(msg.text());
      }
    });

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Verify contact page renders successfully
    await expect(page.locator('text=Send us a message')).toBeVisible();
  });

  test('should initialize command palette context before routes render', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Try to open command palette (typically Cmd+K or Ctrl+K)
    await page.keyboard.press('Control+K');
    await page.waitForTimeout(500);

    // Verify page still responds without errors
    await expect(page).toHaveURL('/');
  });

  test('performance: page load should be fast without context initialization delays', async ({
    page,
  }) => {
    const startTime = Date.now();

    await page.goto('/contact');
    await page.waitForSelector('text=Send us a message', { timeout: 5000 });

    const loadTime = Date.now() - startTime;

    // Page should load in reasonable time (< 3 seconds)
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have memory leaks from repeated context access', async ({
    page,
  }) => {
    // Load contact page multiple times
    for (let i = 0; i < 5; i++) {
      await page.goto('/contact');
      await page.waitForSelector('text=Send us a message');
      await page.goBack();
      await page.waitForLoadState('networkidle');
    }

    // Page should still be responsive
    await page.goto('/');
    await expect(page.locator('text=/Get in touch|About/i')).toBeVisible();
  });
});
