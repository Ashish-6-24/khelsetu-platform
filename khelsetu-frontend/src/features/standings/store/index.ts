import type { Standing } from '@features/standings/types';
import { create } from 'zustand';

interface StandingsState {
  standings: Standing[];
  setStandings: (standings: Standing[]) => void;
  clearStandings: () => void;
}

export const useStandingsStore = create<StandingsState>((set) => ({
  standings: [],
  setStandings: (standings) => set({ standings }),
  clearStandings: () => set({ standings: [] }),
}));
