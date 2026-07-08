import { expect, test } from '../helpers/a11y-fixture';
import { expectNoCriticalA11yViolations } from '../helpers/a11y-utils';

const DASHBOARD_ROUTES = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Settings', path: '/settings' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Analytics', path: '/analytics' },
];

for (const { name, path } of DASHBOARD_ROUTES) {
  test(`a11y: ${name} (${path})`, async ({ page, makeAxeBuilder }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expectNoCriticalA11yViolations(makeAxeBuilder(), name);
    await expect(page).toHaveURL(new RegExp(path));
  });
}
