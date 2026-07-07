import type { Player } from '@shared/types/tournament';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useMemo } from 'react';

import { playerService } from '../services/playerService';
import type { CreatePlayerInput } from '../services/playerService';

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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => playerService.delete(id),
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
    updatePlayer: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deletePlayer: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
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
