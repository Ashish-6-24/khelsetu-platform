import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode } from 'react';

interface GradientMeshProps {
  className?: string;
  variant?: 'brand' | 'warm' | 'cool' | 'premium' | 'subtle';
  animated?: boolean;
}

// RGBA kept — CSS vars can't handle per-channel opacity in radial-gradient overlays
const variantStyles = {
  brand: {
    light:
      'radial-gradient(at 20% 10%, rgba(127,29,29,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(184,134,11,0.12) 0px, transparent 50%)',
    dark: 'radial-gradient(at 20% 10%, rgba(127,29,29,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(184,134,11,0.18) 0px, transparent 50%)',
  },
  warm: {
    light:
      'radial-gradient(at 30% 20%, rgba(184,134,11,0.1) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(127,29,29,0.08) 0px, transparent 50%)',
    dark: 'radial-gradient(at 30% 20%, rgba(184,134,11,0.25) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(127,29,29,0.2) 0px, transparent 50%)',
  },
  cool: {
    light:
      'radial-gradient(at 20% 80%, rgba(37,99,235,0.08) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(124,58,237,0.06) 0px, transparent 50%)',
    dark: 'radial-gradient(at 20% 80%, rgba(37,99,235,0.2) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(124,58,237,0.15) 0px, transparent 50%)',
  },
  premium: {
    light:
      'radial-gradient(at 15% 15%, rgba(127,29,29,0.15) 0px, transparent 45%), radial-gradient(at 85% 15%, rgba(184,134,11,0.15) 0px, transparent 45%), radial-gradient(at 50% 85%, rgba(127,29,29,0.08) 0px, transparent 45%)',
    dark: 'radial-gradient(at 15% 15%, rgba(127,29,29,0.35) 0px, transparent 45%), radial-gradient(at 85% 15%, rgba(184,134,11,0.25) 0px, transparent 45%), radial-gradient(at 50% 85%, rgba(127,29,29,0.2) 0px, transparent 45%)',
  },
  subtle: {
    light:
      'radial-gradient(at 50% 50%, rgba(148,163,184,0.08) 0px, transparent 60%)',
    dark: 'radial-gradient(at 50% 50%, rgba(148,163,184,0.12) 0px, transparent 60%)',
  },
};

export const GradientMesh = ({
  className,
  variant = 'brand',
  animated = false,
}: GradientMeshProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={twMerge(
        clsx('pointer-events-none absolute inset-0 -z-10', className),
      )}
    >
      <div
        className={clsx(
          'absolute inset-0 opacity-100 dark:opacity-100',
          animated && 'gradient-animate',
        )}
        style={{ backgroundImage: styles.light }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{ backgroundImage: styles.dark }}
        aria-hidden
      />
    </div>
  );
};

/** Premium card with depth and glass effects */
interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  /** Card elevation level */
  elevation?: 1 | 2 | 3;
  /** Glass morphism effect */
  glass?: boolean;
  /** Show gradient border on hover */
  gradientBorder?: boolean;
  /** Internal glow color */
  glowColor?: string;
}

export const PremiumCard = ({
  children,
  className,
  elevation = 2,
  glass = false,
  gradientBorder = false,
  glowColor = 'var(--brand-primary)',
}: PremiumCardProps) => {
  // RGBA kept — shadow values require specific opacity
  const elevationStyles = {
    1: 'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)]',
    2: 'shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15)]',
    3: 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)]',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'group relative overflow-hidden rounded-2xl transition-all duration-300',
          'hover:-translate-y-0.5',
          glass
            ? 'border border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[var(--bg-surface)]/70'
            : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)]',
          elevationStyles[elevation],
          gradientBorder && 'gradient-border-glow',
          className,
        ),
      )}
    >
      {glowColor && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}15 0%, transparent 60%)`,
          }}
          aria-hidden
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
};

/** Stat card with animated glow border */
interface GlowStatCardProps {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon: ReactNode;
  glowColor?: string;
  className?: string;
}

export const GlowStatCard = ({
  title,
  value,
  change,
  icon,
  glowColor = 'var(--brand-primary)',
  className,
}: GlowStatCardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]',
          'dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]',
          className,
        ),
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: glowColor }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            {title}
          </p>
          <p
            className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] dark:text-white tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {value}
          </p>
          {change && (
            <p
              className={clsx(
                'mt-1 text-xs font-semibold',
                change.isPositive
                  ? 'text-[var(--color-success)] dark:text-[var(--color-success)]'
                  : 'text-[var(--color-live)] dark:text-[var(--color-live)]',
              )}
            >
              {change.isPositive ? '+' : ''}
              {change.value}%
            </p>
          )}
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${glowColor}15 0%, ${glowColor}08 100%)`,
            color: glowColor,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
