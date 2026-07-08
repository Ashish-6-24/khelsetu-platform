import { Search, X } from 'lucide-react';

import { useEffect, useState } from 'react';

interface NewsSearchProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly resultCount?: number;
}

export function NewsSearch({ value, onChange, resultCount }: NewsSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="h-10 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] pl-10 pr-20 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-white dark:placeholder-[var(--text-secondary)] dark:focus:border-[var(--brand-primary)] dark:focus:ring-[var(--brand-primary)]/20"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {localValue && (
          <button
            onClick={() => {
              setLocalValue('');
              onChange('');
            }}
            aria-label="Clear search"
            className="rounded-md p-1 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)] dark:hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {resultCount !== undefined && localValue && (
          <span className="hidden text-xs text-[var(--text-tertiary)] sm:inline">
            {resultCount} result{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
