import { useSearchStore } from '@features/search/store';
import type { SearchResult } from '@features/search/types';
import { useDebounce } from '@hooks/performance';

import { useEffect, useMemo } from 'react';

const mockData: SearchResult[] = [
  {
    id: '1',
    type: 'tournaments',
    title: 'Nepal Premier League 2024',
    description: 'Annual cricket tournament',
    url: '/tournaments/1',
    score: 0.95,
  },
  {
    id: '2',
    type: 'tournaments',
    title: 'Kathmandu Marathon',
    description: 'Running event',
    url: '/tournaments/2',
    score: 0.85,
  },
  {
    id: '3',
    type: 'teams',
    title: 'Nepal National Cricket Team',
    description: 'National cricket squad',
    url: '/teams/3',
    score: 0.9,
  },
  {
    id: '4',
    type: 'teams',
    title: 'Kathmandu Kings',
    description: 'Professional cricket team',
    url: '/teams/4',
    score: 0.8,
  },
  {
    id: '5',
    type: 'players',
    title: 'Sandeep Lamichhane',
    description: 'Cricket player',
    url: '/players/5',
    score: 0.92,
  },
  {
    id: '6',
    type: 'players',
    title: 'Anil Mandal',
    description: 'Football player',
    url: '/players/6',
    score: 0.75,
  },
  {
    id: '7',
    type: 'matches',
    title: 'NPL Final 2024',
    description: 'Cricket final match',
    url: '/scoring/7',
    score: 0.88,
  },
];

export const useSearch = () => {
  const {
    query,
    results,
    filters,
    isLoading,
    recentSearches,
    setQuery,
    setResults,
    setLoading,
    setFilters,
    addRecentSearch,
    clearRecentSearches,
    resetSearch,
  } = useSearchStore();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const filtered = mockData
        .filter((item) => {
          const matchesQuery =
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(debouncedQuery.toLowerCase());
          const matchesCategory = filters.categories.includes(item.type);
          return matchesQuery && matchesCategory;
        })
        .sort((a, b) => b.score - a.score);

      setResults(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [debouncedQuery, filters.categories, setResults, setLoading]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      addRecentSearch(newQuery.trim());
    }
  };

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((result) => {
      const type = result.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(result);
    });
    return groups;
  }, [results]);

  return {
    query,
    results,
    groupedResults,
    filters,
    isLoading,
    recentSearches,
    handleSearch,
    setFilters,
    clearRecentSearches,
    resetSearch,
  };
};
