import type { CricketBall } from '@shared/types/scoring';

import { useMemo } from 'react';

interface LiveCommentaryProps {
  balls: CricketBall[];
}

export const LiveCommentary = ({ balls }: LiveCommentaryProps) => {
  const reversedBalls = useMemo(() => [...balls].reverse(), [balls]);

  if (balls.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Commentary will appear here once the match begins.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto" role="log" aria-live="polite" aria-label="Live commentary">
      {reversedBalls.map((ball) => (
        <div
          key={ball.id}
          className={`p-3 rounded-lg ${
            ball.isWicket
              ? 'bg-red-50 dark:bg-red-900/20'
              : ball.runs >= 4
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-gray-50 dark:bg-gray-800'
          }`}
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Over {ball.over + 1}.{ball.ball + 1}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {ball.isWicket
              ? 'WICKET!'
              : ball.runs === 4
                ? 'FOUR!'
                : ball.runs === 6
                  ? 'SIX!'
                  : `${ball.runs} run${ball.runs !== 1 ? 's' : ''}`}
          </p>
        </div>
      ))}
    </div>
  );
};
