import type { CricketScore } from '@shared/types/scoring';

interface ScoreboardProps {
  score: CricketScore;
}

export const Scoreboard = ({ score }: ScoreboardProps) => {
  const currentInnings = score.innings[score.currentInningsIndex];

  if (!currentInnings) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
          No innings data available
        </p>
      </div>
    );
  }

  const oversDisplay = `${currentInnings.overs}.${currentInnings.balls.length % 6}`;

  const getBallColor = (ball: CricketScore['lastBalls'][number]) => {
    if (ball.isWicket) return 'bg-red-500';
    if (ball.runs === 6) return 'bg-green-500';
    if (ball.runs === 4) return 'bg-blue-500';
    return 'bg-[var(--bg-surface-raised)]';
  };

  return (
    <div className="bg-[var(--bg-canvas)] text-white rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">
            {currentInnings.battingTeamName}
          </h3>
          <p className="text-4xl font-bold text-green-400">
            {currentInnings.runs}/{currentInnings.wickets}
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            ({oversDisplay} ov)
          </p>
        </div>
      </div>

      {score.lastBalls.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
          <h4 className="text-sm font-semibold mb-3">Last 6 balls</h4>
          <div className="flex gap-2">
            {score.lastBalls.slice(-6).map((ball, idx) => (
              <div
                key={`ball-${idx}-${ball.runs}-${ball.isWicket ? 'w' : ''}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${getBallColor(ball)}`}
              >
                {ball.isWicket ? 'W' : ball.runs}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
