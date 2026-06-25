import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { useI18n } from '@features/i18n/hooks';
import type { Language } from '@features/i18n/translations';
import { languageNames } from '@features/i18n/translations';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage, availableLanguages } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]" />
      <div className="flex gap-1">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              language === lang.code
                ? 'bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] dark:bg-[rgb(127_29_29/0.18)] dark:text-[var(--brand-primary)] font-medium'
                : 'text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] hover:bg-gray-100 dark:hover:bg-[var(--bg-surface-raised)]'
            }`}
            title={lang.name}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export const I18nDemo = () => {
  const { t, language, setLanguage } = useI18n();

  const languages: Language[] = ['en', 'ne'];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
          {t('tournaments.title')}
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setLanguage(lang)}
              >
                {languageNames[lang]}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-[var(--text-primary)] dark:text-white">
              Translations:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded">
                <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  common.home:
                </span>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {t('common.home')}
                </p>
              </div>
              <div className="p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded">
                <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  common.search:
                </span>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {t('common.search')}
                </p>
              </div>
              <div className="p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded">
                <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  nav.tournaments:
                </span>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {t('nav.tournaments')}
                </p>
              </div>
              <div className="p-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] rounded">
                <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  auth.login:
                </span>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {t('auth.login')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
