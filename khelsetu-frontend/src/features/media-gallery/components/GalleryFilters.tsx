import { Filter, X } from 'lucide-react';

import { GalleryFilters as GalleryFiltersType } from '../types';
import { MediaType } from '../types';

interface GalleryFiltersProps {
  filters: GalleryFiltersType;
  onChange: (filters: GalleryFiltersType) => void;
  tournaments?: { value: string; label: string }[];
  teams?: { value: string; label: string }[];
  players?: { value: string; label: string }[];
  seasons?: { value: string; label: string }[];
}

const mediaTypes: { value: MediaType | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'highlight', label: 'Highlights' },
  { value: 'press-conference', label: 'Press Conferences' },
];

export function GalleryFilters({
  filters,
  onChange,
  tournaments = [],
  teams = [],
  players = [],
  seasons = [],
}: GalleryFiltersProps) {
  const hasActiveFilters =
    filters.type ||
    filters.tournamentId ||
    filters.teamId ||
    filters.playerId ||
    filters.season;

  const clearAll = () => {
    onChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--text-tertiary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] dark:text-[var(--text-tertiary)] dark:hover:text-[var(--text-primary)]"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        role="radiogroup"
        aria-label="Filter by media type"
      >
        {mediaTypes.map((type) => (
          <button
            key={type.value ?? 'all'}
            onClick={() => onChange({ ...filters, type: type.value })}
            role="radio"
            aria-checked={filters.type === type.value}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filters.type === type.value
                ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-white shadow-lg'
                : 'bg-[var(--bg-surface)]/80 text-[var(--text-secondary)] hover:bg-gray-100 dark:bg-[var(--bg-surface)]/80 dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-raised)]'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <select
          value={filters.tournamentId ?? ''}
          onChange={(e) =>
            onChange({ ...filters, tournamentId: e.target.value || undefined })
          }
          aria-label="Filter by tournament"
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 dark:text-[var(--text-secondary)]"
        >
          <option value="">All Tournaments</option>
          {tournaments.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={filters.teamId ?? ''}
          onChange={(e) =>
            onChange({ ...filters, teamId: e.target.value || undefined })
          }
          aria-label="Filter by team"
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 dark:text-[var(--text-secondary)]"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={filters.playerId ?? ''}
          onChange={(e) =>
            onChange({ ...filters, playerId: e.target.value || undefined })
          }
          aria-label="Filter by player"
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 dark:text-[var(--text-secondary)]"
        >
          <option value="">All Players</option>
          {players.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={filters.season ?? ''}
          onChange={(e) =>
            onChange({ ...filters, season: e.target.value || undefined })
          }
          aria-label="Filter by season"
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 dark:text-[var(--text-secondary)]"
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
