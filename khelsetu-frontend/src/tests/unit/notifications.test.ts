import type { Notification } from '@features/notifications/types';
import { notificationUtils } from '@features/notifications/utils';
import { describe, expect, it } from 'vitest';

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'match_start',
    title: 'Match Started',
    message: 'Team A vs Team B has begun',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    type: 'score_update',
    title: 'Score Update',
    message: 'Team A scored a goal',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n3',
    type: 'tournament_update',
    title: 'Tournament Update',
    message: 'New bracket published',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'n4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

describe('notificationUtils', () => {
  describe('groupByDate', () => {
    it('should group notifications by date', () => {
      const grouped = notificationUtils.groupByDate(mockNotifications);
      const keys = Object.keys(grouped);
      expect(keys.length).toBe(3);
    });

    it('should put today notifications in one group', () => {
      const grouped = notificationUtils.groupByDate(mockNotifications);
      const today = new Date().toLocaleDateString();
      const todayGroup = grouped[today];
      expect(todayGroup).toBeDefined();
      expect(todayGroup!.length).toBe(1);
    });

    it('should put yesterday notifications in one group', () => {
      const grouped = notificationUtils.groupByDate(mockNotifications);
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
      const yesterdayGroup = grouped[yesterday];
      expect(yesterdayGroup).toBeDefined();
      expect(yesterdayGroup!.length).toBe(2);
    });

    it('should handle empty array', () => {
      const grouped = notificationUtils.groupByDate([]);
      expect(Object.keys(grouped).length).toBe(0);
    });

    it('should handle single notification', () => {
      const single: Notification[] = [mockNotifications[0]!];
      const grouped = notificationUtils.groupByDate(single);
      expect(Object.keys(grouped).length).toBe(1);
      expect(Object.values(grouped)[0]!.length).toBe(1);
    });
  });
});
