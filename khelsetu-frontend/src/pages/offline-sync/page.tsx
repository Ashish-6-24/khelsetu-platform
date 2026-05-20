import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { Tabs } from '@components/ui/Tabs';
import { useOfflineSync } from '@features/offline-sync/hooks';
import { SyncEntryRow, SyncStatusBadge } from '@features/offline-sync/components';
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

  const completedCount = queue.entries.filter((e) => e.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Offline Sync
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pending</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {failedCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Failed</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {completedCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Synced</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Sync Queue ({filteredEntries.length})
          </h3>
        </CardHeader>
        <CardBody>
          {filteredEntries.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
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
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Last synced: {new Date(queue.lastSyncedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};
