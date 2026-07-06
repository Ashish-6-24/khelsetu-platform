import { memo } from 'react';

interface StatComparisonBarProps {
  label: string;
  teamAValue: number;
  teamBValue: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export const StatComparisonBar = memo(
  ({
    label,
    teamAValue,
    teamBValue,
    unit = '',
    higherIsBetter = true,
  }: StatComparisonBarProps) => {
    const total = teamAValue + teamBValue;
    const teamAPercent = total === 0 ? 50 : (teamAValue / total) * 100;
    const teamBPercent = total === 0 ? 50 : (teamBValue / total) * 100;

    const teamABetter = higherIsBetter
      ? teamAValue > teamBValue
      : teamAValue < teamBValue;
    const teamBBetter = higherIsBetter
      ? teamBValue > teamAValue
      : teamBValue < teamAValue;
    const isDraw = teamAValue === teamBValue;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span
            className={`font-semibold tabular-nums ${
              teamABetter && !isDraw
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-[var(--text-primary)] dark:text-white'
            }`}
          >
            {teamAValue}
            {unit}
          </span>
          <span className="px-3 text-xs font-medium text-[var(--text-tertiary)] dark:text-[var(--text-muted)] uppercase tracking-wider">
            {label}
          </span>
          <span
            className={`font-semibold tabular-nums ${
              teamBBetter && !isDraw
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-[var(--text-primary)] dark:text-white'
            }`}
          >
            {teamBValue}
            {unit}
          </span>
        </div>
        <div
          className="flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface-sunken)] dark:bg-gray-700"
          role="group"
          aria-label={`${label} comparison: Team A ${teamAValue}${unit}, Team B ${teamBValue}${unit}`}
        >
          <div
            role="progressbar"
            aria-valuenow={teamAValue}
            aria-valuemin={0}
            aria-valuemax={teamAValue + teamBValue}
            aria-label={`Team A: ${teamAValue}${unit}`}
            className="transition-all duration-700 ease-out rounded-l-full bg-gradient-to-r from-blue-500 to-blue-600"
            style={{ width: `${teamAPercent}%` }}
          />
          <div
            role="progressbar"
            aria-valuenow={teamBValue}
            aria-valuemin={0}
            aria-valuemax={teamAValue + teamBValue}
            aria-label={`Team B: ${teamBValue}${unit}`}
            className="transition-all duration-700 ease-out rounded-r-full bg-gradient-to-r from-red-500 to-red-600"
            style={{ width: `${teamBPercent}%` }}
          />
        </div>
      </div>
    );
  },
);
