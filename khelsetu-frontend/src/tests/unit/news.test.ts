import { getCategoryColor, getCategoryLabel, formatDate, getRelatedArticles } from '@features/news/utils/newsUtils';
import type { NewsArticle, NewsCategory } from '@features/news/types';
import { describe, expect, it } from 'vitest';

describe('News Utils', () => {
  describe('getCategoryColor', () => {
    it('should return correct color for football', () => {
      const color = getCategoryColor('football');
      expect(color).toContain('blue');
    });

    it('should return correct color for cricket', () => {
      const color = getCategoryColor('cricket');
      expect(color).toContain('green');
    });

    it('should return default color for unknown category', () => {
      const color = getCategoryColor('unknown' as NewsCategory);
      expect(color).toContain('gray');
    });
  });

  describe('getCategoryLabel', () => {
    it('should return correct label for football', () => {
      const label = getCategoryLabel('football');
      expect(label).toBe('Football');
    });

    it('should return correct label for match-reports', () => {
      const label = getCategoryLabel('match-reports');
      expect(label).toBe('Match Reports');
    });

    it('should return category name for unknown category', () => {
      const label = getCategoryLabel('unknown' as NewsCategory);
      expect(label).toBe('unknown');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('should handle different date formats', () => {
      const formatted = formatDate('2024-12-25');
      expect(formatted).toContain('December');
      expect(formatted).toContain('25');
    });
  });

  describe('getRelatedArticles', () => {
    it('should return related articles based on tags', () => {
      const articles: NewsArticle[] = [
        { id: '1', tags: ['football', 'premier-league'], title: 'Article 1' } as NewsArticle,
        { id: '2', tags: ['cricket', 'world-cup'], title: 'Article 2' } as NewsArticle,
        { id: '3', tags: ['football', 'champions-league'], title: 'Article 3' } as NewsArticle,
      ];
      
      const related = getRelatedArticles(articles, '1', ['football']);
      expect(related).toHaveLength(2);
      expect(related[0]?.id).toBe('3'); // More matching tags
    });

    it('should exclude current article', () => {
      const articles: NewsArticle[] = [
        { id: '1', tags: ['football'], title: 'Article 1' } as NewsArticle,
        { id: '2', tags: ['football'], title: 'Article 2' } as NewsArticle,
      ];
      
      const related = getRelatedArticles(articles, '1', ['football']);
      expect(related).toHaveLength(1);
      expect(related[0]?.id).toBe('2');
    });

    it('should limit to 3 related articles', () => {
      const articles: NewsArticle[] = Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        tags: ['football'],
        title: `Article ${i + 1}`,
      })) as NewsArticle[];
      
      const related = getRelatedArticles(articles, '1', ['football']);
      expect(related).toHaveLength(3);
    });

    it('should sort by relevance', () => {
      const articles: NewsArticle[] = [
        { id: '1', tags: ['football', 'premier-league'], title: 'Article 1' } as NewsArticle,
        { id: '2', tags: ['football', 'premier-league', 'champions-league'], title: 'Article 2' } as NewsArticle,
        { id: '3', tags: ['football'], title: 'Article 3' } as NewsArticle,
      ];
      
      const related = getRelatedArticles(articles, '1', ['football', 'premier-league']);
      expect(related[0]?.id).toBe('2'); // Most matching tags
    });
  });
});