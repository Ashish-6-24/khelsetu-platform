import { Progress } from '@components/ui/Progress';

interface RunRateMeterProps {
  currentRunRate: number;
  requiredRunRate?: number;
  maxRate?: number;
}

export const RunRateMeter = ({
  currentRunRate,
  requiredRunRate,
  maxRate = 15,
}: RunRateMeterProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Run Rate
        </span>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {currentRunRate.toFixed(2)}
        </span>
      </div>
      <Progress
        value={currentRunRate}
        max={maxRate}
        size="lg"
        variant={
          currentRunRate > 10
            ? 'success'
            : currentRunRate > 6
              ? 'default'
              : 'warning'
        }
      />
      {requiredRunRate !== undefined && (
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Required: {requiredRunRate.toFixed(2)}</span>
          <span
            className={
              currentRunRate >= requiredRunRate
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {currentRunRate >= requiredRunRate ? 'On track' : 'Behind'}
          </span>
        </div>
      )}
    </div>
  );
};
