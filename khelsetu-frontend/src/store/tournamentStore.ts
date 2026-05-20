import type { Match, Team, Tournament } from '@types-domain/tournament';
import { create } from 'zustand';

interface TournamentState {
  tournaments: Tournament[];
  activeTournament: Tournament | null;
  matches: Match[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}

interface TournamentActions {
  setTournaments: (tournaments: Tournament[]) => void;
  setActiveTournament: (tournament: Tournament | null) => void;
  setMatches: (matches: Match[]) => void;
  setTeams: (teams: Team[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addTournament: (tournament: Tournament) => void;
  updateTournament: (id: string, data: Partial<Tournament>) => void;
  removeTournament: (id: string) => void;
}

export const useTournamentStore = create<TournamentState & TournamentActions>(
  (set) => ({
    tournaments: [],
    activeTournament: null,
    matches: [],
    teams: [],
    isLoading: false,
    error: null,

    setTournaments: (tournaments) => set({ tournaments }),

    setActiveTournament: (tournament) => set({ activeTournament: tournament }),

    setMatches: (matches) => set({ matches }),

    setTeams: (teams) => set({ teams }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    addTournament: (tournament) =>
      set((state) => ({
        tournaments: [...state.tournaments, tournament],
      })),

    updateTournament: (id, data) =>
      set((state) => ({
        tournaments: state.tournaments.map((t) =>
          t.id === id ? { ...t, ...data } : t,
        ),
        activeTournament:
          state.activeTournament?.id === id
            ? { ...state.activeTournament, ...data }
            : state.activeTournament,
      })),

    removeTournament: (id) =>
      set((state) => ({
        tournaments: state.tournaments.filter((t) => t.id !== id),
        activeTournament:
          state.activeTournament?.id === id ? null : state.activeTournament,
      })),
  }),
);
