import { Badge } from '@components/ui/Badge';
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
      className={`flex items-center gap-4 p-3 rounded-xl ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors`}
    >
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${rank <= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
      >
        {rank}
      </span>
      <span className="flex-1 font-medium text-gray-900 dark:text-white">
        {team}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-center">
        {played}
      </span>
      <span className="text-sm text-green-600 w-12 text-center">{won}</span>
      <span className="text-sm text-red-600 w-12 text-center">{lost}</span>
      {nrr !== undefined && (
        <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-center">
          {nrr.toFixed(3)}
        </span>
      )}
      <Badge variant="info" className="w-12 justify-center">
        {points}
      </Badge>
    </motion.div>
  );
};
