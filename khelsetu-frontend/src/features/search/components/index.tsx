import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import type { SearchCategory, SearchResult } from '@features/search/types';
import { Calendar, Search, Trophy, Users, User } from 'lucide-react';

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

export const SearchBar = ({ value, onChange, onSearch, placeholder = 'Search...' }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-500 dark:text-gray-400">
          {categoryIcons[result.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 dark:text-white truncate">
              {result.title}
            </h4>
            <Badge variant="default" className="text-xs capitalize">
              {result.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
  const categories: SearchCategory[] = ['tournaments', 'teams', 'players', 'matches'];

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
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700'
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
