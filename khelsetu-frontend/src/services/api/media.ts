import { api } from '@lib/axios';
import { API_ENDPOINTS } from '@utils/constants';
import { MediaItem } from '@features/media-gallery/types';

interface MediaResponse {
  data: MediaItem[];
  total: number;
}

export const mediaService = {
  getAll: async (params?: Record<string, string>): Promise<MediaResponse> => {
    const response = await api.get<MediaResponse>(API_ENDPOINTS.MEDIA.LIST, { params });
    return response.data;
  },

  upload: async (file: File, metadata: Partial<MediaItem>): Promise<MediaItem> => {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });
    const response = await api.post<MediaItem>(API_ENDPOINTS.MEDIA.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.MEDIA.DELETE}/${id}`);
  },
};
