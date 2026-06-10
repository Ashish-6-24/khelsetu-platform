import type { CricketScore } from '@types-domain/scoring';

interface LiveScoreCardProps {
  score: CricketScore;
  variant?: 'compact' | 'full';
  className?: string;
}

export const LiveScoreCard = ({
  score,
  variant = 'compact',
}: LiveScoreCardProps) => {
  const currentInnings = score.innings[score.currentInningsIndex];

  if (!currentInnings) return null;

  const oversDisplay = `${currentInnings.overs}.${currentInnings.balls.length % 6}`;

  if (variant === 'compact') {
    return (
      <div className="bg-gray-900 text-white rounded-lg p-3">
        <p className="text-sm font-semibold">
          {currentInnings.battingTeamName}
        </p>
        <p className="text-2xl font-bold text-green-400">
          {currentInnings.runs}/{currentInnings.wickets}
        </p>
        <p className="text-xs text-gray-400">({oversDisplay})</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">
            {currentInnings.battingTeamName}
          </h3>
          <p className="text-3xl font-bold text-green-400">
            {currentInnings.runs}/{currentInnings.wickets}
          </p>
          <p className="text-sm text-gray-400">({oversDisplay} ov)</p>
        </div>
      </div>

      {currentInnings.partnership && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">Partnership</p>
          <p className="text-lg font-semibold">
            {currentInnings.partnership.runs} (
            {currentInnings.partnership.balls})
          </p>
        </div>
      )}
    </div>
  );
};
