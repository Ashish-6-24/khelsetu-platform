import { describe, expect, it } from 'vitest';

const calculateBundleSize = (size: number): { size: string; unit: string } => {
  if (size >= 1024 * 1024) {
    return { size: (size / (1024 * 1024)).toFixed(2), unit: 'MB' };
  }
  if (size >= 1024) {
    return { size: (size / 1024).toFixed(2), unit: 'KB' };
  }
  return { size: size.toString(), unit: 'B' };
};

const isBundleSizeAcceptable = (sizeInKB: number, threshold: number = 500): boolean => {
  return sizeInKB <= threshold;
};

describe('Performance Utilities', () => {
  it('should calculate bundle size correctly', () => {
    expect(calculateBundleSize(500)).toEqual({ size: '500', unit: 'B' });
    expect(calculateBundleSize(1024)).toEqual({ size: '1.00', unit: 'KB' });
    expect(calculateBundleSize(512000)).toEqual({ size: '500.00', unit: 'KB' });
    expect(calculateBundleSize(1048576)).toEqual({ size: '1.00', unit: 'MB' });
  });

  it('should check bundle size acceptability', () => {
    expect(isBundleSizeAcceptable(400)).toBe(true);
    expect(isBundleSizeAcceptable(500)).toBe(true);
    expect(isBundleSizeAcceptable(600)).toBe(false);
    expect(isBundleSizeAcceptable(1000, 1000)).toBe(true);
  });

  it('should use default threshold of 500KB', () => {
    expect(isBundleSizeAcceptable(499)).toBe(true);
    expect(isBundleSizeAcceptable(501)).toBe(false);
  });
});
