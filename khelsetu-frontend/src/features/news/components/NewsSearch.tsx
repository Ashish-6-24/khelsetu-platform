import { Search, X } from 'lucide-react';

import { useEffect, useState } from 'react';

interface NewsSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
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
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="h-10 w-full rounded-xl border border-[#E7E5E4] bg-white pl-10 pr-20 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-colors focus:border-[#7F1D1D] focus:outline-none focus:ring-2 focus:ring-[#7F1D1D]/20 dark:border-[#27272A] dark:bg-[#13131A] dark:text-white dark:placeholder-[#64748B] dark:focus:border-[#FCA5A5] dark:focus:ring-[#FCA5A5]/20"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {localValue && (
          <button
            onClick={() => {
              setLocalValue('');
              onChange('');
            }}
            aria-label="Clear search"
            className="rounded-md p-1 text-[#94A3B8] transition-colors hover:text-[#0F172A] dark:hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {resultCount !== undefined && localValue && (
          <span className="hidden text-xs text-[#94A3B8] sm:inline">
            {resultCount} result{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
