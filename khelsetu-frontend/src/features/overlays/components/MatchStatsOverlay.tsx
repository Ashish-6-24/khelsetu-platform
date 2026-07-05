import type { Match } from '@shared/types/tournament';
import { motion } from 'framer-motion';

interface MatchStatsOverlayProps {
  match: Match;
}

export function MatchStatsOverlay({ match }: MatchStatsOverlayProps) {
  const teamAInnings = match.score?.teamAInnings?.[0];
  const teamBInnings = match.score?.teamBInnings?.[0];

  const runRate = (innings: typeof teamAInnings) => {
    if (!innings || innings.overs === 0) return '0.00';
    return (innings.runs / innings.overs).toFixed(2);
  };

  const stats = [
    {
      label: `${match.teamA?.name ?? 'Team A'} Run Rate`,
      value: runRate(teamAInnings),
      trend: null,
    },
    {
      label: `${match.teamB?.name ?? 'Team B'} Run Rate`,
      value: runRate(teamBInnings),
      trend: null,
    },
    {
      label: 'Total Wickets',
      value: ((teamAInnings?.wickets ?? 0) + (teamBInnings?.wickets ?? 0)).toString(),
      trend: null,
    },
    {
      label: 'Total Extras',
      value: ((teamAInnings?.extras ?? 0) + (teamBInnings?.extras ?? 0)).toString(),
      trend: null,
    },
  ];

  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">MATCH STATS</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-lg p-3"
          >
            <div className="text-xs text-gray-400">{stat.label}</div>
            <div className="text-lg font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
