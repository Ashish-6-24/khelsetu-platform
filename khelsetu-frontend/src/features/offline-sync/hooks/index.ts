import type { SyncEntry } from '@features/offline-sync/types';
import { offlineSyncService } from '@features/offline-sync/services';
import { useOfflineSyncStore } from '@features/offline-sync/store';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useOfflineSync = () => {
  const {
    queue,
    addEntry,
    removeEntry,
    updateEntryStatus,
    setOnlineStatus,
    setSyncing,
    setLastSyncedAt,
    clearCompleted,
    getPendingEntries,
  } = useOfflineSyncStore();

  const syncBatchMutation = useMutation({
    mutationFn: async (entries: SyncEntry[]) => {
      return offlineSyncService.syncBatch(entries);
    },
    onSuccess: (result) => {
      result.success.forEach((id) => {
        updateEntryStatus(id, 'completed');
      });
      result.failed.forEach(({ id, error }) => {
        updateEntryStatus(id, 'failed', error);
      });
      setLastSyncedAt(new Date().toISOString());
      setSyncing(false);
    },
    onError: () => {
      setSyncing(false);
    },
  });

  const syncPending = () => {
    const pending = getPendingEntries();
    if (pending.length === 0 || !queue.isOnline) return;

    setSyncing(true);
    syncBatchMutation.mutate(pending);
  };

  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      const pending = getPendingEntries();
      if (pending.length > 0) {
        setSyncing(true);
        syncBatchMutation.mutate(pending);
      }
    };
    const handleOffline = () => {
      setOnlineStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus, getPendingEntries, setSyncing, syncBatchMutation]);

  const pendingCount = queue.entries.filter((e) => e.status === 'pending').length;
  const failedCount = queue.entries.filter((e) => e.status === 'failed').length;

  return {
    queue,
    pendingCount,
    failedCount,
    addEntry,
    removeEntry,
    syncPending,
    clearCompleted,
    isSyncing: queue.isSyncing || syncBatchMutation.isPending,
  };
};
