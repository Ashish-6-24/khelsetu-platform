export type MediaType = 'image' | 'video' | 'highlight' | 'press-conference';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  uploadedAt: string;
  uploadedBy: string;
  tournamentId?: string;
  tournamentName?: string;
  teamId?: string;
  teamName?: string;
  playerId?: string;
  playerName?: string;
  season?: string;
  duration?: number;
  tags: string[];
}

export interface GalleryFilters {
  type?: MediaType;
  tournamentId?: string;
  teamId?: string;
  playerId?: string;
  season?: string;
  search?: string;
}
