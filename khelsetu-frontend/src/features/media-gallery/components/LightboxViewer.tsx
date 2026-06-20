import { useEffect, useCallback, useRef } from 'react';
import { MediaItem } from '../types';
import { formatDuration } from '../utils/galleryUtils';
import { X, ChevronLeft, ChevronRight, Download, Share2, Maximize, Minimize } from 'lucide-react';

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
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
        return;
      }
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
    [isOpen, onClose, onNext, onPrevious]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) closeRef.current?.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isOpen]);

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

  const isVideo = item.type === 'video' || item.type === 'highlight' || item.type === 'press-conference';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`Media viewer: ${item.title}`}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="absolute left-4 top-4 z-50 text-sm text-white/70" aria-live="polite">
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
            aria-label={document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'}
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
            <p className="mt-1 text-sm text-gray-300">{item.description}</p>
          )}
          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-gray-400">
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
