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
  default: 'bg-blue-600',
  success: 'bg-emerald-600',
  warning: 'bg-amber-500',
  error: 'bg-red-600',
  gradient: 'bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-primary-hover)] to-[var(--brand-accent)]',
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
            <span className="font-medium text-slate-600 dark:text-slate-400">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
        className={clsx(
          'w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/60',
          sizeStyles[size],
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700 ease-out',
            variantStyles[variant],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
