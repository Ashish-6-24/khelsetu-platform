import { Image, Trophy, Video } from 'lucide-react';

import { useState } from 'react';

import { useGallery } from '../hooks/useGallery';
import { GalleryFilters as GalleryFiltersType } from '../types';
import { getMediaStats } from '../utils/galleryUtils';
import { GalleryFilters } from './GalleryFilters';
import { GalleryGrid } from './GalleryGrid';
import { LightboxViewer } from './LightboxViewer';

interface MediaGalleryProps {
  tournaments?: { value: string; label: string }[];
  teams?: { value: string; label: string }[];
  players?: { value: string; label: string }[];
  seasons?: { value: string; label: string }[];
}

export function MediaGallery({
  tournaments = [],
  teams = [],
  players = [],
  seasons = [],
}: MediaGalleryProps) {
  const [filters, setFilters] = useState<GalleryFiltersType>({});

  const {
    items,
    isLoading,
    error,
    lightboxOpen,
    currentIndex,
    currentItem,
    openLightbox,
    closeLightbox,
    next,
    previous,
  } = useGallery(filters);

  const stats = getMediaStats(items);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Media Gallery
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {items.length} items
          </p>
        </div>
      </div>

      <GalleryFilters
        filters={filters}
        onChange={setFilters}
        tournaments={tournaments}
        teams={teams}
        players={players}
        seasons={seasons}
      />

      <div className="flex flex-wrap gap-3 text-sm sm:gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 backdrop-blur-xl dark:bg-gray-800/80">
          <Image className="h-4 w-4 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">
            {stats.images} images
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 backdrop-blur-xl dark:bg-gray-800/80">
          <Video className="h-4 w-4 text-purple-500" />
          <span className="text-gray-600 dark:text-gray-300">
            {stats.videos} videos
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 backdrop-blur-xl dark:bg-gray-800/80">
          <Trophy className="h-4 w-4 text-[#b8860b]" />
          <span className="text-gray-600 dark:text-gray-300">
            {stats.highlights} highlights
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg font-medium text-red-500">
            Error loading media
          </p>
          <p className="text-sm text-gray-400">Please try again later</p>
        </div>
      ) : (
        <GalleryGrid items={items} onItemClick={openLightbox} />
      )}

      {currentItem && (
        <LightboxViewer
          item={currentItem}
          currentIndex={currentIndex}
          total={items.length}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={next}
          onPrevious={previous}
        />
      )}
    </div>
  );
}
