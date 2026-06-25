import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import type {
  ExportFormat,
  ReportData,
  ReportType,
} from '@features/reports/types';
import { BarChart3, Download, FileText, Table } from 'lucide-react';

const reportIcons: Record<ReportType, React.ReactNode> = {
  tournament: <BarChart3 className="w-5 h-5" />,
  team: <Table className="w-5 h-5" />,
  player: <FileText className="w-5 h-5" />,
  match: <BarChart3 className="w-5 h-5" />,
  analytics: <BarChart3 className="w-5 h-5" />,
};

interface ReportCardProps {
  report: ReportData;
  onExport: (reportId: string, format: ExportFormat) => void;
  isExporting?: boolean;
}

export const ReportCard = ({
  report,
  onExport,
  isExporting,
}: ReportCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 dark:text-blue-400">
              {reportIcons[report.type]}
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {report.name}
            </h3>
          </div>
          <Badge variant="default" className="capitalize">
            {report.type}
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            Generated: {new Date(report.generatedAt).toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(report.summary).map(([key, value]) => (
              <div
                key={key}
                className="p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded-lg"
              >
                <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] capitalize">
                  {key}
                </p>
                <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
                  {String(value)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(report.id, 'csv')}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-1" />
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(report.id, 'json')}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-1" />
              JSON
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface ReportGeneratorProps {
  onGenerate: (type: ReportType) => void;
  isGenerating?: boolean;
}

export const ReportGenerator = ({
  onGenerate,
  isGenerating,
}: ReportGeneratorProps) => {
  const reportTypes: ReportType[] = [
    'tournament',
    'team',
    'player',
    'match',
    'analytics',
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
          Generate Report
        </h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {reportTypes.map((type) => (
            <button
              key={type}
              onClick={() => onGenerate(type)}
              disabled={isGenerating}
              className="p-3 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)] transition-colors capitalize text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] disabled:opacity-50"
            >
              {type}
            </button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
