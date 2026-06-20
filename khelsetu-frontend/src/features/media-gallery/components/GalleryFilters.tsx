import { GalleryFilters as GalleryFiltersType } from '../types';
import { MediaType } from '../types';
import { Filter, X } from 'lucide-react';

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
  const hasActiveFilters = filters.type || filters.tournamentId || filters.teamId || filters.playerId || filters.season;

  const clearAll = () => {
    onChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="radiogroup" aria-label="Filter by media type">
        {mediaTypes.map((type) => (
          <button
            key={type.value ?? 'all'}
            onClick={() => onChange({ ...filters, type: type.value })}
            role="radio"
            aria-checked={filters.type === type.value}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filters.type === type.value
                ? 'bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <select
          value={filters.tournamentId ?? ''}
          onChange={(e) => onChange({ ...filters, tournamentId: e.target.value || undefined })}
          aria-label="Filter by tournament"
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
        >
          <option value="">All Tournaments</option>
          {tournaments.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <select
          value={filters.teamId ?? ''}
          onChange={(e) => onChange({ ...filters, teamId: e.target.value || undefined })}
          aria-label="Filter by team"
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <select
          value={filters.playerId ?? ''}
          onChange={(e) => onChange({ ...filters, playerId: e.target.value || undefined })}
          aria-label="Filter by player"
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
        >
          <option value="">All Players</option>
          {players.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select
          value={filters.season ?? ''}
          onChange={(e) => onChange({ ...filters, season: e.target.value || undefined })}
          aria-label="Filter by season"
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm backdrop-blur-xl focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
