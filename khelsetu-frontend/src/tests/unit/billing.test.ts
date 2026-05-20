import { describe, expect, it } from 'vitest';

const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const getPlanPriority = (planName: string): number => {
  const priorities: Record<string, number> = {
    free: 0,
    basic: 1,
    pro: 2,
    enterprise: 3,
  };
  return priorities[planName.toLowerCase()] ?? -1;
};

describe('Billing Utilities', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(10)).toBe('$10.00');
    expect(formatCurrency(99.99)).toBe('$99.99');
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should format different currencies', () => {
    expect(formatCurrency(10, 'NPR')).toContain('NPR');
    expect(formatCurrency(10, 'EUR')).toContain('€');
  });

  it('should return correct plan priority', () => {
    expect(getPlanPriority('free')).toBe(0);
    expect(getPlanPriority('basic')).toBe(1);
    expect(getPlanPriority('pro')).toBe(2);
    expect(getPlanPriority('enterprise')).toBe(3);
  });

  it('should return -1 for unknown plan', () => {
    expect(getPlanPriority('unknown')).toBe(-1);
  });
});
