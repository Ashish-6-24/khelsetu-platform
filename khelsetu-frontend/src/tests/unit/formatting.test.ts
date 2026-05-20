import {
  capitalize,
  formatCurrency,
  formatNumber,
  formatPercentage,
  pluralize,
  slugify,
  truncate,
} from '@utils/formatting';
import { describe, expect, it } from 'vitest';

describe('Formatting Utilities', () => {
  describe('formatCurrency', () => {
    it('should format number as INR currency', () => {
      expect(formatCurrency(1000)).toBe('₹1,000');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('₹0');
    });

    it('should handle decimals', () => {
      expect(formatCurrency(99.99)).toBe('₹99.99');
    });
  });

  describe('formatNumber', () => {
    it('should format large numbers with Indian locale', () => {
      expect(formatNumber(1000000)).toBe('10,00,000');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(42)).toBe('42');
    });
  });

  describe('formatPercentage', () => {
    it('should format number as percentage', () => {
      expect(formatPercentage(0.75)).toBe('0.8%');
    });

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('0.0%');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });
  });

  describe('slugify', () => {
    it('should convert to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello! @World#')).toBe('hello-world');
    });
  });

  describe('pluralize', () => {
    it('should return singular for count 1', () => {
      expect(pluralize(1, 'team', 'teams')).toBe('team');
    });

    it('should return plural for count > 1', () => {
      expect(pluralize(5, 'team', 'teams')).toBe('teams');
    });

    it('should return plural for count 0', () => {
      expect(pluralize(0, 'team', 'teams')).toBe('teams');
    });
  });
});
