import { Badge } from '@shared/ui/Badge';
import { motion } from 'framer-motion';

interface StandingRowProps {
  rank: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr?: number;
  isHighlighted?: boolean;
}

export const StandingRow = ({
  rank,
  team,
  played,
  won,
  lost,
  points,
  nrr,
  isHighlighted,
}: StandingRowProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`flex items-center gap-4 p-3 rounded-xl ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]'} transition-colors`}
    >
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${rank <= 2 ? 'bg-blue-600 text-white' : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] dark:text-[var(--text-secondary)]'}`}
      >
        {rank}
      </span>
      <span className="flex-1 font-medium text-[var(--text-primary)] dark:text-white">
        {team}
      </span>
      <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] w-12 text-center">
        {played}
      </span>
      <span className="text-sm text-green-600 dark:text-green-400 w-12 text-center">
        {won}
      </span>
      <span className="text-sm text-red-600 dark:text-red-400 w-12 text-center">
        {lost}
      </span>
      {nrr !== undefined && (
        <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] w-16 text-center">
          {nrr.toFixed(3)}
        </span>
      )}
      <Badge variant="info" className="w-12 justify-center">
        {points}
      </Badge>
    </motion.div>
  );
};
