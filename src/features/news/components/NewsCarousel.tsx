import { ROUTES } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import type { NewsArticle } from '../types';
import {
  formatDate,
  getCategoryColor,
  getCategoryLabel,
} from '../utils/newsUtils';

interface NewsCarouselProps {
  articles: NewsArticle[];
}

export function NewsCarousel({ articles }: NewsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % articles.length);
  }, [articles.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + articles.length) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    if (isPaused || articles.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, articles.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
    [prev, next],
  );

  if (articles.length === 0) return null;

  const article = articles[current]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="News articles"
      className="relative overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <Link to={`${ROUTES.NEWS}/${article.id}`} className="block">
        <div className="relative aspect-[21/9] min-h-[300px] md:min-h-[400px]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3">
              <span
                className={clsx(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                  getCategoryColor(article.category),
                )}
              >
                {getCategoryLabel(article.category)}
              </span>
              <span className="text-sm text-white/70">
                {formatDate(article.publishDate)}
              </span>
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight text-white md:text-4xl">
              {article.title}
            </h2>
            <p className="mt-3 max-w-2xl line-clamp-2 text-sm text-white/80 md:text-base">
              {article.description}
            </p>
          </div>
        </div>
      </Link>

      {articles.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next article"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={clsx(
                  'h-2 rounded-full transition-all duration-300',
                  i === current
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60',
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
