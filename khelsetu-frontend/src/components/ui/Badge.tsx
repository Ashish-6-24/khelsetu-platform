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
  default: 'bg-[#F5F5F4] text-[#0F172A] dark:bg-[#1A1A23] dark:text-[#F1F5F9]',
  success:
    'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30',
  warning:
    'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/30',
  error:
    'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/30',
  info: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-400/30',
  // AA-safe live badge: deep maroon-red bg + white text + warm glow ring
  live: 'bg-[#DC2626] text-white shadow-[0_0_0_3px_rgb(220_38_38/0.18),0_2px_8px_-2px_rgb(220_38_38/0.45)]',
  // Gold = premium tier, awards, verified
  gold: 'bg-gradient-to-r from-[#B8860B] via-[#C4930A] to-[#B8860B] text-[#1A0A0A] shadow-sm ring-1 ring-inset ring-[#7A5A08]/30',
  // Brand = primary callout, maroon
  brand:
    'bg-[#7F1D1D] text-white shadow-sm ring-1 ring-inset ring-[#5B1414]/40',
  // Sport accents
  'sport-cricket':
    'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  'sport-football':
    'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
  'sport-volleyball':
    'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  'sport-basketball':
    'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
  outline:
    'border border-[#E7E5E4] text-[#0F172A] dark:border-[#3F3F46] dark:text-[#F1F5F9]',
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
          pulse && 'animate-pulse',
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
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
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
