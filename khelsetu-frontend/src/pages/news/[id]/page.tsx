import { NewsArticle } from '@features/news/components';
import { useNews, useNewsArticle } from '@features/news/hooks/useNews';
import { getRelatedArticles } from '@features/news/utils/newsUtils';
import { Skeleton } from '@shared/components/ui/Skeleton';
import { ROUTES } from '@shared/utils/constants';
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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
        <AlertCircle className="h-12 w-12 text-[var(--text-tertiary)]" />
        <p className="mt-4 text-lg font-medium text-[var(--text-primary)] dark:text-white">
          Article not found
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.NEWS}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-hover)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
        >
          Back to News
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(allArticles, article.id, article.tags);

  return <NewsArticle article={article} relatedArticles={related} />;
}
