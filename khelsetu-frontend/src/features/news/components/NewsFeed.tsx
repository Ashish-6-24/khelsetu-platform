import { NewsCard } from './NewsCard';
import { Skeleton } from '@components/ui/Skeleton';
import type { NewsArticle } from '../types';
import { Newspaper } from 'lucide-react';

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
            className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white dark:border-[#27272A] dark:bg-[#13131A]"
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E7E5E4] bg-[#FAFAF9] py-16 dark:border-[#27272A] dark:bg-[#0F0F14]">
        <Newspaper className="h-12 w-12 text-[#94A3B8]" />
        <p className="mt-4 text-lg font-medium text-[#0F172A] dark:text-white">
          No articles found
        </p>
        <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">
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
