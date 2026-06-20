import {
  NewsCarousel,
  NewsFeed,
  NewsSearch,
  NewsFilters,
} from '@features/news/components';
import { useNews, useFeaturedNews } from '@features/news/hooks/useNews';
import type { NewsCategory } from '@features/news/types';
import { useState, useCallback, useMemo } from 'react';

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
  const { data: articles = [], isLoading } = useNews(filters);

  const handleCategoryChange = useCallback((cat: NewsCategory | undefined) => {
    setCategory(cat);
  }, []);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
          News & Media Center
        </h1>
        <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">
          Stay updated with the latest from the sports community
        </p>
      </div>

      {!featuredLoading && featuredArticles.length > 0 && (
        <NewsCarousel articles={featuredArticles} />
      )}

      {featuredLoading && (
        <div className="aspect-[21/9] min-h-[300px] animate-pulse rounded-3xl bg-gradient-to-r from-[#7f1d1d]/10 to-[#b8860b]/10 md:min-h-[400px]" />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <NewsFilters activeCategory={category} onChange={handleCategoryChange} />
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
