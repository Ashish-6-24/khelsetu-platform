import { useI18nStore } from '@features/i18n/store';
import type { Language } from '@features/i18n/translations';
import { languageNames, translations } from '@features/i18n/translations';

export const useI18n = () => {
  const { language, t, setLanguage } = useI18nStore();

  const availableLanguages: { code: Language; name: string }[] = Object.keys(
    translations,
  ).map((code) => ({
    code: code as Language,
    name: languageNames[code as Language],
  }));

  return {
    language,
    t,
    setLanguage,
    availableLanguages,
  };
};
