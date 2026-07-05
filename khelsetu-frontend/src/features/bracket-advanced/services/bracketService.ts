import { api } from '@lib/axios';
import type { BracketData, BracketTeam } from '../types';
import {
  generateDoubleElimination,
  generateRoundRobin,
  generateSingleElimination,
} from '../utils/bracketGenerator';

export const bracketService = {
  generateBracket: (
    format: 'single-elimination' | 'double-elimination' | 'round-robin',
    teams: BracketTeam[],
  ): BracketData => {
    switch (format) {
      case 'single-elimination':
        return generateSingleElimination(teams);
      case 'double-elimination':
        return generateDoubleElimination(teams);
      case 'round-robin':
        return generateRoundRobin(teams);
      default:
        return generateSingleElimination(teams);
    }
  },

  saveBracket: async (
    tournamentId: string,
    bracket: BracketData,
  ): Promise<BracketData> => {
    const response = await api.post<BracketData>(
      `/tournaments/${tournamentId}/bracket`,
      bracket,
    );
    return response.data;
  },

  loadBracket: async (tournamentId: string): Promise<BracketData | null> => {
    try {
      const response = await api.get<BracketData>(
        `/tournaments/${tournamentId}/bracket`,
      );
      return response.data;
    } catch {
      return null;
    }
  },

  updateMatchResult: async (
    tournamentId: string,
    matchId: string,
    winner: 'teamA' | 'teamB',
    scoreA: number | null,
    scoreB: number | null,
  ): Promise<BracketData> => {
    const response = await api.patch<BracketData>(
      `/tournaments/${tournamentId}/bracket/matches/${matchId}`,
      { winner, scoreA, scoreB },
    );
    return response.data;
  },
};
