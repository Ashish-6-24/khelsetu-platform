import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useEffect, useMemo, useRef, useState } from 'react';

interface DigitFlipProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  duration?: number;
}

const sizeClasses = {
  sm: 'h-6 text-lg',
  md: 'h-8 text-2xl',
  lg: 'h-10 text-3xl',
  xl: 'h-14 text-5xl',
} as const;

interface SingleDigitProps {
  digit: number;
  className?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  duration: number;
}

const SingleDigit = ({
  digit,
  className,
  size,
  duration,
}: SingleDigitProps) => {
  const prevRef = useRef(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== digit) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        prevRef.current = digit;
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [digit, duration]);

  return (
    <div
      className={twMerge(
        clsx(
          'relative overflow-hidden',
          sizeClasses[size],
          'font-mono font-bold tabular-nums text-[var(--text-primary)]',
          className,
        ),
      )}
    >
      {/* Current digit */}
      <span
        className={clsx(
          'inline-flex items-center justify-center w-full h-full',
          'transition-all ease-out',
          flipping
            ? 'opacity-0 -translate-y-full'
            : 'opacity-100 translate-y-0',
        )}
        style={{ transitionDuration: flipping ? `${duration}ms` : '0ms' }}
      >
        {digit}
      </span>

      {/* Incoming digit (shown during flip) */}
      {flipping && (
        <span
          className={clsx(
            'absolute inset-0 inline-flex items-center justify-center w-full h-full',
            'transition-all ease-in',
            'opacity-0 translate-y-full',
          )}
          style={{
            transitionDuration: `${duration / 2}ms`,
            animation: `digit-flip-in ${duration / 2}ms ease-out forwards`,
          }}
        >
          {digit}
        </span>
      )}
    </div>
  );
};

export const DigitFlip = ({
  value,
  className,
  size = 'md',
  duration = 400,
}: DigitFlipProps) => {
  const digits = useMemo(() => String(value).split('').map(Number), [value]);

  return (
    <div
      className={twMerge(clsx('inline-flex items-center gap-0.5', className))}
    >
      {digits.map((digit, i) => (
        <SingleDigit
          key={`${i}-${digits.length}`}
          digit={digit}
          size={size}
          duration={duration}
        />
      ))}
    </div>
  );
};
