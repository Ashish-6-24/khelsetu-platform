import type {
  ExportFormat,
  ReportData,
  ReportType,
} from '@features/reports/types';
import { axiosInstance } from '@lib/axios';
import { normalizeArray } from '@shared/utils/normalize';

export const reportsService = {
  generateReport: async (
    type: ReportType,
    filters: Record<string, unknown>,
  ): Promise<ReportData> => {
    const { data } = await axiosInstance.post<ReportData>('/reports/generate', {
      type,
      filters,
    });
    return data;
  },

  getReports: async (): Promise<ReportData[]> => {
    const { data } = await axiosInstance.get('/reports');
    return normalizeArray<ReportData>(data);
  },

  exportReport: async (
    reportId: string,
    format: ExportFormat,
  ): Promise<Blob> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return data;
  },

  downloadReport: async (
    reportId: string,
    format: ExportFormat,
  ): Promise<void> => {
    const blob = await reportsService.exportReport(reportId, format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${reportId}.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};
