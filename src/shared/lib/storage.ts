import { logger } from '@lib/logger';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  OFFLINE_QUEUE: 'offline_queue',
  CACHE: 'cache',
} satisfies Record<string, string>;

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
    return storageService.get<T[]>(STORAGE_KEYS.OFFLINE_QUEUE) ?? [];
  },

  addToOfflineQueue: <T>(item: T): void => {
    const queue = storageService.getOfflineQueue<T>();
    queue.push(item);
    storageService.set(STORAGE_KEYS.OFFLINE_QUEUE, queue);
  },

  clearOfflineQueue: (): void => {
    storageService.remove(STORAGE_KEYS.OFFLINE_QUEUE);
  },
};

export const indexedDBService = {
  openDB: (name: string, version = 1): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('offline')) {
          db.createObjectStore('offline', { keyPath: 'id' });
        }
      };
    });
  },

  getItem: async <T>(
    dbName: string,
    storeName: string,
    key: string,
  ): Promise<T | null> => {
    const db = await indexedDBService.openDB(dbName);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result?.value ?? null);
      request.onerror = () => reject(request.error);
    });
  },

  setItem: async <T>(
    dbName: string,
    storeName: string,
    key: string,
    value: T,
  ): Promise<void> => {
    const db = await indexedDBService.openDB(dbName);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ key, value });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  deleteItem: async (
    dbName: string,
    storeName: string,
    key: string,
  ): Promise<void> => {
    const db = await indexedDBService.openDB(dbName);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
};
