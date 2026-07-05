import { standingsService } from '@features/standings/services';
import { useStandingsStore } from '@features/standings/store';
import type { Standing } from '@features/standings/types';
import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

export const useStandings = (tournamentId: string) => {
  const { standings, setStandings } = useStandingsStore();

  const { data, isLoading, error, refetch } = useQuery<Standing[]>({
    queryKey: ['standings', tournamentId],
    queryFn: () => standingsService.getStandings(tournamentId),
    enabled: !!tournamentId,
  });

  useEffect(() => {
    if (data) {
      setStandings(data);
    }
  }, [data, setStandings]);

  return {
    standings: data ?? standings,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
};

export { useStandingsManager } from './useStandingsManager';
export { useStandingsWebSocket } from './useStandingsWebSocket';
