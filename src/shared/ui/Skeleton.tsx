import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton = ({
  className,
  variant = 'rectangular',
}: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-[var(--bg-surface-sunken)]/70 dark:bg-[var(--bg-surface)]/60',
        variant === 'circular' && 'rounded-full',
        variant === 'rounded' && 'rounded-xl',
        variant === 'rectangular' && 'rounded-lg',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent dark:before:via-white/5',
        className,
      )}
    />
  );
};

export const SkeletonText = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={`line-${i}`}
          className={clsx('h-3.5', i === lines - 1 && 'w-3/4')}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center space-x-3">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
};

export const SkeletonButton = ({ className }: { className?: string }) => (
  <Skeleton
    className={clsx('h-10 w-24 rounded-xl', className)}
    variant="rounded"
  />
);

export const SkeletonAvatar = ({
  size = 'md',
  className,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeMap = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  return (
    <Skeleton variant="circular" className={clsx(sizeMap[size], className)} />
  );
};

/**
 * Drop-in skeleton for a stats card that exactly matches the layout
 * of the real <StatsCard> component.
 */
export const SkeletonStatsCard = () => (
  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-sm)]">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2.5">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-2xl" />
    </div>
  </div>
);
