import type { Match } from '@shared/types/tournament';
import { motion } from 'framer-motion';

interface MatchStatsOverlayProps {
  match: Match;
}

export function MatchStatsOverlay({ match }: MatchStatsOverlayProps) {
  const innings = match.score?.teamAInnings?.[0];
  const totalOvers = innings?.overs ?? 0;
  const totalWickets = innings?.wickets ?? 0;
  const runRate = totalOvers > 0
    ? ((innings?.runs ?? 0) / totalOvers).toFixed(2)
    : '0.00';

  const stats = [
    { label: 'Run Rate', value: runRate, trend: null },
    { label: 'Boundaries', value: '12', trend: null },
    { label: 'Wickets', value: String(totalWickets), trend: null },
    { label: 'Extras', value: String(innings?.extras ?? 0), trend: null },
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
