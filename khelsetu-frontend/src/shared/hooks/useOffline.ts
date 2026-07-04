import { axiosInstance } from '@lib/axios';
import { logger } from '@lib/logger';
import { storageService } from '@lib/storage';

import { useCallback, useEffect, useState } from 'react';

export interface OfflineQueueItem {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  headers?: Record<string, string>;
}

interface UseOfflineReturn {
  isOnline: boolean;
  wasOffline: boolean;
  queue: OfflineQueueItem[];
  addToQueue: (item: OfflineQueueItem) => void;
  syncQueue: () => Promise<void>;
}

export const useOffline = (): UseOfflineReturn => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [queue, setQueue] = useState<OfflineQueueItem[]>(
    storageService.getOfflineQueue(),
  );

  useEffect(() => {
    const handleOnline = () => {
      setWasOffline(true);
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

  const addToQueue = useCallback((item: OfflineQueueItem) => {
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
        await axiosInstance.request({
          url: item.url,
          method: item.method,
          data: item.data,
          headers: item.headers,
        });
        logger.debug('Synced item:', item.url);
      } catch (error) {
        logger.error('Failed to sync item:', error);
        storageService.addToOfflineQueue(item);
      }
    }

    setQueue(storageService.getOfflineQueue());
  }, [isOnline, queue]);

  return {
    isOnline,
    wasOffline,
    queue,
    addToQueue,
    syncQueue,
  };
};
