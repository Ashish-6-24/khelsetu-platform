import type { CricketInnings } from '@shared/types/scoring';

interface InningsSummaryProps {
  innings: CricketInnings;
}

export const InningsSummary = ({ innings }: InningsSummaryProps) => {
  const oversDisplay = `${innings.overs}.${innings.balls.length % 6}`;

  return (
    <div className="bg-gradient-to-r from-[var(--brand-primary-soft)] to-[var(--bg-surface)] dark:from-[var(--brand-primary)]/15 dark:to-[var(--bg-surface-raised)] rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          {innings.battingTeamName}
        </h3>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {innings.runs}/{innings.wickets}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            ({oversDisplay} ov)
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-[var(--bg-surface-sunken)]/50 rounded p-2">
          <p className="text-[var(--text-tertiary)]">Run Rate</p>
          <p className="font-semibold text-[var(--text-primary)]">
            {innings.overs > 0
              ? (innings.runs / innings.overs).toFixed(2)
              : '0.00'}
          </p>
        </div>
        <div className="bg-[var(--bg-surface-sunken)]/50 rounded p-2">
          <p className="text-[var(--text-tertiary)]">Balls</p>
          <p className="font-semibold text-[var(--text-primary)]">
            {innings.balls.length}
          </p>
        </div>
      </div>
    </div>
  );
};
