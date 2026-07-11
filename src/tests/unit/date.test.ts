import { formatDate, formatTime } from '@shared/utils/date';
import { describe, expect, it } from 'vitest';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2026-05-19T00:00:00.000Z';
      const formatted = formatDate(date);
      expect(formatted).toBe('May 19, 2026');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = '2026-05-19T14:30:00.000Z';
      const formatted = formatTime(date);
      expect(formatted).toMatch(/\d{1,2}:\d{2}/);
    });
  });
});
