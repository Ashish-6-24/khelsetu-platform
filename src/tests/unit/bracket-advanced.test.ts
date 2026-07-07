import type { BracketTeam } from '@features/brackets/types';
import {
  advanceWinner,
  generateDoubleElimination,
  generateRoundRobin,
  generateSingleElimination,
} from '@features/brackets/utils/bracketGenerator';
import { describe, expect, it } from 'vitest';

const createTeam = (id: string, name: string): BracketTeam => ({
  id,
  name,
  shortName: name.substring(0, 3).toUpperCase(),
});

describe('Bracket Generator', () => {
  describe('generateSingleElimination', () => {
    it('should generate a single elimination bracket for 4 teams', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateSingleElimination(teams);

      expect(bracket).toBeDefined();
      expect(bracket.format).toBe('single-elimination');
      expect(bracket.rounds).toHaveLength(2); // Semi-finals and Final
      expect(bracket.totalMatches).toBe(3);
      expect(bracket.champion).toBeNull();
    });

    it('should generate a single elimination bracket for 8 teams', () => {
      const teams = Array.from({ length: 8 }, (_, i) =>
        createTeam(String(i + 1), `Team ${String.fromCharCode(65 + i)}`),
      );
      const bracket = generateSingleElimination(teams);

      expect(bracket.rounds).toHaveLength(3); // Quarter, Semi, Final
      expect(bracket.totalMatches).toBe(7);
    });

    it('should handle power of 2 teams correctly', () => {
      const teams = [createTeam('1', 'Team A'), createTeam('2', 'Team B')];
      const bracket = generateSingleElimination(teams);

      expect(bracket.rounds).toHaveLength(1);
      expect(bracket.totalMatches).toBe(1);
    });

    it('should assign round names correctly', () => {
      const teams = Array.from({ length: 8 }, (_, i) =>
        createTeam(String(i + 1), `Team ${String.fromCharCode(65 + i)}`),
      );
      const bracket = generateSingleElimination(teams);

      expect(bracket.rounds[0]?.name).toBe('Quarter-Final');
      expect(bracket.rounds[1]?.name).toBe('Semi-Final');
      expect(bracket.rounds[2]?.name).toBe('Final');
    });
  });

  describe('generateDoubleElimination', () => {
    it('should generate a double elimination bracket', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateDoubleElimination(teams);

      expect(bracket).toBeDefined();
      expect(bracket.format).toBe('double-elimination');
      expect(bracket.rounds.length).toBeGreaterThan(2);
      expect(bracket.totalMatches).toBeGreaterThan(3);
    });
  });

  describe('generateRoundRobin', () => {
    it('should generate a round robin bracket for 4 teams', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateRoundRobin(teams);

      expect(bracket).toBeDefined();
      expect(bracket.format).toBe('round-robin');
      expect(bracket.rounds).toHaveLength(3); // n-1 rounds for n teams
      expect(bracket.totalMatches).toBe(6); // n*(n-1)/2 matches
    });

    it('should generate correct number of matches per round', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateRoundRobin(teams);

      bracket.rounds.forEach((round) => {
        expect(round.matches).toHaveLength(2); // n/2 matches per round
      });
    });
  });

  describe('advanceWinner', () => {
    it('should advance winner to next match', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateSingleElimination(teams);
      const firstMatch = bracket.rounds[0]?.matches[0];

      const updatedBracket = advanceWinner(
        bracket,
        firstMatch?.id ?? '',
        'teamA',
      );
      const updatedMatch = updatedBracket.rounds[0]?.matches.find(
        (m) => m.id === firstMatch?.id,
      );

      expect(updatedMatch?.winner).toBe('teamA');
      expect(updatedMatch?.status).toBe('completed');
    });

    it('should propagate winner to next round', () => {
      const teams = [
        createTeam('1', 'Team A'),
        createTeam('2', 'Team B'),
        createTeam('3', 'Team C'),
        createTeam('4', 'Team D'),
      ];
      const bracket = generateSingleElimination(teams);
      const firstMatch = bracket.rounds[0]?.matches[0];

      const updatedBracket = advanceWinner(
        bracket,
        firstMatch?.id ?? '',
        'teamA',
      );
      const secondRoundMatch = updatedBracket.rounds[1]?.matches[0];

      expect(secondRoundMatch?.teamA).toBeDefined();
    });
  });
});
