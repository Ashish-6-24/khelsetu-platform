import { describe, expect, it } from 'vitest';
import { translations } from '@features/i18n/translations';

const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

describe('i18n Utilities', () => {
  it('should have translations for all supported languages', () => {
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('ne');
    expect(translations).toHaveProperty('hi');
  });

  it('should resolve nested translation keys correctly', () => {
    const en = translations.en as Record<string, unknown>;
    expect(getNestedValue(en, 'common.home')).toBe('Home');
    expect(getNestedValue(en, 'nav.tournaments')).toBe('Tournaments');
    expect(getNestedValue(en, 'auth.login')).toBe('Login');
  });

  it('should have consistent keys across languages', () => {
    const enKeys = JSON.stringify(Object.keys(translations.en));
    const neKeys = JSON.stringify(Object.keys(translations.ne));
    const hiKeys = JSON.stringify(Object.keys(translations.hi));
    expect(enKeys).toBe(neKeys);
    expect(enKeys).toBe(hiKeys);
  });

  it('should return key as fallback for missing translations', () => {
    const en = translations.en as Record<string, unknown>;
    expect(getNestedValue(en, 'nonexistent.key')).toBe('nonexistent.key');
  });
});
