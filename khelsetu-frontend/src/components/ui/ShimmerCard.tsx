import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode, forwardRef } from 'react';

interface ShimmerCardProps {
  children: ReactNode;
  className?: string;
  /** Show shimmer border animation on hover */
  shimmer?: boolean;
  /** Gradient border glow on hover */
  glow?: boolean;
  /** 3D tilt effect on hover */
  tilt?: boolean;
  /** Glass morphism background */
  glass?: boolean;
  /** Elevated shadow depth */
  depth?: 1 | 2 | 3 | 4;
}

export const ShimmerCard = forwardRef<HTMLDivElement, ShimmerCardProps>(
  function ShimmerCard(
    {
      children,
      className,
      shimmer = true,
      glow = true,
      tilt = false,
      glass = false,
      depth = 1,
      ...props
    },
    ref,
  ) {
    // RGBA kept — shadow values require specific opacity
    const depthStyles = {
      1: 'shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]',
      2: 'shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_2px_4px_-2px_rgba(0,0,0,0.04)]',
      3: 'shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.06)]',
      4: 'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18),0_8px_16px_-4px_rgba(0,0,0,0.08)]',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'group relative overflow-hidden rounded-2xl transition-all duration-300',
            glass
              ? 'border border-white/20 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[var(--bg-surface)]/80'
              : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)]',
            depthStyles[depth],
            tilt && 'tilt-card',
            shimmer && 'shimmer-border',
            'hover:-translate-y-0.5',
            className,
          ),
        )}
        {...props}
      >
        {glow && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                // RGBA kept — CSS vars can't handle per-channel opacity in conic-gradient
                'conic-gradient(from 180deg, transparent, rgba(127,29,29,0.15), transparent 40%, rgba(184,134,11,0.12), transparent 80%)',
            }}
            aria-hidden
          />
        )}
        {shimmer && (
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
            style={{
              background:
                // RGBA kept — CSS vars can't handle per-channel opacity in linear-gradient
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            }}
            aria-hidden
          />
        )}
        <div className="relative">{children}</div>
      </div>
    );
  },
);
