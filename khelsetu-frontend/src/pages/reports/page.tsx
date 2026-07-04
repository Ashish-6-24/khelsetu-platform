import { ReportCard, ReportGenerator } from '@features/reports/components';
import { useReports } from '@features/reports/hooks';
import type { ExportFormat, ReportType } from '@features/reports/types';
import { Skeleton } from '@shared/components/ui/Skeleton';

export const ReportsPage = () => {
  const {
    reports,
    exportJobs,
    isLoading,
    generateReport,
    exportReport,
    isGenerating,
    isExporting,
  } = useReports();

  const handleGenerate = (type: ReportType) => {
    generateReport({ type, filters: {} });
  };

  const handleExport = (reportId: string, format: ExportFormat) => {
    exportReport({ reportId, format });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Reports & Exports
        </h1>
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
          Generate and download reports for tournaments, teams, players, and
          matches
        </p>
      </div>

      <ReportGenerator
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            No reports generated yet. Click a report type above to generate one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onExport={handleExport}
              isExporting={isExporting}
            />
          ))}
        </div>
      )}

      {exportJobs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            Export Jobs
          </h3>
          {exportJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
            >
              <span className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                {job.format.toUpperCase()} export
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  job.status === 'completed'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : job.status === 'processing'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
