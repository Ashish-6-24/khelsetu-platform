import { useQuery } from '@tanstack/react-query';
import { newsService } from '@services/api/news';
import type { NewsFilters } from '../types';

export function useNews(filters?: NewsFilters) {
  const params: Record<string, string> = {};
  if (filters?.category) params.category = filters.category;
  if (filters?.search) params.search = filters.search;
  if (filters?.dateFrom) params.dateFrom = filters.dateFrom;
  if (filters?.dateTo) params.dateTo = filters.dateTo;

  return useQuery({
    queryKey: ['news', filters],
    queryFn: () => newsService.getAll(Object.keys(params).length > 0 ? params : undefined),
  });
}

export function useNewsArticle(id: string) {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => newsService.getById(id),
    enabled: !!id,
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['news', 'featured'],
    queryFn: () => newsService.getFeatured(),
  });
}

export function useTrendingNews() {
  return useQuery({
    queryKey: ['news', 'trending'],
    queryFn: () => newsService.getTrending(),
  });
}
