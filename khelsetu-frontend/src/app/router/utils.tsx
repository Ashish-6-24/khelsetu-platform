import { Suspense, lazy } from 'react';

import { Skeleton } from '@shared/components/ui/Skeleton';

export const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-3 gap-4 mt-8">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    </div>
  </div>
);

export const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType>,
) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

export const lazyPage = (
  importFn: () => Promise<Record<string, React.ComponentType>>,
  name: string,
) =>
  lazy(() =>
    importFn().then((m) => ({ default: m[name] as React.ComponentType })),
  );
