import { api } from '@lib/axios';
import type { Player } from '@shared/types/tournament';
import { API_ENDPOINTS } from '@shared/utils/constants';

export interface CreatePlayerInput {
  name: string;
  teamId: string;
  jerseyNumber?: number;
  position?: string;
}

export interface UpdatePlayerInput {
  name?: string;
  jerseyNumber?: number;
  position?: string;
}

export const playerService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get<Player[]>(API_ENDPOINTS.PLAYERS.LIST, {
      params,
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Player>(API_ENDPOINTS.PLAYERS.DETAIL(id));
    return response.data;
  },

  create: async (data: CreatePlayerInput) => {
    const response = await api.post<Player>(API_ENDPOINTS.PLAYERS.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: UpdatePlayerInput) => {
    const response = await api.patch<Player>(
      API_ENDPOINTS.PLAYERS.UPDATE(id),
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.PLAYERS.DETAIL(id));
  },

  getByTeam: async (teamId: string) => {
    const response = await api.get<Player[]>(`/teams/${teamId}/players`);
    return response.data;
  },
};
