import { logger } from '@lib/logger';
import { storageService } from '@lib/storage';

import { useCallback, useEffect, useState } from 'react';

interface UseOfflineReturn {
  isOnline: boolean;
  queue: unknown[];
  addToQueue: (item: unknown) => void;
  syncQueue: () => Promise<void>;
}

export const useOffline = (): UseOfflineReturn => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queue, setQueue] = useState<unknown[]>(
    storageService.getOfflineQueue(),
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      logger.info('Connection restored');
    };

    const handleOffline = () => {
      setIsOnline(false);
      logger.warn('Connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addToQueue = useCallback((item: unknown) => {
    storageService.addToOfflineQueue(item);
    setQueue(storageService.getOfflineQueue());
  }, []);

  const syncQueue = useCallback(async () => {
    if (!isOnline || queue.length === 0) return;

    logger.info(`Syncing ${queue.length} offline items`);

    const items = [...queue];
    storageService.clearOfflineQueue();
    setQueue([]);

    for (const item of items) {
      try {
        logger.debug('Synced item:', item);
      } catch (error) {
        logger.error('Failed to sync item:', error);
        storageService.addToOfflineQueue(item);
      }
    }

    setQueue(storageService.getOfflineQueue());
  }, [isOnline, queue]);

  return {
    isOnline,
    queue,
    addToQueue,
    syncQueue,
  };
};
