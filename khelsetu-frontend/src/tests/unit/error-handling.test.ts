import { describe, expect, it } from 'vitest';

const getErrorSeverity = (statusCode: number): 'critical' | 'major' | 'minor' => {
  if (statusCode >= 500) return 'critical';
  if (statusCode >= 400) return 'major';
  return 'minor';
};

const isRetryableError = (statusCode: number): boolean => {
  return [408, 429, 500, 502, 503, 504].includes(statusCode);
};

describe('Error Handling Utilities', () => {
  it('should classify error severity correctly', () => {
    expect(getErrorSeverity(500)).toBe('critical');
    expect(getErrorSeverity(503)).toBe('critical');
    expect(getErrorSeverity(404)).toBe('major');
    expect(getErrorSeverity(401)).toBe('major');
    expect(getErrorSeverity(200)).toBe('minor');
  });

  it('should identify retryable errors', () => {
    expect(isRetryableError(408)).toBe(true);
    expect(isRetryableError(429)).toBe(true);
    expect(isRetryableError(500)).toBe(true);
    expect(isRetryableError(502)).toBe(true);
    expect(isRetryableError(503)).toBe(true);
    expect(isRetryableError(504)).toBe(true);
  });

  it('should identify non-retryable errors', () => {
    expect(isRetryableError(400)).toBe(false);
    expect(isRetryableError(401)).toBe(false);
    expect(isRetryableError(403)).toBe(false);
    expect(isRetryableError(404)).toBe(false);
  });
});
