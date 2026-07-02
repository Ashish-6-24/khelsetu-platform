import type { CricketPartnership } from '@shared/types/scoring';

interface PartnershipDisplayProps {
  partnership?: CricketPartnership;
}

export const PartnershipDisplay = ({
  partnership,
}: PartnershipDisplayProps) => {
  if (!partnership) return null;

  const runRate =
    partnership.balls > 0
      ? ((partnership.runs / partnership.balls) * 6).toFixed(2)
      : '0.00';

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Partnership
      </h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Runs</p>
          <p className="font-bold text-gray-900 dark:text-white">
            {partnership.runs}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Balls</p>
          <p className="font-bold text-gray-900 dark:text-white">
            {partnership.balls}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Run Rate</p>
          <p className="font-bold text-gray-900 dark:text-white">{runRate}</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {partnership.batsmanAName} & {partnership.batsmanBName}
      </div>
    </div>
  );
};
