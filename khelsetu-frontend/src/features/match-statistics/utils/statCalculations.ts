import type { PlayerMatchStat, TeamStatistics } from '../types';

export function calculatePossession(
  teamA: TeamStatistics,
  teamB: TeamStatistics,
): { teamA: number; teamB: number } {
  const total = teamA.totalPasses + teamB.totalPasses;
  if (total === 0) return { teamA: 50, teamB: 50 };
  return {
    teamA: Math.round((teamA.totalPasses / total) * 100),
    teamB: 100 - Math.round((teamA.totalPasses / total) * 100),
  };
}

export function calculatePassAccuracy(
  successful: number,
  total: number,
): number {
  if (total === 0) return 0;
  return Math.round((successful / total) * 100);
}

export function calculatePlayerRating(stat: PlayerMatchStat): number {
  let rating = 5.0;

  rating += stat.goals * 1.5;
  rating += stat.assists * 1.0;
  rating += stat.passAccuracy * 0.02;
  rating += stat.tackles * 0.3;
  rating += stat.interceptions * 0.3;
  rating += stat.saves * 0.5;
  rating -= stat.yellowCards * 0.5;
  rating -= stat.redCards * 1.5;
  rating += Math.min(stat.shotsOnTarget * 0.2, 1.0);

  return Math.max(0, Math.min(10, Math.round(rating * 10) / 10));
}

export function getRatingColor(rating: number): string {
  if (rating >= 8) return 'text-emerald-600 dark:text-emerald-400';
  if (rating >= 6) return 'text-amber-600 dark:text-amber-400';
  if (rating >= 4) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

export function getRatingBg(rating: number): string {
  if (rating >= 8) return 'bg-emerald-100 dark:bg-emerald-900/30';
  if (rating >= 6) return 'bg-amber-100 dark:bg-amber-900/30';
  if (rating >= 4) return 'bg-orange-100 dark:bg-orange-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

export function sortPlayersByRating(
  players: PlayerMatchStat[],
): PlayerMatchStat[] {
  return [...players].sort((a, b) => b.rating - a.rating);
}
