import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import type { SearchCategory, SearchResult } from '@features/search/types';
import { Calendar, Search, Trophy, User, Users } from 'lucide-react';

const categoryIcons: Record<SearchCategory, React.ReactNode> = {
  tournaments: <Trophy className="w-4 h-4" />,
  teams: <Users className="w-4 h-4" />,
  players: <User className="w-4 h-4" />,
  matches: <Calendar className="w-4 h-4" />,
};

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-[var(--text-primary)] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search"
      />
    </form>
  );
};

interface SearchResultCardProps {
  result: SearchResult;
}

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  return (
    <a
      href={result.url}
      className="block p-4 rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
          {categoryIcons[result.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-[var(--text-primary)] dark:text-white truncate">
              {result.title}
            </h4>
            <Badge variant="default" className="text-xs capitalize">
              {result.type}
            </Badge>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
            {result.description}
          </p>
        </div>
      </div>
    </a>
  );
};

interface SearchFiltersProps {
  filters: { categories: SearchCategory[] };
  onChange: (categories: SearchCategory[]) => void;
}

export const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  const categories: SearchCategory[] = [
    'tournaments',
    'teams',
    'players',
    'matches',
  ];

  const toggleCategory = (category: SearchCategory) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange(updated);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors capitalize ${
                filters.categories.includes(category)
                  ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-tertiary)] dark:border-[var(--border-subtle)] dark:hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
