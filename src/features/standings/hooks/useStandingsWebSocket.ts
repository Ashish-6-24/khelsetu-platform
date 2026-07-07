import { useStandingsStore } from '@features/standings/store';
import type { Standing } from '@features/standings/types';
import { wsService } from '@lib/websocket-client';
import { useQueryClient } from '@tanstack/react-query';

import { useCallback, useEffect } from 'react';

export const useStandingsWebSocket = (tournamentId?: string) => {
  const queryClient = useQueryClient();
  const { setStandings } = useStandingsStore();

  const handleStandingsUpdate = useCallback(
    (data: unknown) => {
      const payload = data as { tournamentId: string; standings: Standing[] };
      if (payload.tournamentId && payload.standings) {
        setStandings(payload.standings);
        queryClient.setQueryData(
          ['standings', payload.tournamentId],
          payload.standings,
        );
        queryClient.invalidateQueries({
          queryKey: ['standings', payload.tournamentId],
        });
      }
    },
    [queryClient, setStandings],
  );

  useEffect(() => {
    if (!tournamentId) return;

    wsService.on('standings_update', handleStandingsUpdate);

    return () => {
      wsService.off('standings_update', handleStandingsUpdate);
    };
  }, [tournamentId, handleStandingsUpdate]);

  return {
    subscribe: () => {
      if (tournamentId) {
        wsService.on('standings_update', handleStandingsUpdate);
      }
    },
    unsubscribe: () => {
      if (tournamentId) {
        wsService.off('standings_update', handleStandingsUpdate);
      }
    },
  };
};
