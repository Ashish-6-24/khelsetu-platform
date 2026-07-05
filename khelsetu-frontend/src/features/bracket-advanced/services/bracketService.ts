import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
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
      API_ENDPOINTS.BRACKETS.SAVE(tournamentId),
      bracket,
    );
    return response.data;
  },

  loadBracket: async (tournamentId: string): Promise<BracketData | null> => {
    const response = await api.get<BracketData>(
      API_ENDPOINTS.BRACKETS.GET(tournamentId),
    );
    return response.data;
  },

  updateMatchResult: async (
    tournamentId: string,
    matchId: string,
    winner: 'teamA' | 'teamB',
    scoreA: number | null,
    scoreB: number | null,
  ): Promise<BracketData> => {
    const response = await api.patch<BracketData>(
      API_ENDPOINTS.BRACKETS.UPDATE_MATCH(tournamentId, matchId),
      { winner, scoreA, scoreB },
    );
    return response.data;
  },
};
