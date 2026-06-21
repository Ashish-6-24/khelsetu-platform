import { ROUTES } from '@utils/constants';
import { clsx } from 'clsx';
import { Clock, Eye, Flame, User } from 'lucide-react';

import { Link } from 'react-router-dom';

import type { NewsArticle } from '../types';
import {
  formatDate,
  getCategoryColor,
  getCategoryLabel,
} from '../utils/newsUtils';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      to={`${ROUTES.NEWS}/${article.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgb(15_23_42/0.08)] dark:border-[#27272A] dark:bg-[#13131A]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
              getCategoryColor(article.category),
            )}
          >
            {getCategoryLabel(article.category)}
          </span>
        </div>
        {article.isTrending && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
              <Flame className="h-3 w-3" />
              Trending
            </span>
          </div>
        )}
        {article.isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#B8860B] to-[#d4a017] px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-[#0F172A] transition-colors group-hover:text-[#7F1D1D] dark:text-white dark:group-hover:text-[#FCA5A5]">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
          {article.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[#E7E5E4] pt-4 dark:border-[#27272A]">
          <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#94A3B8]">
            <User className="h-3.5 w-3.5" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#475569] dark:text-[#94A3B8]">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(article.publishDate)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {article.viewCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
