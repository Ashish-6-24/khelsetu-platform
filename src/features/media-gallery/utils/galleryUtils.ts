import { GalleryFilters, MediaItem, MediaType } from '../types';

export function getMediaTypeIcon(type: MediaType): string {
  const icons: Record<MediaType, string> = {
    image: 'Image',
    video: 'Video',
    highlight: 'Trophy',
    'press-conference': 'Mic',
  };
  return icons[type];
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function filterMedia(
  items: MediaItem[],
  filters: GalleryFilters,
): MediaItem[] {
  return items.filter((item) => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.tournamentId && item.tournamentId !== filters.tournamentId)
      return false;
    if (filters.teamId && item.teamId !== filters.teamId) return false;
    if (filters.playerId && item.playerId !== filters.playerId) return false;
    if (filters.season && item.season !== filters.season) return false;
    if (filters.search) {
      const query = filters.search.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    return true;
  });
}

export function getMediaStats(items: MediaItem[]): {
  images: number;
  videos: number;
  highlights: number;
  pressConferences: number;
} {
  return {
    images: items.filter((i) => i.type === 'image').length,
    videos: items.filter((i) => i.type === 'video').length,
    highlights: items.filter((i) => i.type === 'highlight').length,
    pressConferences: items.filter((i) => i.type === 'press-conference').length,
  };
}
