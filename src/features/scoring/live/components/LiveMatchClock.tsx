import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useEffect, useRef, useState } from 'react';

interface LiveMatchClockProps {
  startTime: number | string | Date;
  className?: string;
  format?: 'elapsed' | 'countdown';
  countdownTo?: number | string | Date;
}

const pad = (n: number) => String(n).padStart(2, '0');

const formatElapsed = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

const formatCountdown = (ms: number) => {
  if (ms <= 0) return '00:00';
  return formatElapsed(ms);
};

export const LiveMatchClock = ({
  startTime,
  className,
  format = 'elapsed',
  countdownTo,
}: LiveMatchClockProps) => {
  const start = new Date(startTime).getTime();
  const end = countdownTo ? new Date(countdownTo).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    };

    startInterval();

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setNow(Date.now());
        startInterval();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const elapsed = now - start;
  const remaining = end - now;
  const display =
    format === 'countdown'
      ? formatCountdown(remaining)
      : formatElapsed(elapsed);

  const isOvertime = format === 'countdown' && remaining <= 0;

  const parts = display.split(':');

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-mono text-sm tabular-nums',
          'text-[var(--text-secondary)]',
          isOvertime
            ? 'text-red-500 dark:text-red-400'
            : 'text-[var(--text-secondary)]',
          className,
        ),
      )}
      role="timer"
      aria-live="polite"
      aria-label={`Match clock: ${display}`}
    >
      <span
        className={clsx(
          'inline-block h-1.5 w-1.5 rounded-full',
          'bg-red-500',
          'animate-pulse',
        )}
      />
      {parts.map((part, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="clock-colon mx-px">:</span>}
          <span>{part}</span>
        </span>
      ))}
    </span>
  );
};
