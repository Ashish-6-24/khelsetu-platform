import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode } from 'react';

import { GlowPulse } from './GlowPulse';

interface LiveIndicatorProps {
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const LiveIndicator = ({
  className,
  label = 'LIVE',
  size = 'md',
  showLabel = true,
}: LiveIndicatorProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 rounded-full',
          size === 'sm' && 'px-2 py-0.5 text-[10px]',
          size === 'md' && 'px-2.5 py-1 text-xs',
          size === 'lg' && 'px-3 py-1.5 text-sm',
          'bg-[#DC2626]/10 font-semibold text-[#DC2626]',
          'dark:bg-[#DC2626]/15 dark:text-[#F87171]',
          className,
        ),
      )}
    >
      <GlowPulse color="red" size={size === 'lg' ? 'md' : 'sm'} />
      {showLabel && <span className="tracking-wider">{label}</span>}
    </div>
  );
};

/** Animated badge with gradient border */
interface GradientBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'brand' | 'gold' | 'success' | 'warning';
}

const badgeVariants = {
  brand: 'from-[#7F1D1D] to-[#991B1B]',
  gold: 'from-[#B8860B] to-[#9A7209]',
  success: 'from-[#15803D] to-[#166534]',
  warning: 'from-[#D97706] to-[#B45309]',
};

export const GradientBadge = ({
  children,
  className,
  variant = 'brand',
}: GradientBadgeProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white',
          'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]',
          `bg-gradient-to-r ${badgeVariants[variant]}`,
          className,
        ),
      )}
    >
      {children}
    </span>
  );
};

/** Score badge with animated background */
interface ScoreBadgeProps {
  score: number;
  previousScore?: number;
  className?: string;
}

export const ScoreBadge = ({
  score,
  previousScore,
  className,
}: ScoreBadgeProps) => {
  const isChanged = previousScore !== undefined && score !== previousScore;

  return (
    <span
      className={twMerge(
        clsx(
          'relative inline-flex items-center justify-center rounded-lg px-3 py-1.5 font-mono text-lg font-bold tabular-nums',
          'bg-[var(--bg-surface)] text-[var(--text-primary)]',
          'border border-[var(--border-subtle)]',
          'dark:bg-[#13131A] dark:text-white',
          isChanged && 'score-flash',
          className,
        ),
      )}
    >
      {score}
      {isChanged && (
        <span
          className={clsx(
            'absolute -right-1 -top-1 h-2 w-2 rounded-full',
            score > (previousScore ?? 0) ? 'bg-[#15803D]' : 'bg-[#DC2626]',
          )}
        />
      )}
    </span>
  );
};
