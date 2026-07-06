import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

import type { CreateVenueInput, Venue } from '../types';

export const venueService = {
  getAll: async (params?: Record<string, string>): Promise<Venue[]> => {
    const response = await api.get(API_ENDPOINTS.VENUES.LIST, { params });
    return normalizeArray<Venue>(response.data);
  },

  getById: async (id: string): Promise<Venue | null> => {
    const response = await api.get(API_ENDPOINTS.VENUES.DETAIL(id));
    return normalizeObject<Venue>(response.data);
  },

  create: async (data: CreateVenueInput): Promise<Venue> => {
    const response = await api.post<Venue>(API_ENDPOINTS.VENUES.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Venue>): Promise<Venue> => {
    const response = await api.put<Venue>(
      API_ENDPOINTS.VENUES.UPDATE(id),
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.VENUES.DELETE(id));
  },
};
