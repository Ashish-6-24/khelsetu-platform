import { Card, CardBody } from '@components/ui/Card';
import { I18nDemo, LanguageSwitcher } from '@features/i18n/components';
import { useI18n } from '@features/i18n/hooks';
import { translations } from '@features/i18n/translations';

export const I18nPage = () => {
  const { language, availableLanguages } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Internationalization
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage language preferences and translations
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      <Card>
        <CardBody>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Available Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-4 rounded-lg border ${
                    language === lang.code
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="font-bold text-gray-900 dark:text-white">
                    {lang.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Code: {lang.code.toUpperCase()}
                  </p>
                  {language === lang.code && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Active
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <I18nDemo />

      <Card>
        <CardBody>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Translation Keys
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    Key
                  </th>
                  {availableLanguages.map((lang) => (
                    <th
                      key={lang.code}
                      className="text-left py-2 px-3 text-gray-500 dark:text-gray-400"
                    >
                      {lang.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'common.home',
                  'common.search',
                  'nav.tournaments',
                  'nav.teams',
                  'auth.login',
                  'tournaments.title',
                ].map((key) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2 px-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                      {key}
                    </td>
                    {availableLanguages.map((lang) => {
                      const keys = key.split('.');
                      let value: unknown = (
                        translations as Record<string, unknown>
                      )[lang.code];
                      for (const k of keys) {
                        if (
                          value &&
                          typeof value === 'object' &&
                          k in (value as Record<string, unknown>)
                        ) {
                          value = (value as Record<string, unknown>)[k];
                        } else {
                          value = key;
                          break;
                        }
                      }
                      return (
                        <td
                          key={lang.code}
                          className="py-2 px-3 text-gray-900 dark:text-white"
                        >
                          {String(value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
