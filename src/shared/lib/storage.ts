import { logger } from '@lib/logger';

export const storageService = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch {
      return defaultValue ?? null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error('Failed to save to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },

  getOfflineQueue: <T>(): T[] => {
    return storageService.get<T[]>('offline_queue') ?? [];
  },

  addToOfflineQueue: <T>(item: T): void => {
    const queue = storageService.getOfflineQueue<T>();
    queue.push(item);
    storageService.set('offline_queue', queue);
  },

  clearOfflineQueue: (): void => {
    storageService.remove('offline_queue');
  },
};
