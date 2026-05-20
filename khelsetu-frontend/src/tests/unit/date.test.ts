import {
  formatDate,
  formatRelativeTime,
  formatTime,
  isDatePassed,
  isDateToday,
} from '@utils/date';
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

  describe('formatRelativeTime', () => {
    it('should return relative time for past dates', () => {
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      const formatted = formatRelativeTime(pastDate);
      expect(formatted).toContain('ago');
    });

    it('should return relative time for future dates', () => {
      const futureDate = new Date(
        Date.now() + 2 * 60 * 60 * 1000,
      ).toISOString();
      const formatted = formatRelativeTime(futureDate);
      expect(formatted).toContain('in');
    });
  });

  describe('isDateToday', () => {
    it('should return true for today', () => {
      expect(isDateToday(new Date())).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isDateToday(yesterday)).toBe(false);
    });
  });

  describe('isDatePassed', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isDatePassed(pastDate)).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      expect(isDatePassed(futureDate)).toBe(false);
    });
  });
});
