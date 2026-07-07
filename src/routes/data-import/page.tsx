import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { useToast } from '@shared/ui/toast-context';
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  Upload,
} from 'lucide-react';

import { useCallback, useState } from 'react';

interface ImportJob {
  id: string;
  fileName: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  records: number;
  date: string;
}

const mockImports: ImportJob[] = [
  {
    id: '1',
    fileName: 'teams_2024.csv',
    type: 'Teams',
    status: 'completed',
    records: 24,
    date: '2024-01-15',
  },
  {
    id: '2',
    fileName: 'players_roster.csv',
    type: 'Players',
    status: 'completed',
    records: 156,
    date: '2024-01-14',
  },
  {
    id: '3',
    fileName: 'matches_schedule.csv',
    type: 'Matches',
    status: 'failed',
    records: 0,
    date: '2024-01-13',
  },
];

export const DataImportPage = () => {
  const [imports] = useState<ImportJob[]>(mockImports);
  const [exportingType, setExportingType] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleExport = useCallback(
    async (type: string) => {
      setExportingType(type);
      try {
        const data = mockImports.filter((j) => j.type === type);
        const csv = [
          'File Name,Type,Status,Records,Date',
          ...data.map(
            (j) => `${j.fileName},${j.type},${j.status},${j.records},${j.date}`,
          ),
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${type.toLowerCase()}_export.csv`;
        link.click();
        URL.revokeObjectURL(url);
        addToast({
          type: 'success',
          message: `${type} data exported successfully`,
        });
      } catch {
        addToast({ type: 'error', message: `Failed to export ${type} data` });
      } finally {
        setExportingType(null);
      }
    },
    [addToast],
  );

  const handleDownloadTemplate = useCallback(() => {
    const template = 'Team Name,Short Name,Sport\nExample FC,EXM,Cricket';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'import_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Data Import/Export
        </h1>
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
          Bulk import and export data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              Import Data
            </h3>
          </CardHeader>
          <CardBody>
            <div className="border-2 border-dashed border-[var(--border-strong)] dark:border-[var(--border-subtle)] rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] mb-2">
                Drag and drop CSV file here
              </p>
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mb-4">
                or
              </p>
              <Button variant="primary" aria-label="Browse files to import">
                Browse Files
              </Button>
              <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-4">
                Supported: CSV, JSON (max 10MB)
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileText className="w-4 h-4" />}
                className="w-full"
                onClick={handleDownloadTemplate}
                aria-label="Download import CSV template"
              >
                Download Template
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              Export Data
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {['Tournaments', 'Teams', 'Players', 'Matches', 'Standings'].map(
                (type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
                  >
                    <span className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                      {type}
                    </span>
                    <Button
                      variant="create"
                      size="sm"
                      leftIcon={
                        !exportingType || exportingType !== type ? (
                          <Download className="w-4 h-4" />
                        ) : undefined
                      }
                      onClick={() => handleExport(type)}
                      isLoading={exportingType === type}
                      disabled={exportingType !== null}
                      aria-label={`Export ${type} data`}
                    >
                      {exportingType === type ? 'Exporting...' : 'Export'}
                    </Button>
                  </div>
                ),
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
            Import History
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {imports.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
              >
                <div className="flex items-center gap-3">
                  {job.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : job.status === 'failed' ? (
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-[var(--text-tertiary)]" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] dark:text-white">
                      {job.fileName}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      {job.type} • {job.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${job.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : job.status === 'failed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-[var(--text-secondary)]'}`}
                  >
                    {job.status}
                  </span>
                  {job.records > 0 && (
                    <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
                      {job.records} records
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
