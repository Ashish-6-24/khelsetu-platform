export {
  NewsCard,
  NewsCarousel,
  NewsFeed,
  NewsArticle,
  NewsSearch,
  NewsFilters,
} from './components';
export {
  useNews,
  useNewsArticle,
  useFeaturedNews,
  useTrendingNews,
} from './hooks/useNews';
export { newsService } from '@services/api/news';
export type {
  NewsArticle as NewsArticleType,
  NewsCategory,
  NewsFilters as NewsFiltersType,
} from './types';
export {
  getCategoryColor,
  getCategoryLabel,
  formatDate,
  getRelatedArticles,
} from './utils/newsUtils';
