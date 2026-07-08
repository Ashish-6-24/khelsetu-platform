import { clsx } from 'clsx';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
  showLabel?: boolean;
  className?: string;
  label?: string;
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

const variantStyles = {
  default: 'bg-[var(--color-info)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-live)]',
  gradient:
    'bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-primary-hover)] to-[var(--brand-accent)]',
};

export const Progress = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className,
  label,
}: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && (
            <span className="font-medium text-[var(--text-secondary)]">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="font-semibold tabular-nums text-[var(--text-primary)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <progress
        value={Math.round(percentage)}
        max={100}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
        className={clsx(
          'w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[var(--bg-surface-sunken)] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-700 [&::-webkit-progress-value]:ease-out [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:transition-all [&::-moz-progress-bar]:duration-700 [&::-moz-progress-bar]:ease-out',
          sizeStyles[size],
          variantStyles[variant],
        )}
      />
    </div>
  );
};
