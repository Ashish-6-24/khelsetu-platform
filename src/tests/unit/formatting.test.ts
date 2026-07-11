import { capitalize, formatCurrency, truncate } from '@shared/utils/formatting';
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
});
