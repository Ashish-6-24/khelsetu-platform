import { Button } from '@shared/ui/Button';
import { clsx } from 'clsx';

interface RunButtonsProps {
  onRun: (runs: number) => void;
  disabled?: boolean;
}

const RUN_VALUES = [0, 1, 2, 3, 4, 6];

const RUN_COLORS: Record<number, string> = {
  0: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  1: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800',
  2: 'bg-blue-200 text-blue-900 hover:bg-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700',
  3: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800',
  4: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800',
  6: 'bg-green-200 text-green-900 hover:bg-green-300 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700',
};

export const RunButtons = ({ onRun, disabled = false }: RunButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {RUN_VALUES.map((runs) => (
        <Button
          key={runs}
          variant="outline"
          className={clsx(
            'h-14 text-lg font-bold transition-all',
            RUN_COLORS[runs],
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          onClick={() => onRun(runs)}
          disabled={disabled}
        >
          {runs}
        </Button>
      ))}
    </div>
  );
};
