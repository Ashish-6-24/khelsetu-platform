import { Button } from '@shared/components/ui/Button';
import type { CricketExtraType } from '@shared/types/scoring';
import { clsx } from 'clsx';

interface ExtraButtonsProps {
  onExtra: (type: CricketExtraType) => void;
  disabled?: boolean;
}

const EXTRA_TYPES: { type: CricketExtraType; label: string; abbr: string }[] = [
  { type: 'wide', label: 'Wide', abbr: 'Wd' },
  { type: 'no-ball', label: 'No Ball', abbr: 'Nb' },
  { type: 'bye', label: 'Bye', abbr: 'B' },
  { type: 'leg-bye', label: 'Leg Bye', abbr: 'Lb' },
];

export const ExtraButtons = ({
  onExtra,
  disabled = false,
}: ExtraButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {EXTRA_TYPES.map(({ type, label, abbr }) => (
        <Button
          key={type}
          variant="outline"
          className={clsx(
            'h-12 text-sm font-semibold transition-all',
            'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/40',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          onClick={() => onExtra(type)}
          disabled={disabled}
        >
          {label}
          <span className="ml-1 text-xs opacity-70">({abbr})</span>
        </Button>
      ))}
    </div>
  );
};
