import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { useQuery } from '@tanstack/react-query';

import type { MatchStatistics } from '../types';

export function useMatchStatistics(matchId: string) {
  return useQuery<MatchStatistics>({
    queryKey: ['match-statistics', matchId],
    queryFn: async (): Promise<MatchStatistics> => {
      const response = await api.get<MatchStatistics>(
        API_ENDPOINTS.MATCH_STATISTICS.GET(matchId),
      );
      return response.data;
    },
    enabled: !!matchId,
    staleTime: 30_000,
  });
}
