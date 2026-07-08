import { NotificationItem } from '@features/notifications/components';
import { useNotifications } from '@features/notifications/hooks';
import type { NotificationType } from '@features/notifications/types';
import { notificationUtils } from '@features/notifications/utils';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { ErrorState } from '@shared/ui/ErrorState';
import { Skeleton } from '@shared/ui/Skeleton';
import { Tabs } from '@shared/ui/Tabs';
import {
  Activity,
  Bell,
  Check,
  CreditCard,
  type LucideIcon,
  Settings,
  Trash2,
  Trophy,
  Volleyball,
} from 'lucide-react';

import { useState } from 'react';

const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'match_start', label: 'Match Start' },
  { id: 'score_update', label: 'Score Update' },
  { id: 'tournament_update', label: 'Tournament' },
  { id: 'system', label: 'System' },
  { id: 'billing', label: 'Billing' },
];

const getNotificationIcon = (type: NotificationType): LucideIcon => {
  const icons: Record<NotificationType, LucideIcon> = {
    match_start: Volleyball,
    score_update: Activity,
    tournament_update: Trophy,
    system: Settings,
    billing: CreditCard,
  };
  return icons[type] ?? Bell;
};

export const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    error,
  } = useNotifications();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    return activeFilter === 'all' || n.type === activeFilter;
  });

  const groupedNotifications = notificationUtils.groupByDate(
    filteredNotifications,
  ) as Record<string, typeof filteredNotifications>;

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDeleteAll = async () => {
    for (const n of filteredNotifications) {
      await deleteNotification(n.id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load notifications"
        message="Could not fetch notifications. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  let unreadText: string;
  if (unreadCount > 0) {
    const plural = unreadCount > 1 ? 's' : '';
    unreadText = `${unreadCount} unread notification${plural}`;
  } else {
    unreadText = 'All caught up';
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            {unreadText}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
          {filteredNotifications.length > 0 && (
            <Button variant="outline" onClick={handleDeleteAll}>
              <Trash2 className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      <Tabs
        tabs={TYPE_FILTERS}
        activeTab={activeFilter}
        onChange={setActiveFilter}
        variant="pills"
      />

      {filteredNotifications.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mb-3" />
              <p className="text-lg font-medium text-[var(--text-primary)] dark:text-white">
                No notifications
              </p>
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
                {activeFilter === 'all'
                  ? 'You will see notifications here when they arrive'
                  : `No ${activeFilter.replace('_', ' ')} notifications`}
              </p>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedNotifications).map(([date, items]) => (
            <Card key={date}>
              <CardBody className="p-0">
                <div className="px-4 py-2 bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)]/50 text-xs font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] uppercase tracking-wider border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                  {date}
                </div>
                {items.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    icon={getNotificationIcon(notification.type)}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
