import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import type { Language } from '@features/i18n/translations';
import { languageNames } from '@features/i18n/translations';
import { useI18n } from '@features/i18n/hooks';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage, availableLanguages } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <div className="flex gap-1">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              language === lang.code
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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

  const languages: Language[] = ['en', 'ne', 'hi'];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
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
            <h4 className="font-medium text-gray-900 dark:text-white">Translations:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500 dark:text-gray-400">common.home:</span>
                <p className="font-medium text-gray-900 dark:text-white">{t('common.home')}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500 dark:text-gray-400">common.search:</span>
                <p className="font-medium text-gray-900 dark:text-white">{t('common.search')}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500 dark:text-gray-400">nav.tournaments:</span>
                <p className="font-medium text-gray-900 dark:text-white">{t('nav.tournaments')}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500 dark:text-gray-400">auth.login:</span>
                <p className="font-medium text-gray-900 dark:text-white">{t('auth.login')}</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
