import { api } from '@lib/axios';
import type { CertificateData } from '@features/certificates/types';

export const certificateService = {
  generate: async (data: CertificateData) => {
    const response = await api.post<CertificateData>('/api/certificates', data);
    return response.data;
  },

  verify: async (id: string) => {
    const response = await api.get<CertificateData>(`/api/certificates/verify/${id}`);
    return response.data;
  },

  list: async () => {
    const response = await api.get<CertificateData[]>('/api/certificates');
    return response.data;
  },
};
