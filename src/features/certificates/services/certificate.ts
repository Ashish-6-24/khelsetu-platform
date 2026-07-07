import type { CertificateData } from '@features/certificates/types';
import { api } from '@lib/axios';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

export const certificateService = {
  generate: async (data: CertificateData) => {
    const response = await api.post<CertificateData>('/api/certificates', data);
    return response.data;
  },

  verify: async (id: string) => {
    const response = await api.get(`/api/certificates/verify/${id}`);
    return normalizeObject<CertificateData>(response.data);
  },

  list: async () => {
    const response = await api.get('/api/certificates');
    return normalizeArray<CertificateData>(response.data);
  },
};
