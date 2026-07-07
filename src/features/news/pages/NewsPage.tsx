import {
  NewsCarousel,
  NewsFeed,
  NewsFilters,
  NewsSearch,
} from '@features/news/components';
import { useFeaturedNews, useNews } from '@features/news/hooks/useNews';
import type { NewsCategory } from '@features/news/types';
import { ErrorState } from '@shared/ui/ErrorState';

import { useCallback, useMemo, useState } from 'react';

export function NewsPage() {
  const [category, setCategory] = useState<NewsCategory | undefined>();
  const [search, setSearch] = useState('');

  const filters = useMemo(
    () => ({
      category,
      search: search || undefined,
    }),
    [category, search],
  );

  const { data: featuredArticles = [], isLoading: featuredLoading } =
    useFeaturedNews();
  const { data: articles = [], isLoading, error, refetch } = useNews(filters);

  const handleCategoryChange = useCallback((cat: NewsCategory | undefined) => {
    setCategory(cat);
  }, []);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          News & Media Center
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
          Stay updated with the latest from the sports community
        </p>
      </div>

      {!featuredLoading && featuredArticles.length > 0 && (
        <NewsCarousel articles={featuredArticles} />
      )}

      {featuredLoading && (
        <div className="aspect-[21/9] min-h-[300px] animate-pulse rounded-3xl bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-accent)]/10 md:min-h-[400px]" />
      )}

      {error && (
        <ErrorState
          title="Failed to load news"
          message="Could not fetch articles. Please try again."
          onRetry={() => refetch()}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <NewsFilters
          activeCategory={category}
          onChange={handleCategoryChange}
        />
        <div className="w-full sm:w-72">
          <NewsSearch
            value={search}
            onChange={handleSearchChange}
            resultCount={articles.length}
          />
        </div>
      </div>

      <NewsFeed articles={articles} isLoading={isLoading} />
    </div>
  );
}
