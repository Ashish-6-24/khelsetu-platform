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

export const tournamentService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get<Tournament[]>(
      API_ENDPOINTS.TOURNAMENTS.LIST,
      { params },
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Tournament>(
      API_ENDPOINTS.TOURNAMENTS.DETAIL(id),
    );
    return response.data;
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
    const response = await api.get<Match[]>(
      `/tournaments/${tournamentId}/matches`,
    );
    return response.data;
  },

  getTeams: async (tournamentId: string) => {
    const response = await api.get<Team[]>(
      `/tournaments/${tournamentId}/teams`,
    );
    return response.data;
  },

  getStandings: async (tournamentId: string) => {
    const response = await api.get(`/tournaments/${tournamentId}/standings`);
    return response.data;
  },
};

export const matchService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get<Match[]>(API_ENDPOINTS.MATCHES.LIST, {
      params,
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Match>(API_ENDPOINTS.MATCHES.DETAIL(id));
    return response.data;
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
