import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useMemo } from 'react';

import { venueService } from '../services/venueService';
import type { CreateVenueInput, Venue } from '../types';

interface UseVenuesOptions {
  search?: string;
  status?: string;
}

export function useVenues({ search, status }: UseVenuesOptions = {}) {
  const queryClient = useQueryClient();

  const {
    data: venues = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['venues'],
    queryFn: () => venueService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const filteredVenues = useMemo(() => {
    let result = venues;

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(lower) ||
          v.location.toLowerCase().includes(lower),
      );
    }

    if (status && status !== 'all') {
      result = result.filter((v) => v.status === status);
    }

    return result;
  }, [venues, search, status]);

  const createMutation = useMutation({
    mutationFn: (data: CreateVenueInput) => venueService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Venue> }) =>
      venueService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => venueService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  return {
    venues: filteredVenues,
    allVenues: venues,
    isLoading,
    isError,
    error,
    createVenue: createMutation.mutateAsync,
    updateVenue: updateMutation.mutateAsync,
    deleteVenue: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
