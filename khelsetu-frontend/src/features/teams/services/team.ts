import { api } from '@lib/axios';
import type { Team } from '@shared/types/tournament';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

export interface CreateTeamInput {
  name: string;
  shortName: string;
  tournamentId: string;
  captainId?: string;
  logo?: string;
}

export interface UpdateTeamInput {
  name?: string;
  shortName?: string;
  captainId?: string;
  logo?: string;
}

export const teamService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get(API_ENDPOINTS.TEAMS.LIST, { params });
    return normalizeArray<Team>(response.data);
  },

  getById: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.TEAMS.DETAIL(id));
    return normalizeObject<Team>(response.data);
  },

  create: async (data: CreateTeamInput) => {
    const response = await api.post<Team>(API_ENDPOINTS.TEAMS.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: UpdateTeamInput) => {
    const response = await api.put<Team>(API_ENDPOINTS.TEAMS.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(API_ENDPOINTS.TEAMS.DETAIL(id));
  },

  getByTournament: async (tournamentId: string) => {
    const response = await api.get(`/tournaments/${tournamentId}/teams`);
    return normalizeArray<Team>(response.data);
  },
};
