export type ReportType =
  'tournament' | 'team' | 'player' | 'match' | 'analytics';
export type ExportFormat = 'csv' | 'json' | 'pdf';

export interface ReportConfig {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  dateRange: { start: string; end: string };
  filters: Record<string, unknown>;
}

export interface ReportData {
  id: string;
  name: string;
  type: ReportType;
  generatedAt: string;
  data: Record<string, unknown>[];
  summary: Record<string, number>;
}

export interface ExportJob {
  id: string;
  reportId: string;
  format: ExportFormat;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url?: string;
  createdAt: string;
}
