import { test } from '../helpers/a11y-fixture';
import { expectNoCriticalA11yViolations } from '../helpers/a11y-utils';

const PUBLIC_ROUTES = [
  { name: 'Landing', path: '/' },
  { name: 'Login', path: '/auth/login' },
  { name: 'Register', path: '/auth/register' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Tournaments', path: '/tournaments' },
  { name: 'Teams', path: '/teams' },
  { name: 'Standings', path: '/standings' },
  { name: 'Not Found', path: '/nonexistent-route-404' },
];

for (const { name, path } of PUBLIC_ROUTES) {
  test(`a11y: ${name} (${path})`, async ({ page, makeAxeBuilder }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expectNoCriticalA11yViolations(makeAxeBuilder(), name);
    await expect(page).toHaveURL(new RegExp(path));
  });
}
