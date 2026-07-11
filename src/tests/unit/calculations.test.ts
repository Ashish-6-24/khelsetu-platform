import {
  calculateEconomy,
  calculateRunRate,
  calculateStrikeRate,
} from '@shared/utils/calculations';
import { describe, expect, it } from 'vitest';

describe('Cricket Calculations', () => {
  describe('calculateRunRate', () => {
    it('should calculate run rate correctly', () => {
      expect(calculateRunRate(150, 20)).toBe(7.5);
    });

    it('should return 0 for zero overs', () => {
      expect(calculateRunRate(100, 0)).toBe(0);
    });
  });

  describe('calculateStrikeRate', () => {
    it('should calculate strike rate correctly', () => {
      expect(calculateStrikeRate(50, 30)).toBeCloseTo(166.67, 2);
    });

    it('should return 0 for zero balls', () => {
      expect(calculateStrikeRate(50, 0)).toBe(0);
    });
  });

  describe('calculateEconomy', () => {
    it('should calculate economy rate correctly', () => {
      expect(calculateEconomy(30, 4)).toBe(7.5);
    });

    it('should return 0 for zero overs', () => {
      expect(calculateEconomy(20, 0)).toBe(0);
    });
  });
});
