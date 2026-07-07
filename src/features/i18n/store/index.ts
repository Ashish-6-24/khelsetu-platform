import type { Language, Translation } from '@features/i18n/translations';
import { translations } from '@features/i18n/translations';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface I18nState {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
}

const getNestedValue = (obj: Translation, path: string): string => {
  const keys = path.split('.');
  let current: Translation | string | undefined = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'en',
      t: (key: string) => {
        const state = get();
        return getNestedValue(translations[state.language], key);
      },
      setLanguage: (language) => set({ language }),
    }),
    { name: 'i18n-storage' },
  ),
);
