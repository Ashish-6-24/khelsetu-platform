import type { CricketInnings } from '@types-domain/scoring';

interface InningsSummaryProps {
  innings: CricketInnings;
}

export const InningsSummary = ({ innings }: InningsSummaryProps) => {
  const oversDisplay = `${innings.overs}.${innings.balls.length % 6}`;

  return (
    <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FAFAF9] dark:from-[#7F1D1D]/15 dark:to-[#1A1A23] rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {innings.battingTeamName}
        </h3>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {innings.runs}/{innings.wickets}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ({oversDisplay} ov)
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2">
          <p className="text-gray-500 dark:text-gray-400">Run Rate</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {innings.overs > 0
              ? (innings.runs / innings.overs).toFixed(2)
              : '0.00'}
          </p>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2">
          <p className="text-gray-500 dark:text-gray-400">Balls</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {innings.balls.length}
          </p>
        </div>
      </div>
    </div>
  );
};
