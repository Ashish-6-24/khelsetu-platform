import type { GalleryFilters, MediaItem } from '@features/media-gallery/types';
import {
  filterMedia,
  formatDuration,
  getMediaStats,
  getMediaTypeIcon,
} from '@features/media-gallery/utils/galleryUtils';
import { describe, expect, it } from 'vitest';

describe('Gallery Utils', () => {
  describe('getMediaTypeIcon', () => {
    it('should return correct icon for image', () => {
      expect(getMediaTypeIcon('image')).toBe('Image');
    });

    it('should return correct icon for video', () => {
      expect(getMediaTypeIcon('video')).toBe('Video');
    });

    it('should return correct icon for highlight', () => {
      expect(getMediaTypeIcon('highlight')).toBe('Trophy');
    });

    it('should return correct icon for press-conference', () => {
      expect(getMediaTypeIcon('press-conference')).toBe('Mic');
    });
  });

  describe('formatDuration', () => {
    it('should format seconds to minutes:seconds', () => {
      expect(formatDuration(65)).toBe('1:05');
      expect(formatDuration(120)).toBe('2:00');
      expect(formatDuration(30)).toBe('0:30');
    });

    it('should pad seconds with zero', () => {
      expect(formatDuration(61)).toBe('1:01');
      expect(formatDuration(1)).toBe('0:01');
    });

    it('should handle zero seconds', () => {
      expect(formatDuration(0)).toBe('0:00');
    });
  });

  describe('filterMedia', () => {
    const items: MediaItem[] = [
      {
        id: '1',
        type: 'image',
        title: 'Photo 1',
        tags: ['football'],
        tournamentId: 't1',
        teamId: 'team1',
        season: '2024',
      } as MediaItem,
      {
        id: '2',
        type: 'video',
        title: 'Video 1',
        tags: ['cricket'],
        tournamentId: 't2',
        teamId: 'team2',
        season: '2024',
      } as MediaItem,
      {
        id: '3',
        type: 'image',
        title: 'Photo 2',
        tags: ['football'],
        tournamentId: 't1',
        teamId: 'team1',
        season: '2023',
      } as MediaItem,
    ];

    it('should filter by type', () => {
      const filters: GalleryFilters = { type: 'image' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(2);
    });

    it('should filter by tournament', () => {
      const filters: GalleryFilters = { tournamentId: 't2' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(1);
    });

    it('should filter by team', () => {
      const filters: GalleryFilters = { teamId: 'team1' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(2);
    });

    it('should filter by season', () => {
      const filters: GalleryFilters = { season: '2023' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(1);
    });

    it('should filter by search term', () => {
      const filters: GalleryFilters = { search: 'photo' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(2);
    });

    it('should combine multiple filters', () => {
      const filters: GalleryFilters = { type: 'image', teamId: 'team1' };
      const filtered = filterMedia(items, filters);
      expect(filtered).toHaveLength(2);
    });
  });

  describe('getMediaStats', () => {
    it('should count media types correctly', () => {
      const items: MediaItem[] = [
        { id: '1', type: 'image' } as MediaItem,
        { id: '2', type: 'video' } as MediaItem,
        { id: '3', type: 'highlight' } as MediaItem,
        { id: '4', type: 'press-conference' } as MediaItem,
        { id: '5', type: 'image' } as MediaItem,
      ];

      const stats = getMediaStats(items);
      expect(stats.images).toBe(2);
      expect(stats.videos).toBe(1);
      expect(stats.highlights).toBe(1);
      expect(stats.pressConferences).toBe(1);
    });

    it('should handle empty array', () => {
      const stats = getMediaStats([]);
      expect(stats.images).toBe(0);
      expect(stats.videos).toBe(0);
      expect(stats.highlights).toBe(0);
      expect(stats.pressConferences).toBe(0);
    });
  });
});
