import { http, HttpResponse } from 'msw';

const articles = [
  { id: '1', title: 'Nepal Premier League 2024 Kicks Off', category: 'tournament', excerpt: 'The biggest cricket tournament in Nepal starts this week', author: 'KhelSetu Staff', publishedAt: '2026-07-01T10:00:00Z', featured: true, trending: true, imageUrl: '' },
  { id: '2', title: 'New Scoring Rules Introduced', category: 'rules', excerpt: 'ICC updates fielding restrictions for T20', author: 'Editor', publishedAt: '2026-06-28T08:00:00Z', featured: false, trending: true, imageUrl: '' },
  { id: '3', title: 'Top 10 Cricketers to Watch', category: 'players', excerpt: 'Rising stars in Nepali cricket', author: 'KhelSetu Staff', publishedAt: '2026-06-25T12:00:00Z', featured: false, trending: false, imageUrl: '' },
];

export const newsHandlers = [
  http.get('*/news', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    let result = [...articles];
    if (category) result = result.filter((a) => a.category === category);
    if (search) result = result.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
    return HttpResponse.json({ data: result, total: result.length });
  }),
];
