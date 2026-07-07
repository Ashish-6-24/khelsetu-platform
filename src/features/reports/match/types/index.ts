import type { LiveMatchEvent } from '@features/events/types';

export interface MatchReport {
  id: string;
  matchId: string;
  title: string;
  finalScore: { teamA: number; teamB: number };
  summary: string;
  goals: LiveMatchEvent[];
  cards: LiveMatchEvent[];
  substitutions: LiveMatchEvent[];
  statistics: {
    possession: { teamA: number; teamB: number };
    shots: { teamA: number; teamB: number };
    corners: { teamA: number; teamB: number };
    fouls: { teamA: number; teamB: number };
  };
  highlights: string[];
  playerPerformance: Array<{
    playerId: string;
    playerName: string;
    teamName: string;
    rating: number;
    highlights: string[];
  }>;
  publishedAt?: string;
  isPublished: boolean;
}
