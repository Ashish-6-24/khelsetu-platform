import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { standingsService } from '../services/standingsService';
import type { Standing } from '@shared/types/tournament';

interface UseStandingsManagerOptions {
  tournamentId: string;
}

export function useStandingsManager({
  tournamentId,
}: UseStandingsManagerOptions) {
  const queryClient = useQueryClient();

  const { data: standings = [], isLoading } = useQuery({
    queryKey: ['standings', tournamentId],
    queryFn: () => standingsService.getAll(tournamentId),
    enabled: !!tournamentId,
  });

  const bulkCreateMutation = useMutation({
    mutationFn: (teams: { teamId: string; teamName: string }[]) =>
      standingsService.bulkCreate(tournamentId, teams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standings', tournamentId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: string;
      data: Partial<Standing>;
    }) => standingsService.update(tournamentId, teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standings', tournamentId] });
    },
  });

  const initializeStandings = useCallback(
    async (teams: { id: string; name: string }[]) => {
      const sorted = standingsService.generateInitialStandings(teams);
      return bulkCreateMutation.mutateAsync(sorted);
    },
    [bulkCreateMutation],
  );

  const updateAfterMatch = useCallback(
    async (winnerId: string, loserId: string, drawn: boolean = false) => {
      const currentStandings =
        queryClient.getQueryData<Standing[]>(['standings', tournamentId]) ?? [];

      const updates: Promise<Standing>[] = [];

      if (drawn) {
        for (const standing of currentStandings) {
          if (standing.teamId === winnerId || standing.teamId === loserId) {
            updates.push(
              standingsService.update(
                tournamentId,
                standing.teamId,
                {
                  played: standing.played + 1,
                  drawn: standing.drawn + 1,
                  points: standing.points + 1,
                },
              ),
            );
          }
        }
      } else {
        for (const standing of currentStandings) {
          if (standing.teamId === winnerId) {
            updates.push(
              standingsService.update(tournamentId, winnerId, {
                played: standing.played + 1,
                won: standing.won + 1,
                points: standing.points + 2,
              }),
            );
          } else if (standing.teamId === loserId) {
            updates.push(
              standingsService.update(tournamentId, loserId, {
                played: standing.played + 1,
                lost: standing.lost + 1,
              }),
            );
          }
        }
      }

      try {
        await Promise.all(updates);
        queryClient.invalidateQueries({ queryKey: ['standings', tournamentId] });
      } catch (error) {
        console.error('Failed to update standings:', error);
        throw error;
      }
    },
    [tournamentId, queryClient],
  );

  const sortedStandings = useMemo(() => {
    return [...standings].sort((a, b) => {
      const pointDiff = b.points - a.points;
      if (pointDiff !== 0) return pointDiff;

      const nrrDiff = (b.nrr ?? 0) - (a.nrr ?? 0);
      if (nrrDiff !== 0) return nrrDiff;

      return a.teamName.localeCompare(b.teamName);
    });
  }, [standings]);

  const alphabeticalStandings = useMemo(() => {
    return [...standings].sort((a, b) => a.teamName.localeCompare(b.teamName));
  }, [standings]);

  return {
    standings,
    sortedStandings,
    alphabeticalStandings,
    isLoading,
    initializeStandings,
    updateAfterMatch,
    isInitializing: bulkCreateMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
