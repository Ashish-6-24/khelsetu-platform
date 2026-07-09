import { Button } from '@shared/ui/Button';

import { useEffect, useState } from 'react';

interface MatchTimerProps {
  minute: number;
  isRunning: boolean;
  onToggle: () => void;
  onMinuteUpdate: (minute: number) => void;
}

export const MatchTimer = ({
  minute,
  isRunning,
  onToggle,
  onMinuteUpdate,
}: MatchTimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1;
        if (newSeconds === 60) {
          onMinuteUpdate(minute + 1);
          return 0;
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, minute, onMinuteUpdate]);

  return (
    <div className="flex items-center justify-between bg-[var(--bg-surface-sunken)] rounded-lg p-3">
      <div className="text-center">
        <p className="text-3xl font-bold text-[var(--text-primary)]">
          {minute}
          <span className="text-lg text-[var(--text-tertiary)]">
            :{seconds.toString().padStart(2, '0')}
          </span>
        </p>
        <p className="text-xs text-[var(--text-tertiary)]">minutes</p>
      </div>
      <Button
        variant={isRunning ? 'outline' : 'primary'}
        onClick={onToggle}
        className="h-10 bg-red-50 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300"
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>
    </div>
  );
};
