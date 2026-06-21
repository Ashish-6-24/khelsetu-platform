import { Skeleton } from '@components/ui/Skeleton';
import { NewsArticle } from '@features/news/components';
import { useNews, useNewsArticle } from '@features/news/hooks/useNews';
import { getRelatedArticles } from '@features/news/utils/newsUtils';
import { ROUTES } from '@utils/constants';
import { AlertCircle } from 'lucide-react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, error } = useNewsArticle(id ?? '');
  const { data: allArticles = [] } = useNews();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="aspect-[21/9] rounded-3xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E7E5E4] bg-[#FAFAF9] py-20 dark:border-[#27272A] dark:bg-[#0F0F14]">
        <AlertCircle className="h-12 w-12 text-[#94A3B8]" />
        <p className="mt-4 text-lg font-medium text-[#0F172A] dark:text-white">
          Article not found
        </p>
        <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.NEWS}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
        >
          Back to News
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(allArticles, article.id, article.tags);

  return <NewsArticle article={article} relatedArticles={related} />;
}
