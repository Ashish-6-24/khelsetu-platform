import type { CricketBall } from '@shared/types/scoring';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface OverTrackerProps {
  balls: CricketBall[];
  overNumber: number;
}

export const OverTracker = ({ balls, overNumber }: OverTrackerProps) => {
  const getBallDisplay = (ball: CricketBall): string => {
    if (ball.isWicket) return 'W';
    if (ball.extraType === 'wide') return 'Wd';
    if (ball.extraType === 'no-ball') return 'Nb';
    if (ball.extraType === 'bye') return `${ball.runs}B`;
    if (ball.extraType === 'leg-bye') return `${ball.runs}Lb`;
    return ball.runs.toString();
  };

  const getBallColor = (ball: CricketBall): string => {
    if (ball.isWicket) return 'bg-red-500 text-white';
    if (ball.runs === 6) return 'bg-green-500 text-white';
    if (ball.runs === 4) return 'bg-blue-500 text-white';
    if (ball.isExtra) return 'bg-yellow-500 text-white';
    return 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Over {overNumber + 1}
      </h4>
      <div className="flex flex-wrap gap-2">
        {balls.map((ball, index) => (
          <motion.div
            key={ball.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
              getBallColor(ball),
            )}
          >
            {getBallDisplay(ball)}
          </motion.div>
        ))}
        {balls.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No balls bowled yet
          </p>
        )}
      </div>
    </div>
  );
};
