import { teamService } from '@features/teams/services/team';
import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';

interface UseTeamsOptions {
  tournamentId?: string;
  search?: string;
}

export function useTeams({ tournamentId, search }: UseTeamsOptions = {}) {
  const {
    data: allTeams = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['teams', tournamentId],
    queryFn: () =>
      tournamentId
        ? teamService.getByTournament(tournamentId)
        : teamService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const filteredTeams = useMemo(() => {
    if (!search) return allTeams;
    const lower = search.toLowerCase();
    return allTeams.filter(
      (t) =>
        t.name.toLowerCase().includes(lower) ||
        t.shortName.toLowerCase().includes(lower),
    );
  }, [allTeams, search]);

  const sortedTeams = useMemo(() => {
    return [...filteredTeams].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredTeams]);

  return {
    teams: sortedTeams,
    allTeams,
    isLoading,
    isError,
    error,
  };
}

export function useTeamDetail(teamId: string) {
  const {
    data: team,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamService.getById(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
  });

  return { team, isLoading, isError, error };
}
