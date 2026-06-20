import { Skeleton } from './Skeleton';

interface SkeletonMatchCardProps {
  compact?: boolean;
}

export const SkeletonMatchCard = ({ compact = false }: SkeletonMatchCardProps) => {
  if (compact) {
    return (
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3.5 w-16" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-3.5 w-28" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-center space-y-2">
          <Skeleton className="mx-auto h-10 w-10 rounded-full" />
          <Skeleton className="mx-auto h-3.5 w-20" />
        </div>
        <div className="px-6">
          <Skeleton className="mx-auto h-8 w-20" />
        </div>
        <div className="flex-1 text-center space-y-2">
          <Skeleton className="mx-auto h-10 w-10 rounded-full" />
          <Skeleton className="mx-auto h-3.5 w-20" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonMatchCardGrid = ({
  count = 6,
  compact = false,
}: {
  count?: number;
  compact?: boolean;
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonMatchCard key={i} compact={compact} />
    ))}
  </div>
);
