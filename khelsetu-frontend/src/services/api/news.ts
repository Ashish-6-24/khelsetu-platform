import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@utils/constants';
import type { NewsArticle } from '@features/news/types';

export const newsService = {
  getAll: async (params?: Record<string, string>) => {
    const response = await api.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS.LIST,
      { params },
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<NewsArticle>(
      API_ENDPOINTS.NEWS.DETAIL(id),
    );
    return response.data;
  },

  getByCategory: async (category: string) => {
    const response = await api.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS.LIST,
      { params: { category } },
    );
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS.LIST,
      { params: { search: query } },
    );
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS.LIST,
      { params: { featured: 'true' } },
    );
    return response.data;
  },

  getTrending: async () => {
    const response = await api.get<NewsArticle[]>(
      API_ENDPOINTS.NEWS.LIST,
      { params: { trending: 'true' } },
    );
    return response.data;
  },
};
