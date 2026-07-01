import { Skeleton } from '@shared/components/ui/Skeleton';
import { Newspaper } from 'lucide-react';

import type { NewsArticle } from '../types';
import { NewsCard } from './NewsCard';

interface NewsFeedProps {
  articles: NewsArticle[];
  isLoading?: boolean;
}

export function NewsFeed({ articles, isLoading }: NewsFeedProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)]"
          >
            <Skeleton className="aspect-[16/10]" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
        <Newspaper className="h-12 w-12 text-[var(--text-tertiary)]" />
        <p className="mt-4 text-lg font-medium text-[var(--text-primary)] dark:text-white">
          No articles found
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
