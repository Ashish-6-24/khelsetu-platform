import { api } from '@lib/axios';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/constants';

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
