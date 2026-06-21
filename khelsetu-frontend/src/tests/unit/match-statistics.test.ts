import type {
  PlayerMatchStat,
  TeamStatistics,
} from '@features/match-statistics/types';
import {
  calculatePassAccuracy,
  calculatePlayerRating,
  calculatePossession,
  getRatingBg,
  getRatingColor,
  sortPlayersByRating,
} from '@features/match-statistics/utils/statCalculations';
import { describe, expect, it } from 'vitest';

describe('Stat Calculations', () => {
  describe('calculatePossession', () => {
    it('should calculate possession correctly', () => {
      const teamA: TeamStatistics = { totalPasses: 300 } as TeamStatistics;
      const teamB: TeamStatistics = { totalPasses: 200 } as TeamStatistics;

      const possession = calculatePossession(teamA, teamB);
      expect(possession.teamA).toBe(60);
      expect(possession.teamB).toBe(40);
    });

    it('should handle equal passes', () => {
      const teamA: TeamStatistics = { totalPasses: 100 } as TeamStatistics;
      const teamB: TeamStatistics = { totalPasses: 100 } as TeamStatistics;

      const possession = calculatePossession(teamA, teamB);
      expect(possession.teamA).toBe(50);
      expect(possession.teamB).toBe(50);
    });

    it('should handle zero passes', () => {
      const teamA: TeamStatistics = { totalPasses: 0 } as TeamStatistics;
      const teamB: TeamStatistics = { totalPasses: 0 } as TeamStatistics;

      const possession = calculatePossession(teamA, teamB);
      expect(possession.teamA).toBe(50);
      expect(possession.teamB).toBe(50);
    });
  });

  describe('calculatePassAccuracy', () => {
    it('should calculate pass accuracy correctly', () => {
      expect(calculatePassAccuracy(80, 100)).toBe(80);
      expect(calculatePassAccuracy(75, 100)).toBe(75);
    });

    it('should handle zero total passes', () => {
      expect(calculatePassAccuracy(0, 0)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(calculatePassAccuracy(1, 3)).toBe(33);
    });
  });

  describe('calculatePlayerRating', () => {
    it('should calculate player rating correctly', () => {
      const stat: PlayerMatchStat = {
        goals: 2,
        assists: 1,
        passAccuracy: 85,
        tackles: 5,
        interceptions: 3,
        saves: 0,
        yellowCards: 0,
        redCards: 0,
        shotsOnTarget: 3,
        rating: 0,
      } as PlayerMatchStat;

      const rating = calculatePlayerRating(stat);
      expect(rating).toBeGreaterThanOrEqual(0);
      expect(rating).toBeLessThanOrEqual(10);
    });

    it('should penalize cards', () => {
      const statWithYellow: PlayerMatchStat = {
        goals: 0,
        assists: 0,
        passAccuracy: 70,
        tackles: 2,
        interceptions: 1,
        saves: 0,
        yellowCards: 1,
        redCards: 0,
        shotsOnTarget: 0,
        rating: 0,
      } as PlayerMatchStat;

      const statWithoutCards: PlayerMatchStat = {
        ...statWithYellow,
        yellowCards: 0,
      };

      const ratingWith = calculatePlayerRating(statWithYellow);
      const ratingWithout = calculatePlayerRating(statWithoutCards);
      expect(ratingWith).toBeLessThan(ratingWithout);
    });

    it('should reward goals', () => {
      const statWithGoals: PlayerMatchStat = {
        goals: 3,
        assists: 0,
        passAccuracy: 70,
        tackles: 2,
        interceptions: 1,
        saves: 0,
        yellowCards: 0,
        redCards: 0,
        shotsOnTarget: 5,
        rating: 0,
      } as PlayerMatchStat;

      const statWithoutGoals: PlayerMatchStat = {
        ...statWithGoals,
        goals: 0,
      };

      const ratingWith = calculatePlayerRating(statWithGoals);
      const ratingWithout = calculatePlayerRating(statWithoutGoals);
      expect(ratingWith).toBeGreaterThan(ratingWithout);
    });
  });

  describe('getRatingColor', () => {
    it('should return correct color for high rating', () => {
      const color = getRatingColor(9);
      expect(color).toContain('emerald');
    });

    it('should return correct color for medium rating', () => {
      const color = getRatingColor(7);
      expect(color).toContain('amber');
    });

    it('should return correct color for low rating', () => {
      const color = getRatingColor(3);
      expect(color).toContain('red');
    });
  });

  describe('getRatingBg', () => {
    it('should return correct background for high rating', () => {
      const bg = getRatingBg(9);
      expect(bg).toContain('emerald');
    });

    it('should return correct background for medium rating', () => {
      const bg = getRatingBg(7);
      expect(bg).toContain('amber');
    });
  });

  describe('sortPlayersByRating', () => {
    it('should sort players by rating descending', () => {
      const players = [
        { rating: 7.5 } as PlayerMatchStat,
        { rating: 9.2 } as PlayerMatchStat,
        { rating: 6.8 } as PlayerMatchStat,
      ];

      const sorted = sortPlayersByRating(players);
      expect(sorted[0]?.rating).toBe(9.2);
      expect(sorted[1]?.rating).toBe(7.5);
      expect(sorted[2]?.rating).toBe(6.8);
    });

    it('should not mutate original array', () => {
      const players = [
        { rating: 7.5 } as PlayerMatchStat,
        { rating: 9.2 } as PlayerMatchStat,
      ];

      const original = [...players];
      sortPlayersByRating(players);
      expect(players).toEqual(original);
    });
  });
});
