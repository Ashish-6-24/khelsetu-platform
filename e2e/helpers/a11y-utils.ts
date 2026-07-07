import type { AxeBuilder } from '@axe-core/playwright';

const CRITICAL_AND_SERIOUS = ['critical', 'serious'] as const;

export async function expectNoCriticalA11yViolations(
  axeBuilder: AxeBuilder,
  pageName: string,
) {
  const results = await axeBuilder.analyze();
  const critical = results.violations.filter((v) =>
    CRITICAL_AND_SERIOUS.includes(
      v.impact as (typeof CRITICAL_AND_SERIOUS)[number],
    ),
  );

  if (critical.length > 0) {
    const message = critical
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.help}\n` +
          `  Help: ${v.helpUrl}\n` +
          `  Nodes: ${v.nodes.map((n) => n.html).join('\n        ')}`,
      )
      .join('\n\n');

    throw new Error(
      `A11y violations on ${pageName} (${critical.length} critical/serious):\n\n${message}`,
    );
  }

  const warnings = results.violations.filter(
    (v) =>
      !CRITICAL_AND_SERIOUS.includes(
        v.impact as (typeof CRITICAL_AND_SERIOUS)[number],
      ),
  );
  if (warnings.length > 0) {
    console.warn(
      `[a11y] ${warnings.length} moderate/minor violations on ${pageName}:`,
      warnings.map((v) => `${v.impact}: ${v.id} - ${v.help}`),
    );
  }

  return results;
}
