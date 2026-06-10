import type {
  Notification,
  NotificationType,
} from '@features/notifications/types';
import { notificationUtils } from '@features/notifications/utils';
import {
  Activity,
  Bell,
  Check,
  CircleDollarSign,
  type LucideIcon,
  PlayCircle,
  Settings,
  Trophy,
} from 'lucide-react';

import { useState } from 'react';

import { NotificationItem } from './NotificationItem';

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onViewAll: () => void;
}

const getNotificationIcon = (type: NotificationType): LucideIcon => {
  const icons: Record<NotificationType, LucideIcon> = {
    match_start: PlayCircle,
    score_update: Activity,
    tournament_update: Trophy,
    system: Settings,
    billing: CircleDollarSign,
  };
  return icons[type] ?? Bell;
};

export const NotificationDropdown = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onViewAll,
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const groupedNotifications = notificationUtils.groupByDate(
    notifications,
  ) as Record<string, Notification[]>;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="relative inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Notifications"
            className="absolute right-0 z-50 mt-2 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="inline-flex min-h-[32px] items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Check className="h-3 w-3" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <Bell className="mx-auto mb-2 h-8 w-8 text-gray-400 dark:text-gray-600" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No notifications yet
                  </p>
                </div>
              ) : (
                Object.entries(groupedNotifications).map(([date, items]) => (
                  <div key={date}>
                    <div className="bg-gray-50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                      {date}
                    </div>
                    {items.map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          icon={Icon}
                          onMarkAsRead={onMarkAsRead}
                          onDelete={onDelete}
                        />
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onViewAll();
                  }}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
