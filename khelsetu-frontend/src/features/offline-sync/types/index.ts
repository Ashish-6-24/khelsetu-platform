export type SyncStatus = 'pending' | 'syncing' | 'completed' | 'failed';

export interface SyncEntry {
  id: string;
  type: 'score' | 'match' | 'tournament' | 'team' | 'player';
  action: 'create' | 'update' | 'delete';
  payload: Record<string, unknown>;
  status: SyncStatus;
  createdAt: string;
  syncedAt?: string;
  error?: string;
  retryCount: number;
}

export interface SyncQueue {
  entries: SyncEntry[];
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt?: string;
}

export interface OfflineSyncState {
  queue: SyncQueue;
  addEntry: (entry: Omit<SyncEntry, 'id' | 'status' | 'createdAt' | 'retryCount'>) => void;
  removeEntry: (id: string) => void;
  updateEntryStatus: (id: string, status: SyncStatus, error?: string) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setSyncing: (isSyncing: boolean) => void;
  setLastSyncedAt: (timestamp: string) => void;
  clearCompleted: () => void;
  getPendingEntries: () => SyncEntry[];
}
