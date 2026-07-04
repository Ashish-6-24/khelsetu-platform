import { useFocusTrap } from '@shared/hooks/useFocusTrap';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  Share2,
  X,
} from 'lucide-react';

import { useCallback, useEffect, useRef } from 'react';

import { MediaItem } from '../types';
import { formatDuration } from '../utils/galleryUtils';

interface LightboxViewerProps {
  item: MediaItem;
  currentIndex: number;
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function LightboxViewer({
  item,
  currentIndex,
  total,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxViewerProps) {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      return () => {
        previouslyFocusedRef.current?.focus();
      };
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.title;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: item.title, url: item.url });
    }
  };

  if (!isOpen || !item) return null;

  const isVideo =
    item.type === 'video' ||
    item.type === 'highlight' ||
    item.type === 'press-conference';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`Media viewer: ${item.title}`}
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="absolute left-4 top-4 z-50 text-sm text-white/70"
        aria-live="polite"
      >
        {currentIndex + 1} of {total}
      </div>

      <button
        onClick={onPrevious}
        aria-label="Previous media"
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={onNext}
        aria-label="Next media"
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="flex max-h-[80vh] max-w-[90vw] flex-col items-center">
        {isVideo ? (
          <video
            src={item.url}
            controls
            aria-label={item.title}
            className="max-h-[70vh] max-w-full rounded-lg"
          />
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] max-w-full rounded-lg object-contain"
          />
        )}

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleDownload}
            aria-label="Download media"
            className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share media"
            className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={handleFullscreen}
            aria-label={
              document.fullscreenElement
                ? 'Exit fullscreen'
                : 'Enter fullscreen'
            }
            className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {document.fullscreenElement ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {item.description}
            </p>
          )}
          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-[var(--text-tertiary)]">
            {item.playerName && <span>{item.playerName}</span>}
            {item.teamName && <span>{item.teamName}</span>}
            {item.tournamentName && <span>{item.tournamentName}</span>}
            {item.duration && <span>{formatDuration(item.duration)}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
