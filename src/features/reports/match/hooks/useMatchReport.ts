import { api } from '@lib/axios';
import { useToast } from '@shared/ui/toast-context';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { MatchReport } from '../types';

export function useMatchReport(matchId: string) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const query = useQuery<MatchReport>({
    queryKey: ['match-report', matchId],
    queryFn: async (): Promise<MatchReport> => {
      const response = await api.get<MatchReport>(
        API_ENDPOINTS.MATCH_REPORTS.GET(matchId),
      );
      return response.data;
    },
    enabled: !!matchId,
  });

  const generateMutation = useMutation({
    mutationFn: async (): Promise<MatchReport> => {
      const response = await api.post<MatchReport>(
        API_ENDPOINTS.MATCH_REPORTS.GENERATE(matchId),
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['match-report', matchId], data);
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to generate match report' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (
      updates: Partial<Pick<MatchReport, 'title' | 'summary' | 'highlights'>>,
    ): Promise<MatchReport> => {
      const response = await api.put<MatchReport>(
        API_ENDPOINTS.MATCH_REPORTS.UPDATE(matchId),
        updates,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['match-report', matchId], data);
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to update match report' });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (): Promise<MatchReport> => {
      const response = await api.patch<MatchReport>(
        API_ENDPOINTS.MATCH_REPORTS.UPDATE(matchId),
        { isPublished: true, publishedAt: new Date().toISOString() },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['match-report', matchId], data);
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to publish match report' });
    },
  });

  return {
    report: query.data,
    isLoading: query.isLoading,
    error: query.error,
    generate: generateMutation,
    update: updateMutation,
    publish: publishMutation,
  };
}
