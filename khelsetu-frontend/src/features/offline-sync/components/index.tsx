import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import type { SyncEntry } from '@features/offline-sync/types';
import {
  CheckCircle,
  Clock,
  RefreshCw,
  Trash2,
  Wifi,
  WifiOff,
  XCircle,
} from 'lucide-react';

interface SyncStatusBadgeProps {
  isOnline: boolean;
  pendingCount: number;
  failedCount: number;
  isSyncing: boolean;
  onSync: () => void;
  onClearCompleted: () => void;
}

export const SyncStatusBadge = ({
  isOnline,
  pendingCount,
  failedCount,
  isSyncing,
  onSync,
  onClearCompleted,
}: SyncStatusBadgeProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-600 dark:text-red-400" />
        )}
        <span className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {pendingCount > 0 && (
        <Badge variant="warning">{pendingCount} pending</Badge>
      )}

      {failedCount > 0 && <Badge variant="error">{failedCount} failed</Badge>}

      <Button
        variant="ghost"
        size="sm"
        onClick={onSync}
        disabled={!isOnline || isSyncing}
        className="text-xs"
      >
        <RefreshCw
          className={`w-3 h-3 mr-1 ${isSyncing ? 'animate-spin' : ''}`}
        />
        Sync
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearCompleted}
        className="text-xs"
      >
        <Trash2 className="w-3 h-3 mr-1" />
        Clear
      </Button>
    </div>
  );
};

interface SyncEntryRowProps {
  entry: SyncEntry;
  onRemove: (id: string) => void;
}

export const SyncEntryRow = ({ entry, onRemove }: SyncEntryRowProps) => {
  const getStatusIcon = (status: SyncEntry['status']) => {
    switch (status) {
      case 'completed':
        return (
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
        );
      case 'syncing':
        return (
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
        );
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />;
    }
  };

  const getStatusColor = (status: SyncEntry['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'syncing':
        return 'info';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
      <div className="flex items-center gap-3">
        {getStatusIcon(entry.status)}
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)] dark:text-white capitalize">
            {entry.action} {entry.type}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {new Date(entry.createdAt).toLocaleString()}
            {entry.retryCount > 0 && (
              <span className="ml-2">Retries: {entry.retryCount}</span>
            )}
          </p>
          {entry.error && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {entry.error}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={getStatusColor(entry.status)}>{entry.status}</Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(entry.id)}
          className="text-[var(--text-tertiary)] hover:text-red-600 dark:hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
