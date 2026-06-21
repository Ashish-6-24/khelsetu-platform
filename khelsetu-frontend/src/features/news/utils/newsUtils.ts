import type { NewsArticle, NewsCategory } from '../types';

const CATEGORY_COLORS: Record<NewsCategory, string> = {
  football: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  cricket:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  volleyball:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  basketball:
    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  futsal:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  esports: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  announcements: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  'match-reports':
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'tournament-updates':
    'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  'player-spotlight':
    'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
};

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  football: 'Football',
  cricket: 'Cricket',
  volleyball: 'Volleyball',
  basketball: 'Basketball',
  futsal: 'Futsal',
  esports: 'Esports',
  announcements: 'Announcements',
  'match-reports': 'Match Reports',
  'tournament-updates': 'Tournament Updates',
  'player-spotlight': 'Player Spotlight',
};

export function getCategoryColor(category: NewsCategory): string {
  return (
    CATEGORY_COLORS[category] ??
    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  );
}

export function getCategoryLabel(category: NewsCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function getRelatedArticles(
  articles: NewsArticle[],
  currentId: string,
  tags: string[],
): NewsArticle[] {
  return articles
    .filter((a) => a.id !== currentId)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((a) => a.article);
}
