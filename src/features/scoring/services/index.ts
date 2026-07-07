import { axiosInstance } from '@lib/axios';
import type {
  BasketballEvent,
  CricketBall,
  FootballEvent,
  MatchConfig,
  MatchScore,
  SportType,
  VolleyballEvent,
} from '@shared/types/scoring';
import type { Match, MatchStatus } from '@shared/types/tournament';
import { normalizeObject } from '@shared/utils/normalize';

export const scoringService = {
  getMatch: async (matchId: string) => {
    const { data } = await axiosInstance.get(`/matches/${matchId}`);
    return normalizeObject<Match>(data);
  },

  updateMatchStatus: async (matchId: string, status: MatchStatus) => {
    const { data } = await axiosInstance.patch<Match>(
      `/matches/${matchId}/status`,
      { status },
    );
    return data;
  },

  startMatch: async (matchId: string) => {
    const { data } = await axiosInstance.post<Match>(
      `/matches/${matchId}/start`,
    );
    return data;
  },

  pauseMatch: async (matchId: string) => {
    const { data } = await axiosInstance.post<Match>(
      `/matches/${matchId}/pause`,
    );
    return data;
  },

  endMatch: async (matchId: string, result: Record<string, unknown>) => {
    const { data } = await axiosInstance.post<Match>(
      `/matches/${matchId}/end`,
      { result },
    );
    return data;
  },

  getLiveScore: async (matchId: string, sport: SportType) => {
    const { data } = await axiosInstance.get<MatchScore>(
      `/matches/${matchId}/score/${sport}`,
    );
    return data;
  },

  submitCricketBall: async (matchId: string, ball: CricketBall) => {
    const { data } = await axiosInstance.post<MatchScore>(
      `/matches/${matchId}/score/cricket`,
      ball,
    );
    return data;
  },

  submitFootballEvent: async (matchId: string, event: FootballEvent) => {
    const { data } = await axiosInstance.post<MatchScore>(
      `/matches/${matchId}/score/football`,
      event,
    );
    return data;
  },

  submitVolleyballPoint: async (matchId: string, point: VolleyballEvent) => {
    const { data } = await axiosInstance.post<MatchScore>(
      `/matches/${matchId}/score/volleyball`,
      point,
    );
    return data;
  },

  submitBasketballEvent: async (matchId: string, event: BasketballEvent) => {
    const { data } = await axiosInstance.post<MatchScore>(
      `/matches/${matchId}/score/basketball`,
      event,
    );
    return data;
  },

  getMatchConfig: async (matchId: string) => {
    const { data } = await axiosInstance.get<MatchConfig>(
      `/matches/${matchId}/config`,
    );
    return data;
  },
};
