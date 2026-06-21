import { Image, Play } from 'lucide-react';

import { MediaItem } from '../types';
import { formatDuration } from '../utils/galleryUtils';

interface GalleryGridProps {
  items: MediaItem[];
  onItemClick: (index: number) => void;
}

const typeBadgeColors = {
  image: 'bg-blue-500/80',
  video: 'bg-purple-500/80',
  highlight: 'bg-[#b8860b]/80',
  'press-conference': 'bg-gray-500/80',
};

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Image className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No media found
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => {
        const isVideo = item.type === 'video' || item.type === 'highlight';

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(index)}
            aria-label={`${item.type === 'video' || item.type === 'highlight' ? 'Play' : 'View'}: ${item.title}${item.playerName ? ` by ${item.playerName}` : ''}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute left-2 top-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium text-white ${typeBadgeColors[item.type]}`}
              >
                {item.type.replace('-', ' ')}
              </span>
            </div>

            {isVideo && item.duration && (
              <div className="absolute right-2 top-2">
                <span className="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  {formatDuration(item.duration)}
                </span>
              </div>
            )}

            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-3 shadow-xl">
                  <Play className="h-6 w-6 fill-gray-900 text-gray-900" />
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="truncate text-sm font-medium text-white">
                {item.title}
              </p>
              {item.playerName && (
                <p className="truncate text-xs text-gray-200">
                  {item.playerName}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
