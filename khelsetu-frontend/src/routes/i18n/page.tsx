import { I18nDemo, LanguageSwitcher } from '@features/i18n/components';
import { useI18n } from '@features/i18n/hooks';
import { translations } from '@features/i18n/translations';
import { Card, CardBody } from '@shared/ui/Card';

export const I18nPage = () => {
  const { language, availableLanguages } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
            Internationalization
          </h1>
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
            Manage language preferences and translations
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      <Card>
        <CardBody>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              Available Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-4 rounded-lg border ${
                    language === lang.code
                      ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] dark:bg-[rgb(127_29_29/0.18)]'
                      : 'border-[var(--border-subtle)] dark:border-[var(--border-subtle)]'
                  }`}
                >
                  <p className="font-bold text-[var(--text-primary)] dark:text-white">
                    {lang.name}
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Code: {lang.code.toUpperCase()}
                  </p>
                  {language === lang.code && (
                    <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-primary)] mt-1">
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
          <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white mb-4">
            Translation Keys
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Key
                  </th>
                  {availableLanguages.map((lang) => (
                    <th
                      key={lang.code}
                      className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]"
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
                    className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
                  >
                    <td className="py-2 px-3 font-mono text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
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
                          className="py-2 px-3 text-[var(--text-primary)] dark:text-white"
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
