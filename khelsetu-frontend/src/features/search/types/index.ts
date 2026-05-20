export type SearchCategory = 'tournaments' | 'teams' | 'players' | 'matches';

export interface SearchResult {
  id: string;
  type: SearchCategory;
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  score: number;
}

export interface SearchFilters {
  categories: SearchCategory[];
  dateRange?: { start: string; end: string };
  status?: string[];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  recentSearches: string[];
}
