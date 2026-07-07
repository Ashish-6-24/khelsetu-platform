import { describe, expect, it } from 'vitest';

const getAriaRole = (element: string): string => {
  const roles: Record<string, string> = {
    button: 'button',
    link: 'link',
    input: 'textbox',
    select: 'listbox',
    checkbox: 'checkbox',
    radio: 'radio',
    dialog: 'dialog',
    alert: 'alert',
    navigation: 'navigation',
    main: 'main',
  };
  return roles[element] ?? 'generic';
};

const getContrastRatio = (luminance1: number, luminance2: number): number => {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
};

const isContrastPass = (ratio: number, level: 'AA' | 'AAA'): boolean => {
  if (level === 'AA') return ratio >= 4.5;
  return ratio >= 7;
};

describe('Accessibility Utilities', () => {
  it('should return correct ARIA roles', () => {
    expect(getAriaRole('button')).toBe('button');
    expect(getAriaRole('dialog')).toBe('dialog');
    expect(getAriaRole('alert')).toBe('alert');
    expect(getAriaRole('navigation')).toBe('navigation');
    expect(getAriaRole('unknown')).toBe('generic');
  });

  it('should calculate contrast ratio correctly', () => {
    expect(getContrastRatio(1, 0)).toBe(21);
    expect(getContrastRatio(0.5, 0.5)).toBe(1);
    expect(getContrastRatio(0.8, 0.2)).toBeCloseTo(3.4, 1);
  });

  it('should check AA contrast pass', () => {
    expect(isContrastPass(4.5, 'AA')).toBe(true);
    expect(isContrastPass(4.4, 'AA')).toBe(false);
    expect(isContrastPass(7, 'AA')).toBe(true);
  });

  it('should check AAA contrast pass', () => {
    expect(isContrastPass(7, 'AAA')).toBe(true);
    expect(isContrastPass(6.9, 'AAA')).toBe(false);
    expect(isContrastPass(4.5, 'AAA')).toBe(false);
  });
});
