import {
  playerService,
  type CreatePlayerInput,
} from '@features/teams/services/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

interface UsePlayersOptions {
  teamId?: string;
  search?: string;
  position?: string;
}

export function usePlayers({
  teamId,
  search,
  position,
}: UsePlayersOptions = {}) {
  const queryClient = useQueryClient();

  const {
    data: allPlayers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['players', teamId],
    queryFn: () =>
      teamId ? playerService.getByTeam(teamId) : playerService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const filteredPlayers = useMemo(() => {
    let result = allPlayers;

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(lower));
    }

    if (position && position !== 'all') {
      result = result.filter((p) => p.position === position);
    }

    return result;
  }, [allPlayers, search, position]);

  const sortedPlayers = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredPlayers]);

  const createMutation = useMutation({
    mutationFn: (data: CreatePlayerInput) => playerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });

  return {
    players: sortedPlayers,
    allPlayers,
    isLoading,
    isError,
    error,
    createPlayer: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}

export function usePlayerDetail(playerId: string) {
  const {
    data: player,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => playerService.getById(playerId),
    enabled: !!playerId,
  });

  return { player, isLoading, isError, error };
}
