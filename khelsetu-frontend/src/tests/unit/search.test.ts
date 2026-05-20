import { describe, expect, it } from 'vitest';

const filterResults = (
  results: { type: string; title: string }[],
  categories: string[],
  query: string,
): { type: string; title: string }[] => {
  return results.filter((r) => {
    const matchesCategory = categories.includes(r.type);
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
};

const groupByType = (
  results: { type: string }[],
): Record<string, { type: string }[]> => {
  const groups: Record<string, { type: string }[]> = {};
  results.forEach((r) => {
    if (!groups[r.type]) groups[r.type] = [];
    groups[r.type]!.push(r);
  });
  return groups;
};

describe('Search Utilities', () => {
  it('should filter results by category and query', () => {
    const results = [
      { type: 'tournaments', title: 'NPL 2024' },
      { type: 'teams', title: 'Kathmandu Kings' },
      { type: 'players', title: 'Sandeep' },
    ];

    expect(filterResults(results, ['tournaments'], 'NPL')).toHaveLength(1);
    expect(filterResults(results, ['tournaments', 'teams'], '')).toHaveLength(2);
    expect(filterResults(results, [], 'NPL')).toHaveLength(0);
  });

  it('should group results by type', () => {
    const results = [
      { type: 'tournaments' },
      { type: 'teams' },
      { type: 'tournaments' },
    ];

    const grouped = groupByType(results);
    expect(grouped.tournaments?.length).toBe(2);
    expect(grouped.teams?.length).toBe(1);
  });

  it('should handle empty results', () => {
    expect(filterResults([], ['tournaments'], 'test')).toHaveLength(0);
    expect(groupByType([])).toEqual({});
  });
});
