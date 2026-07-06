import { api } from '@lib/axios';
import type { Standing } from '@shared/types/tournament';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray } from '@shared/utils/normalize';

export const standingsService = {
  getAll: async (tournamentId: string): Promise<Standing[]> => {
    const response = await api.get(
      API_ENDPOINTS.STANDINGS.LIST(tournamentId),
    );
    return normalizeArray<Standing>(response.data);
  },

  create: async (
    tournamentId: string,
    data: { teamId: string; teamName: string },
  ): Promise<Standing> => {
    const response = await api.post<Standing>(
      API_ENDPOINTS.STANDINGS.CREATE(tournamentId),
      data,
    );
    return response.data;
  },

  bulkCreate: async (
    tournamentId: string,
    teams: { teamId: string; teamName: string }[],
  ): Promise<Standing[]> => {
    const response = await api.post(
      API_ENDPOINTS.STANDINGS.BULK_CREATE(tournamentId),
      { teams },
    );
    return normalizeArray<Standing>(response.data);
  },

  update: async (
    tournamentId: string,
    teamId: string,
    data: Partial<Standing>,
  ): Promise<Standing> => {
    const response = await api.put<Standing>(
      API_ENDPOINTS.STANDINGS.UPDATE(tournamentId, teamId),
      data,
    );
    return response.data;
  },

  generateInitialStandings: (
    teams: { id: string; name: string }[],
  ): { teamId: string; teamName: string }[] => {
    return [...teams]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((team) => ({ teamId: team.id, teamName: team.name }));
  },
};
