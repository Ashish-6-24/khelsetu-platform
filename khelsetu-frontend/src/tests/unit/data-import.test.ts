import { describe, expect, it } from 'vitest';

const validateCSVFormat = (
  content: string,
): { valid: boolean; errors: string[] } => {
  const lines = content.trim().split('\n');
  if (lines.length < 2)
    return {
      valid: false,
      errors: ['CSV must have header and at least one data row'],
    };
  const headerCount = lines[0]!.split(',').length;
  const errors: string[] = [];
  lines.slice(1).forEach((line, i) => {
    const colCount = line.split(',').length;
    if (colCount !== headerCount)
      errors.push(
        `Row ${i + 2}: expected ${headerCount} columns, got ${colCount}`,
      );
  });
  return { valid: errors.length === 0, errors };
};

const getImportStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'failed':
      return 'error';
    case 'processing':
      return 'info';
    default:
      return 'default';
  }
};

describe('Data Import Utilities', () => {
  it('should validate CSV format correctly', () => {
    const validCSV = 'name,age,city\nJohn,30,Kathmandu\nJane,25,Pokhara';
    expect(validateCSVFormat(validCSV).valid).toBe(true);

    const invalidCSV = 'name,age,city\nJohn,30';
    expect(validateCSVFormat(invalidCSV).valid).toBe(false);
  });

  it('should return correct import status colors', () => {
    expect(getImportStatusColor('completed')).toBe('success');
    expect(getImportStatusColor('failed')).toBe('error');
    expect(getImportStatusColor('processing')).toBe('info');
  });
});
