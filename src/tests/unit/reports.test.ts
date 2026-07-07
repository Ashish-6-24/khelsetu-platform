import { describe, expect, it } from 'vitest';

const formatExportFilename = (reportId: string, format: string): string => {
  return `report-${reportId}.${format}`;
};

const getExportMimeType = (format: string): string => {
  const types: Record<string, string> = {
    csv: 'text/csv',
    json: 'application/json',
    pdf: 'application/pdf',
  };
  return types[format] ?? 'application/octet-stream';
};

describe('Reports Utilities', () => {
  it('should format export filename correctly', () => {
    expect(formatExportFilename('r1', 'csv')).toBe('report-r1.csv');
    expect(formatExportFilename('r2', 'json')).toBe('report-r2.json');
    expect(formatExportFilename('r3', 'pdf')).toBe('report-r3.pdf');
  });

  it('should return correct MIME types', () => {
    expect(getExportMimeType('csv')).toBe('text/csv');
    expect(getExportMimeType('json')).toBe('application/json');
    expect(getExportMimeType('pdf')).toBe('application/pdf');
    expect(getExportMimeType('unknown')).toBe('application/octet-stream');
  });
});
