import type { CricketScore } from '@types-domain/scoring';

interface ScoreboardProps {
  score: CricketScore;
}

export const Scoreboard = ({ score }: ScoreboardProps) => {
  const currentInnings = score.innings[score.currentInningsIndex];

  if (!currentInnings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No innings data available
        </p>
      </div>
    );
  }

  const oversDisplay = `${currentInnings.overs}.${currentInnings.balls.length % 6}`;

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">
            {currentInnings.battingTeamName}
          </h3>
          <p className="text-4xl font-bold text-green-400">
            {currentInnings.runs}/{currentInnings.wickets}
          </p>
          <p className="text-sm text-gray-400">({oversDisplay} ov)</p>
        </div>
      </div>

      {score.lastBalls.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="text-sm font-semibold mb-3">Last 6 balls</h4>
          <div className="flex gap-2">
            {score.lastBalls.slice(-6).map((ball, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
                  ball.isWicket
                    ? 'bg-red-500'
                    : ball.runs === 6
                      ? 'bg-green-500'
                      : ball.runs === 4
                        ? 'bg-blue-500'
                        : 'bg-gray-700'
                }`}
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
