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
  activeCategory?: NewsCategory;
  onChange: (category: NewsCategory | undefined) => void;
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
            ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-md'
            : 'border border-[#E7E5E4] bg-white text-[#475569] hover:border-[#7F1D1D]/30 hover:text-[#7F1D1D] dark:border-[#27272A] dark:bg-[#13131A] dark:text-[#CBD5E1] dark:hover:border-[#FCA5A5]/30 dark:hover:text-[#FCA5A5]',
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
              ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-md'
              : 'border border-[#E7E5E4] bg-white text-[#475569] hover:border-[#7F1D1D]/30 hover:text-[#7F1D1D] dark:border-[#27272A] dark:bg-[#13131A] dark:text-[#CBD5E1] dark:hover:border-[#FCA5A5]/30 dark:hover:text-[#FCA5A5]',
          )}
        >
          {getCategoryLabel(cat)}
        </button>
      ))}
    </div>
  );
}
