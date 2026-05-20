import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import { Tabs } from '@components/ui/Tabs';
import { NotificationItem } from '@features/notifications/components';
import { useNotifications } from '@features/notifications/hooks';
import type { NotificationType } from '@features/notifications/types';
import { notificationUtils } from '@features/notifications/utils';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'match_start', label: 'Match Start' },
  { id: 'score_update', label: 'Score Update' },
  { id: 'tournament_update', label: 'Tournament' },
  { id: 'system', label: 'System' },
  { id: 'billing', label: 'Billing' },
];

const getNotificationIcon = (type: NotificationType) => {
  const icons: Record<NotificationType, string> = {
    match_start: '🏏',
    score_update: '📊',
    tournament_update: '🏆',
    system: '⚙️',
    billing: '💳',
  };
  return icons[type] ?? '🔔';
};

export const NotificationsPage = () => {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    return activeFilter === 'all' || n.type === activeFilter;
  });

  const groupedNotifications = notificationUtils.groupByDate(filteredNotifications) as Record<string, typeof filteredNotifications>;

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up'}
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
              <Bell className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                No notifications
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
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
