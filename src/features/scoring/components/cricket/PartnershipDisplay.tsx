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
    <div className="bg-[var(--bg-surface-sunken)] rounded-lg p-3 space-y-2">
      <h4 className="text-sm font-semibold text-[var(--text-secondary)]">
        Partnership
      </h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-[var(--text-tertiary)]">Runs</p>
          <p className="font-bold text-[var(--text-primary)]">
            {partnership.runs}
          </p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)]">Balls</p>
          <p className="font-bold text-[var(--text-primary)]">
            {partnership.balls}
          </p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)]">Run Rate</p>
          <p className="font-bold text-[var(--text-primary)]">{runRate}</p>
        </div>
      </div>
      <div className="text-xs text-[var(--text-tertiary)]">
        {partnership.batsmanAName} & {partnership.batsmanBName}
      </div>
    </div>
  );
};
