import { reportsService } from '@features/reports/services';
import { getMockReport, useReportsStore } from '@features/reports/store';
import type { ExportFormat, ReportType } from '@features/reports/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';

export const useReports = () => {
  const queryClient = useQueryClient();
  const {
    reports,
    exportJobs,
    isLoading,
    setReports,
    addExportJob,
    updateExportJob,
    setLoading,
  } = useReportsStore();

  const { data, isLoading: loadingReports } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportsService.getReports(),
  });

  useEffect(() => {
    if (data) setReports(data);
  }, [data, setReports]);

  const generateMutation = useMutation({
    mutationFn: async ({
      type,
    }: {
      type: ReportType;
      filters: Record<string, unknown>;
    }) => {
      return getMockReport(type);
    },
    onMutate: () => setLoading(true),
    onSuccess: (report) => {
      setReports([report, ...reports]);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const exportMutation = useMutation({
    mutationFn: async ({
      reportId,
      format,
    }: {
      reportId: string;
      format: ExportFormat;
    }) => {
      const jobId = `job-${Date.now()}`;
      addExportJob({
        id: jobId,
        reportId,
        format,
        status: 'processing',
        createdAt: new Date().toISOString(),
      });
      await reportsService.downloadReport(reportId, format);
      return jobId;
    },
    onSuccess: (jobId) => {
      updateExportJob(jobId, 'completed');
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  return {
    reports,
    exportJobs,
    isLoading: isLoading || loadingReports,
    generateReport: generateMutation.mutate,
    exportReport: exportMutation.mutate,
    isGenerating: generateMutation.isPending,
    isExporting: exportMutation.isPending,
  };
};
