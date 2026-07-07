import {
  SyncEntryRow,
  SyncStatusBadge,
} from '@features/offline-sync/components';
import { useOfflineSync } from '@features/offline-sync/hooks';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { Tabs } from '@shared/ui/Tabs';

import { useState } from 'react';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'failed', label: 'Failed' },
  { id: 'completed', label: 'Completed' },
];

export const OfflineSyncPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const {
    queue,
    pendingCount,
    failedCount,
    syncPending,
    clearCompleted,
    removeEntry,
    isSyncing,
  } = useOfflineSync();

  const filteredEntries = queue.entries.filter((entry) => {
    if (activeTab === 'all') return true;
    return entry.status === activeTab;
  });

  const completedCount = queue.entries.filter(
    (e) => e.status === 'completed',
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Offline Sync
        </h1>
        <p className="text-[var(--text-tertiary)] mt-1">
          Manage queued operations and sync status
        </p>
      </div>

      <Card>
        <CardBody>
          <SyncStatusBadge
            isOnline={queue.isOnline}
            pendingCount={pendingCount}
            failedCount={failedCount}
            isSyncing={isSyncing}
            onSync={syncPending}
            onClearCompleted={clearCompleted}
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {pendingCount}
              </p>
              <p className="text-sm text-[var(--text-tertiary)] mt-1">
                Pending
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {failedCount}
              </p>
              <p className="text-sm text-[var(--text-tertiary)] mt-1">Failed</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {completedCount}
              </p>
              <p className="text-sm text-[var(--text-tertiary)] mt-1">Synced</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Sync Queue ({filteredEntries.length})
          </h3>
        </CardHeader>
        <CardBody>
          {filteredEntries.length === 0 ? (
            <p className="text-center text-[var(--text-tertiary)] py-8">
              No entries in queue
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((entry) => (
                <SyncEntryRow
                  key={entry.id}
                  entry={entry}
                  onRemove={removeEntry}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {queue.lastSyncedAt && (
        <p className="text-xs text-[var(--text-tertiary)] text-center">
          Last synced: {new Date(queue.lastSyncedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};
