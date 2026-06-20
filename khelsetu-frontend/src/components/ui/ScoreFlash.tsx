import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ScoreFlashProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDelta?: boolean;
  format?: 'number' | 'cricket';
  /** Flash color when score increases (default: green) */
  positiveColor?: string;
  /** Flash color when score decreases (default: red) */
  negativeColor?: string;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
} as const;

export const ScoreFlash = ({
  value,
  className,
  size = 'md',
  showDelta = true,
  format = 'number',
  positiveColor = 'rgba(21, 128, 61, 0.25)',
  negativeColor = 'rgba(220, 38, 38, 0.25)',
}: ScoreFlashProps) => {
  const [flash, setFlash] = useState(false);
  const [delta, setDelta] = useState(0);
  const [flashColor, setFlashColor] = useState(positiveColor);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      const d = value - prevRef.current;
      setDelta(d);
      setFlash(true);
      setFlashColor(d > 0 ? positiveColor : negativeColor);
      prevRef.current = value;

      const timer = setTimeout(() => setFlash(false), 800);
      return () => clearTimeout(timer);
    }
  }, [value, positiveColor, negativeColor]);

  const formatted =
    format === 'cricket' ? `${Math.floor(value / 100)}.${value % 100}` : String(value);

  return (
    <span className={twMerge(clsx('relative inline-flex items-center', className))}>
      {/* Background flash — fades out */}
      {flash && (
        <span
          className="absolute inset-0 rounded-md score-bg-flash"
          style={{ backgroundColor: flashColor }}
        />
      )}
      <span
        className={twMerge(
          clsx(
            'relative font-mono font-semibold tabular-nums',
            sizeClasses[size],
            'text-[var(--text-primary)]',
            flash && 'score-bounce',
          ),
        )}
      >
        {formatted}
      </span>

      {/* Flash ring */}
      {flash && (
        <span
          className={clsx(
            'absolute inset-0 rounded-md',
            'ring-2 ring-brand-500/30',
            'score-flash',
          )}
        />
      )}

      {/* Delta badge */}
      {showDelta && flash && delta !== 0 && (
        <span
          className={clsx(
            'absolute -right-8 top-0 text-xs font-bold',
            delta > 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400',
            'animate-fade-in-up',
          )}
        >
          {delta > 0 ? `+${delta}` : delta}
        </span>
      )}
    </span>
  );
};
