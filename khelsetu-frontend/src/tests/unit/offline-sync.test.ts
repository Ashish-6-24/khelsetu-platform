import { describe, expect, it } from 'vitest';

const generateSyncId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getSyncStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'syncing':
      return 'info';
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
};

const filterEntriesByStatus = (
  entries: { status: string }[],
  filter: string,
): { status: string }[] => {
  if (filter === 'all') return entries;
  return entries.filter((e) => e.status === filter);
};

describe('Offline Sync Utilities', () => {
  it('should generate unique sync IDs', () => {
    const id1 = generateSyncId();
    const id2 = generateSyncId();
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^\d+-[a-z0-9]+$/);
  });

  it('should return correct status colors', () => {
    expect(getSyncStatusColor('completed')).toBe('success');
    expect(getSyncStatusColor('syncing')).toBe('info');
    expect(getSyncStatusColor('failed')).toBe('error');
    expect(getSyncStatusColor('pending')).toBe('default');
  });

  it('should filter entries by status', () => {
    const entries = [
      { status: 'pending' },
      { status: 'completed' },
      { status: 'failed' },
      { status: 'pending' },
    ];

    expect(filterEntriesByStatus(entries, 'all')).toHaveLength(4);
    expect(filterEntriesByStatus(entries, 'pending')).toHaveLength(2);
    expect(filterEntriesByStatus(entries, 'completed')).toHaveLength(1);
    expect(filterEntriesByStatus(entries, 'failed')).toHaveLength(1);
  });

  it('should return empty array for non-existent status', () => {
    const entries = [{ status: 'pending' }];
    expect(filterEntriesByStatus(entries, 'unknown')).toHaveLength(0);
  });
});
