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
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-muted)]">
          Commentary will appear here once the match begins.
        </p>
      </div>
    );
  }

  const getBallClass = (ball: CricketBall) => {
    if (ball.isWicket) return 'bg-red-50 dark:bg-red-900/20';
    if (ball.runs >= 4) return 'bg-green-50 dark:bg-green-900/20';
    return 'bg-[var(--bg-surface)] dark:bg-[var(--bg-surface-raised)]';
  };

  const getBallLabel = (ball: CricketBall) => {
    if (ball.isWicket) return 'WICKET!';
    if (ball.runs === 4) return 'FOUR!';
    if (ball.runs === 6) return 'SIX!';
    const runSuffix = ball.runs !== 1 ? 's' : '';
    return `${ball.runs} run${runSuffix}`;
  };

  return (
    <div
      className="space-y-2 max-h-96 overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-label="Live commentary"
    >
      {reversedBalls.map((ball) => (
        <div key={ball.id} className={`p-3 rounded-lg ${getBallClass(ball)}`}>
          <p className="text-sm font-medium text-[var(--text-primary)] dark:text-white">
            Over {ball.over + 1}.{ball.ball + 1}
          </p>
          <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            {getBallLabel(ball)}
          </p>
        </div>
      ))}
    </div>
  );
};
