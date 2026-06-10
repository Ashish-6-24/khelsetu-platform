import type { SyncEntry } from '@features/offline-sync/types';
import { axiosInstance } from '@lib/axios';

const endpointMap: Record<SyncEntry['type'], string> = {
  score: '/scores',
  match: '/matches',
  tournament: '/tournaments',
  team: '/teams',
  player: '/players',
};

export const offlineSyncService = {
  syncEntry: async (entry: SyncEntry): Promise<void> => {
    const endpoint = endpointMap[entry.type];
    const { payload, action } = entry;

    switch (action) {
      case 'create':
        await axiosInstance.post(endpoint, payload);
        break;
      case 'update':
        await axiosInstance.put(`${endpoint}/${payload.id}`, payload);
        break;
      case 'delete':
        await axiosInstance.delete(`${endpoint}/${payload.id}`);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  },

  syncBatch: async (
    entries: SyncEntry[],
  ): Promise<{
    success: string[];
    failed: { id: string; error: string }[];
  }> => {
    const success: string[] = [];
    const failed: { id: string; error: string }[] = [];

    for (const entry of entries) {
      try {
        await offlineSyncService.syncEntry(entry);
        success.push(entry.id);
      } catch (error) {
        failed.push({
          id: entry.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return { success, failed };
  },

  getQueueStats: async (): Promise<{
    pending: number;
    failed: number;
    total: number;
  }> => {
    const { data } = await axiosInstance.get('/sync/stats');
    return data;
  },
};
