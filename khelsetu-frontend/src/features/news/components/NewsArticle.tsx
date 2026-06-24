import { ROUTES } from '@utils/constants';
import { clsx } from 'clsx';
import DOMPurify from 'dompurify';
import { ArrowLeft, Clock, Eye, Share2, User } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import type { NewsArticle as NewsArticleType } from '../types';
import {
  formatDate,
  getCategoryColor,
  getCategoryLabel,
} from '../utils/newsUtils';

interface NewsArticleProps {
  article: NewsArticleType;
  relatedArticles?: NewsArticleType[];
}

export function NewsArticle({
  article,
  relatedArticles = [],
}: NewsArticleProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    lightboxRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed — silent fallback
      }
    }
  };

  return (
    <article className="mx-auto max-w-4xl">
      <Link
        to={ROUTES.NEWS}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition-colors hover:text-[#7F1D1D] dark:text-[#94A3B8] dark:hover:text-[#FCA5A5]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to News
      </Link>

      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={article.coverImage}
          alt={article.title}
          className="aspect-[21/9] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7f1d1d] to-[#450a0a] text-sm font-semibold text-white">
            {article.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#0F172A] dark:text-white">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </div>
            <div className="flex items-center gap-3 text-xs text-[#475569] dark:text-[#94A3B8]">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(article.publishDate)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.viewCount.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E7E5E4] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-all hover:border-[#7F1D1D]/30 hover:text-[#7F1D1D] dark:border-[#27272A] dark:bg-[#13131A] dark:text-[#CBD5E1] dark:hover:border-[#FCA5A5]/30 dark:hover:text-[#FCA5A5]"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F5F5F4] px-3 py-1 text-xs font-medium text-[#475569] dark:bg-[#1A1A23] dark:text-[#94A3B8]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
        <div
          className="text-[#0F172A] dark:text-[#CBD5E1]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />
      </div>

      {article.videoEmbed && (
        <div className="mt-8 overflow-hidden rounded-2xl">
          <div
            className="aspect-video"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.videoEmbed),
            }}
          />
        </div>
      )}

      {article.gallery.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold text-[#0F172A] dark:text-white">
            Gallery
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {article.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxImage(img)}
                aria-label={`View gallery image ${i + 1}`}
                className="group overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="mt-12 border-t border-[#E7E5E4] pt-8 dark:border-[#27272A]">
          <h3 className="mb-6 text-xl font-bold text-[#0F172A] dark:text-white">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                to={`${ROUTES.NEWS}/${related.id}`}
                className="group overflow-hidden rounded-xl border border-[#E7E5E4] transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-[#27272A]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h4 className="line-clamp-2 text-sm font-semibold text-[#0F172A] dark:text-white">
                    {related.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                    {formatDate(related.publishDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Gallery preview"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </article>
  );
}
