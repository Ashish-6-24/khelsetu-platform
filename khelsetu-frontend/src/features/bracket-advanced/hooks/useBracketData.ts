import { useCallback, useMemo, useState } from 'react';

import type { BracketData, BracketFormat, BracketTeam } from '../types';
import {
  advanceWinner as advanceWinnerUtil,
  generateDoubleElimination,
  generateRoundRobin,
  generateSingleElimination,
} from '../utils/bracketGenerator';

interface UseBracketDataOptions {
  format: BracketFormat;
  teams: BracketTeam[];
  existingMatches?: BracketData;
}

interface UseBracketDataReturn {
  bracket: BracketData | null;
  advanceWinner: (
    matchId: string,
    winner: 'teamA' | 'teamB',
  ) => void;
  stats: {
    totalMatches: number;
    completedMatches: number;
    completionPercent: number;
    totalRounds: number;
  };
}

export function useBracketData({
  format,
  teams,
  existingMatches,
}: UseBracketDataOptions): UseBracketDataReturn {
  const [bracket, setBracket] = useState<BracketData | null>(
    existingMatches ?? null,
  );

  const generated = useMemo(() => {
    if (existingMatches) return existingMatches;

    switch (format) {
      case 'single-elimination':
      case 'knockout':
        return generateSingleElimination(teams);
      case 'double-elimination':
        return generateDoubleElimination(teams);
      case 'round-robin':
      case 'group-to-knockout':
        return generateRoundRobin(teams);
      default:
        return generateSingleElimination(teams);
    }
  }, [format, teams, existingMatches]);

  const activeBracket = bracket ?? generated;

  const advanceWinner = useCallback(
    (matchId: string, winner: 'teamA' | 'teamB') => {
      setBracket((prev) => {
        const base = prev ?? generated;
        return advanceWinnerUtil(base, matchId, winner);
      });
    },
    [generated],
  );

  const stats = useMemo(() => {
    if (!activeBracket) {
      return {
        totalMatches: 0,
        completedMatches: 0,
        completionPercent: 0,
        totalRounds: 0,
      };
    }

    const total = activeBracket.totalMatches;
    const completed = activeBracket.completedMatches;

    return {
      totalMatches: total,
      completedMatches: completed,
      completionPercent:
        total > 0 ? Math.round((completed / total) * 100) : 0,
      totalRounds: activeBracket.rounds.length,
    };
  }, [activeBracket]);

  return {
    bracket: activeBracket,
    advanceWinner,
    stats,
  };
}
