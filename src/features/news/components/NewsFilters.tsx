import { clsx } from 'clsx';

import type { NewsCategory } from '../types';
import { getCategoryLabel } from '../utils/newsUtils';

const CATEGORIES: NewsCategory[] = [
  'football',
  'cricket',
  'volleyball',
  'basketball',
  'futsal',
  'esports',
  'announcements',
  'match-reports',
  'tournament-updates',
  'player-spotlight',
];

interface NewsFiltersProps {
  readonly activeCategory?: NewsCategory;
  readonly onChange: (category: NewsCategory | undefined) => void;
}

export function NewsFilters({ activeCategory, onChange }: NewsFiltersProps) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onChange(undefined)}
        aria-pressed={!activeCategory}
        className={clsx(
          'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all',
          !activeCategory
            ? 'bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white shadow-md'
            : 'border border-[var(--border-subtle)] bg-white text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-muted)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:text-[var(--brand-primary)]',
        )}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          aria-pressed={activeCategory === cat}
          className={clsx(
            'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all',
            activeCategory === cat
              ? 'bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-white shadow-md'
              : 'border border-[var(--border-subtle)] bg-white text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-muted)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:text-[var(--brand-primary)]',
          )}
        >
          {getCategoryLabel(cat)}
        </button>
      ))}
    </div>
  );
}
