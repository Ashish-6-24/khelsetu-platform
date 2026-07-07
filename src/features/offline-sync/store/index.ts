import type { OfflineSyncState, SyncEntry } from '@features/offline-sync/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useOfflineSyncStore = create<OfflineSyncState>()(
  persist(
    (set, get) => ({
      queue: {
        entries: [],
        isOnline: navigator.onLine,
        isSyncing: false,
        lastSyncedAt: undefined,
      },

      addEntry: (entry) =>
        set((state) => {
          const newEntry: SyncEntry = {
            ...entry,
            id: generateId(),
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
            retryCount: 0,
          };
          return {
            queue: {
              ...state.queue,
              entries: [...state.queue.entries, newEntry],
            },
          };
        }),

      removeEntry: (id) =>
        set((state) => ({
          queue: {
            ...state.queue,
            entries: state.queue.entries.filter((e) => e.id !== id),
          },
        })),

      updateEntryStatus: (id, status, error) =>
        set((state) => ({
          queue: {
            ...state.queue,
            entries: state.queue.entries.map((e) =>
              e.id === id
                ? {
                    ...e,
                    status,
                    error,
                    syncedAt:
                      status === 'completed'
                        ? new Date().toISOString()
                        : e.syncedAt,
                    retryCount:
                      status === 'failed' ? e.retryCount + 1 : e.retryCount,
                  }
                : e,
            ),
          },
        })),

      setOnlineStatus: (isOnline) =>
        set((state) => ({
          queue: {
            ...state.queue,
            isOnline,
          },
        })),

      setSyncing: (isSyncing) =>
        set((state) => ({
          queue: {
            ...state.queue,
            isSyncing,
          },
        })),

      setLastSyncedAt: (timestamp) =>
        set((state) => ({
          queue: {
            ...state.queue,
            lastSyncedAt: timestamp,
          },
        })),

      clearCompleted: () =>
        set((state) => ({
          queue: {
            ...state.queue,
            entries: state.queue.entries.filter(
              (e) => e.status !== 'completed',
            ),
          },
        })),

      getPendingEntries: () => {
        const state = get();
        return state.queue.entries.filter(
          (e) => e.status === 'pending' || e.status === 'failed',
        );
      },
    }),
    {
      name: 'offline-sync-storage',
    },
  ),
);
