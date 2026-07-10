import { api } from '@lib/axios';
import type {
  CreateMatchInput,
  CreateTournamentInput,
  Match,
  ScoreUpdateInput,
  Team,
  Tournament,
} from '@shared/types/tournament';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

export const tournamentService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get(API_ENDPOINTS.TOURNAMENTS.LIST, { params });
    return normalizeArray<Tournament>(response.data);
  },

  getById: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.TOURNAMENTS.DETAIL(id));
    return normalizeObject<Tournament>(response.data);
  },

  create: async (data: CreateTournamentInput) => {
    const response = await api.post<Tournament>(
      API_ENDPOINTS.TOURNAMENTS.CREATE,
      data,
    );
    return response.data;
  },

  update: async (id: string, data: Partial<Tournament>) => {
    const response = await api.put<Tournament>(
      API_ENDPOINTS.TOURNAMENTS.UPDATE(id),
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(API_ENDPOINTS.TOURNAMENTS.DELETE(id));
  },

  getMatches: async (tournamentId: string) => {
    const response = await api.get(`/tournaments/${tournamentId}/matches`);
    return normalizeArray<Match>(response.data);
  },

  getTeams: async (tournamentId: string) => {
    const response = await api.get(`/tournaments/${tournamentId}/teams`);
    return normalizeArray<Team>(response.data);
  },

  getStandings: async (tournamentId: string) => {
    const response = await api.get(`/tournaments/${tournamentId}/standings`);
    return normalizeArray(response.data);
  },
};

export const matchService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get(API_ENDPOINTS.MATCHES.LIST, { params });
    return normalizeArray<Match>(response.data);
  },

  getById: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.MATCHES.DETAIL(id));
    return normalizeObject<Match>(response.data);
  },

  create: async (data: CreateMatchInput) => {
    const response = await api.post<Match>(API_ENDPOINTS.MATCHES.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Match>) => {
    const response = await api.patch<Match>(
      API_ENDPOINTS.MATCHES.UPDATE(id),
      data,
    );
    return response.data;
  },

  updateScore: async (id: string, score: ScoreUpdateInput) => {
    const response = await api.post<Match>(
      API_ENDPOINTS.MATCHES.SCORE(id),
      score,
    );
    return response.data;
  },
};
