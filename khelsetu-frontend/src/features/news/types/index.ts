export type NewsCategory =
  | 'football'
  | 'cricket'
  | 'volleyball'
  | 'basketball'
  | 'futsal'
  | 'esports'
  | 'announcements'
  | 'match-reports'
  | 'tournament-updates'
  | 'player-spotlight';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  category: NewsCategory;
  tags: string[];
  gallery: string[];
  videoEmbed?: string;
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  relatedArticles: string[];
}

export interface NewsFilters {
  category?: NewsCategory;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
