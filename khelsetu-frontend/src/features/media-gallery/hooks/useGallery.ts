import { mediaService } from '@services/api/media';
import { useQuery } from '@tanstack/react-query';

import { useCallback, useMemo, useState } from 'react';

import { GalleryFilters } from '../types';
import { filterMedia } from '../utils/galleryUtils';

export function useGallery(filters?: GalleryFilters) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['media', filters],
    queryFn: () => mediaService.getAll(filters as Record<string, string>),
  });

  const items = useMemo(() => {
    if (!data?.data) return [];
    return filters ? filterMedia(data.data, filters) : data.data;
  }, [data, filters]);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  return {
    items,
    isLoading,
    error,
    lightboxOpen,
    currentIndex,
    currentItem: items[currentIndex],
    openLightbox,
    closeLightbox,
    next,
    previous,
  };
}
