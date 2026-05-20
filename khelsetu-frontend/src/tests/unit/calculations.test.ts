import {
  calculateEconomy,
  calculateNRR,
  calculatePoints,
  calculateRunRate,
  calculateStrikeRate,
  calculateWinProbability,
} from '@utils/calculations';
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

  describe('calculateNRR', () => {
    it('should calculate NRR correctly', () => {
      const nrr = calculateNRR(250, 45, 240, 50);
      expect(nrr).toBeCloseTo(0.756, 2);
    });

    it('should return 0 for zero overs', () => {
      const nrr = calculateNRR(200, 0, 180, 50);
      expect(nrr).toBe(0);
    });
  });

  describe('calculateWinProbability', () => {
    it('should return 100 when target reached', () => {
      expect(calculateWinProbability(200, 200, 30, 5)).toBe(100);
    });

    it('should return 0 when no balls remaining', () => {
      expect(calculateWinProbability(150, 200, 0, 5)).toBe(0);
    });

    it('should return 0 when no wickets remaining', () => {
      expect(calculateWinProbability(150, 200, 30, 0)).toBe(0);
    });

    it('should return probability between 0 and 100', () => {
      const prob = calculateWinProbability(150, 200, 30, 5);
      expect(prob).toBeGreaterThanOrEqual(0);
      expect(prob).toBeLessThanOrEqual(100);
    });
  });

  describe('calculatePoints', () => {
    it('should award 2 points for a win', () => {
      expect(calculatePoints(1, 0, 0)).toBe(2);
    });

    it('should award 1 point for a draw', () => {
      expect(calculatePoints(0, 0, 1)).toBe(1);
    });

    it('should award 0 points for a loss', () => {
      expect(calculatePoints(0, 1, 0)).toBe(0);
    });

    it('should calculate total points for multiple matches', () => {
      expect(calculatePoints(3, 2, 1)).toBe(7);
    });
  });
});
