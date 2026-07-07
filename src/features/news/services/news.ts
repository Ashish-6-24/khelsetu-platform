import type { NewsArticle } from '@features/news/types';
import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

export const newsService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get(API_ENDPOINTS.NEWS.LIST, { params });
    return normalizeArray<NewsArticle>(response.data);
  },

  getById: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.NEWS.DETAIL(id));
    return normalizeObject<NewsArticle>(response.data);
  },

  getByCategory: async (category: string) => {
    const response = await api.get(API_ENDPOINTS.NEWS.LIST, {
      params: { category },
    });
    return normalizeArray<NewsArticle>(response.data);
  },

  search: async (query: string) => {
    const response = await api.get(API_ENDPOINTS.NEWS.LIST, {
      params: { search: query },
    });
    return normalizeArray<NewsArticle>(response.data);
  },

  getFeatured: async () => {
    const response = await api.get(API_ENDPOINTS.NEWS.LIST, {
      params: { featured: 'true' },
    });
    return normalizeArray<NewsArticle>(response.data);
  },

  getTrending: async () => {
    const response = await api.get(API_ENDPOINTS.NEWS.LIST, {
      params: { trending: 'true' },
    });
    return normalizeArray<NewsArticle>(response.data);
  },
};
