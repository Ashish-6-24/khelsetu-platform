import type {
  SearchFilters,
  SearchResult,
  SearchState,
} from '@features/search/types';
import { create } from 'zustand';

interface SearchStore extends SearchState {
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setLoading: (isLoading: boolean) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  results: [],
  filters: { categories: ['tournaments', 'teams', 'players', 'matches'] },
  isLoading: false,
  recentSearches: [],

  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setLoading: (isLoading) => set({ isLoading }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  addRecentSearch: (query) =>
    set((state) => {
      const searches = [
        query,
        ...state.recentSearches.filter((s) => s !== query),
      ].slice(0, 10);
      return { recentSearches: searches };
    }),
  clearRecentSearches: () => set({ recentSearches: [] }),
  resetSearch: () =>
    set({
      query: '',
      results: [],
      isLoading: false,
    }),
}));
