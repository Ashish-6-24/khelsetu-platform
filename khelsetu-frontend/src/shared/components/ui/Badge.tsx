import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'live'
  | 'gold'
  | 'brand'
  | 'sport-cricket'
  | 'sport-football'
  | 'sport-volleyball'
  | 'sport-basketball'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--bg-surface-sunken)] text-[var(--text-primary)]',
  success:
    'bg-[var(--color-success-soft)] text-[var(--color-success)] ring-1 ring-inset ring-[var(--color-success)]/20',
  warning:
    'bg-[var(--color-warning-soft)] text-[var(--color-warning)] ring-1 ring-inset ring-[var(--color-warning)]/20',
  error:
    'bg-[var(--color-danger-soft)] text-[var(--color-danger)] ring-1 ring-inset ring-[var(--color-danger)]/20',
  info: 'bg-[var(--color-info-soft)] text-[var(--color-info)] ring-1 ring-inset ring-[var(--color-info)]/20',
  // AA-safe live badge: deep maroon-red bg + white text + warm glow ring
  live: 'bg-[var(--color-live)] text-white shadow-[0_0_0_3px_rgb(220_38_38/0.18),0_2px_8px_-2px_rgb(220_38_38/0.45)]',
  // Gold = premium tier, awards, verified
  gold: 'bg-gradient-to-r from-[var(--brand-accent)] via-[var(--brand-accent-hover)] to-[var(--brand-accent)] text-[var(--brand-primary-ink)] shadow-sm ring-1 ring-inset ring-[var(--brand-accent-hover)]/30',
  // Brand = primary callout, maroon
  brand:
    'bg-[var(--brand-primary-bg)] text-white shadow-sm ring-1 ring-inset ring-[var(--brand-primary-bg-active)]/40',
  // Sport accents
  'sport-cricket':
    'bg-[var(--sport-cricket)]/10 text-[var(--sport-cricket)] ring-1 ring-inset ring-[var(--sport-cricket)]/20',
  'sport-football':
    'bg-[var(--sport-football)]/10 text-[var(--sport-football)] ring-1 ring-inset ring-[var(--sport-football)]/20',
  'sport-volleyball':
    'bg-[var(--sport-volleyball)]/10 text-[var(--sport-volleyball)] ring-1 ring-inset ring-[var(--sport-volleyball)]/20',
  'sport-basketball':
    'bg-[var(--sport-basketball)]/10 text-[var(--sport-basketball)] ring-1 ring-inset ring-[var(--sport-basketball)]/20',
  outline:
    'border border-[var(--border-subtle)] text-[var(--text-primary)]',
};

const sizeStyles = {
  sm: 'h-5 px-2 text-[10px] gap-1',
  md: 'h-6 px-2.5 text-xs gap-1.5',
};

export const Badge = ({
  children,
  variant = 'default',
  className,
  pulse = false,
  size = 'md',
  icon,
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full font-semibold uppercase tracking-wide',
          sizeStyles[size],
          variantStyles[variant],
          pulse && variant !== 'live' && 'animate-pulse',
          className,
        ),
      )}
    >
      {variant === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      )}
      {variant !== 'live' && icon && (
        <span className="inline-flex">{icon}</span>
      )}
      {children}
    </span>
  );
};

interface BadgeDotProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  pulse?: boolean;
  className?: string;
}

const dotColors: Record<NonNullable<BadgeDotProps['variant']>, string> = {
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-info)]',
  neutral: 'bg-[var(--text-tertiary)]',
};

export const BadgeDot = ({
  variant = 'neutral',
  pulse = false,
  className,
}: BadgeDotProps) => {
  return (
    <span className={clsx('relative inline-flex h-2 w-2', className)}>
      {pulse && (
        <span
          className={clsx(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
            dotColors[variant],
          )}
        />
      )}
      <span
        className={clsx(
          'relative inline-flex h-2 w-2 rounded-full',
          dotColors[variant],
        )}
      />
    </span>
  );
};
