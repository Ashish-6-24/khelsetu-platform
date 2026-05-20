import { Tabs } from '@components/ui/Tabs';
import { useSearch } from '@features/search/hooks';
import { SearchBar, SearchResultCard, SearchFilters } from '@features/search/components';
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
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
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No recent searches
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              ))}
            </div>
          ) : results.length === 0 && query ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No results found for "{query}"
            </p>
          ) : (
            Object.entries(groupedResults).map(([type, items]) => (
              <div key={type} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
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
