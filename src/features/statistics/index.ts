export {
  StatisticsDashboard,
  StatisticsDashboardSkeleton,
  StatisticsDashboardEmpty,
} from './components/StatisticsDashboard';
export { StatComparisonBar } from './components/StatComparisonBar';
// StatChart is lazy-loaded in StatisticsDashboard — no barrel re-export needed
export { PlayerStatsTable } from './components/PlayerStatsTable';
export { useMatchStatistics } from './hooks/useMatchStatistics';
export type { MatchStatistics, TeamStatistics, PlayerMatchStat } from './types';
