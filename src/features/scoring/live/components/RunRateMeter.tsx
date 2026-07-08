import { Progress } from '@shared/ui/Progress';

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
  let variant: 'success' | 'default' | 'warning';
  if (currentRunRate > 10) {
    variant = 'success';
  } else if (currentRunRate > 6) {
    variant = 'default';
  } else {
    variant = 'warning';
  }

  return (
    <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-xl p-4 border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
          Run Rate
        </span>
        <span className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
          {currentRunRate.toFixed(2)}
        </span>
      </div>
      <Progress
        value={currentRunRate}
        max={maxRate}
        size="lg"
        variant={variant}
      />
      {requiredRunRate !== undefined && (
        <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
          <span>Required: {requiredRunRate.toFixed(2)}</span>
          <span
            className={
              currentRunRate >= requiredRunRate
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }
          >
            {currentRunRate >= requiredRunRate ? 'On track' : 'Behind'}
          </span>
        </div>
      )}
    </div>
  );
};
