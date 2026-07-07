import { clsx } from 'clsx';
import { Globe } from 'lucide-react';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'ne';

const STORAGE_KEY = 'khelsetu-locale';

interface LanguageToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * EN | NE segmented control.
 *
 * Single tap to switch. Persisted in localStorage and reflected in the URL
 * query param `?lang=ne`. When NE is active, `lang="ne"` is set on <html>
 * for proper Devanagari rendering.
 */
export const LanguageToggle = ({
  className,
  size = 'sm',
}: LanguageToggleProps) => {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === 'ne') return 'ne';
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'ne') return 'ne';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);

    // Update URL param
    const url = new URL(window.location.href);
    if (locale === 'ne') {
      url.searchParams.set('lang', 'ne');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());

    // Set lang attribute on <html> for Devanagari rendering
    document.documentElement.lang = locale === 'ne' ? 'ne' : 'en';
  }, [locale]);

  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]',
        sizeClasses[size],
        className,
      )}
      role="radiogroup"
      aria-label="Language"
    >
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'en'}
        onClick={() => setLocale('en')}
        className={clsx(
          'inline-flex items-center gap-1 rounded-md px-2.5 font-semibold transition-colors duration-200',
          size === 'sm' ? 'h-6' : 'h-8',
          locale === 'en'
            ? 'bg-white text-[var(--brand-primary)] shadow-xs dark:bg-[var(--bg-surface)] dark:text-[var(--brand-primary)]'
            : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
        )}
      >
        {size === 'md' && <Globe className="h-3.5 w-3.5" />}
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'ne'}
        onClick={() => setLocale('ne')}
        className={clsx(
          'inline-flex items-center gap-1 rounded-md px-2.5 font-semibold transition-colors duration-200',
          size === 'sm' ? 'h-6' : 'h-8',
          locale === 'ne'
            ? 'bg-white text-[var(--brand-primary)] shadow-xs dark:bg-[var(--bg-surface)] dark:text-[var(--brand-primary)]'
            : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
        )}
      >
        NE
      </button>
    </div>
  );
};
