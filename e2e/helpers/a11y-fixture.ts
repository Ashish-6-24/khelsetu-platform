import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

type AxeFixture = {
  makeAxeBuilder: (options?: {
    include?: string | string[];
    exclude?: string | string[];
  }) => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const builder = (options?: {
      include?: string | string[];
      exclude?: string | string[];
    }) => {
      const axe = new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ]);

      if (options?.include) axe.include(options.include);
      if (options?.exclude) axe.exclude(options.exclude);
      return axe;
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks -- Playwright fixture `use`, not React hook
    await use(builder);
  },
});

export { expect } from '@playwright/test';
