import { WifiOff } from 'lucide-react';

import { useServiceWorker } from '@hooks/useServiceWorker';

export const OfflineBanner = () => {
  const { isOnline } = useServiceWorker();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-amber-500 px-4 py-2 text-center text-sm font-medium text-white shadow-lg dark:bg-amber-600"
    >
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span>You are offline. Some features may be limited.</span>
      </div>
    </div>
  );
};
