import {
  SearchBar,
  SearchFilters,
  SearchResultCard,
} from '@features/search/components';
import { useSearch } from '@features/search/hooks';
import { Tabs } from '@shared/ui/Tabs';

import { useState } from 'react';

const TABS = [
  { id: 'all', label: 'All Results' },
  { id: 'recent', label: 'Recent' },
];

export const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const {
    query,
    results,
    groupedResults,
    filters,
    isLoading,
    recentSearches,
    handleSearch,
    setFilters,
    clearRecentSearches,
  } = useSearch();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Search
        </h1>
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
          Find tournaments, teams, players, and matches
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={handleSearch}
        onSearch={handleSearch}
        placeholder="Search tournaments, teams, players..."
      />

      <SearchFilters
        filters={filters}
        onChange={(categories) => setFilters({ categories })}
      />

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'recent' && (
        <div className="space-y-3">
          {recentSearches.length === 0 ? (
            <p className="text-center text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] py-8">
              No recent searches
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border-subtle)] dark:border-[var(--border-subtle)] bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] text-[var(--text-primary)] dark:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]"
                >
                  {search}
                </button>
              ))}
              <button
                onClick={clearRecentSearches}
                className="px-3 py-1.5 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={`skeleton-${n}`}
                  className="animate-pulse h-16 bg-[var(--bg-surface-sunken)] rounded-lg"
                />
              ))}
            </div>
          ) : results.length === 0 && query ? (
            <p className="text-center text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] py-8">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            Object.entries(groupedResults).map(([type, items]) => (
              <div key={type} className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white capitalize">
                  {type} ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
