import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
import type { CreateVenueInput, Venue } from '../types';

export const venueService = {
  getAll: async (params?: Record<string, string>): Promise<Venue[]> => {
    const response = await api.get<Venue[]>(API_ENDPOINTS.VENUES.LIST, {
      params,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Venue> => {
    const response = await api.get<Venue>(API_ENDPOINTS.VENUES.DETAIL(id));
    return response.data;
  },

  create: async (data: CreateVenueInput): Promise<Venue> => {
    const response = await api.post<Venue>(
      API_ENDPOINTS.VENUES.CREATE,
      data,
    );
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
