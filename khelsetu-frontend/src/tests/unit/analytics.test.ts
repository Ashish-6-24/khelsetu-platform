import { describe, expect, it } from 'vitest';

const getDateRange = (filter: string): { start: Date; end: Date } => {
  const end = new Date();
  const start = new Date();
  switch (filter) {
    case '7d':
      start.setDate(end.getDate() - 7);
      break;
    case '30d':
      start.setDate(end.getDate() - 30);
      break;
    case '90d':
      start.setDate(end.getDate() - 90);
      break;
    default:
      start.setFullYear(2000);
  }
  return { start, end };
};

describe('Analytics Date Range', () => {
  it('should return 7 day range', () => {
    const range = getDateRange('7d');
    const diffDays = Math.round((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBe(7);
  });

  it('should return 30 day range', () => {
    const range = getDateRange('30d');
    const diffDays = Math.round((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBe(30);
  });

  it('should return 90 day range', () => {
    const range = getDateRange('90d');
    const diffDays = Math.round((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBe(90);
  });

  it('should return all-time range for unknown filter', () => {
    const range = getDateRange('all');
    expect(range.start.getFullYear()).toBe(2000);
  });

  it('should have end date as today', () => {
    const range = getDateRange('30d');
    const today = new Date();
    expect(range.end.toDateString()).toBe(today.toDateString());
  });
});
