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

import { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusTrap } from '@shared/hooks/useFocusTrap';

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
  const dropdownRef = useFocusTrap<HTMLDivElement>(isOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const groupedNotifications = notificationUtils.groupByDate(
    notifications,
  ) as Record<string, Notification[]>;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    },
    [isOpen],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="relative inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[var(--text-tertiary)] transition-colors hover:bg-gray-100 dark:text-[var(--text-tertiary)] dark:hover:bg-[var(--bg-surface-raised)]"
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
            onClick={() => {
              setIsOpen(false);
              buttonRef.current?.focus();
            }}
            aria-hidden="true"
          />
          <div
            ref={dropdownRef}
            role="dialog"
            aria-label="Notifications"
            className="absolute right-0 z-50 mt-2 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-canvas)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3 dark:border-[var(--border-subtle)]">
              <h3 className="font-semibold text-[var(--text-primary)] dark:text-white">
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
                  <Bell className="mx-auto mb-2 h-8 w-8 text-[var(--text-tertiary)] dark:text-[var(--text-secondary)]" />
                  <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    No notifications yet
                  </p>
                </div>
              ) : (
                Object.entries(groupedNotifications).map(([date, items]) => (
                  <div key={date}>
                    <div className="bg-[var(--bg-surface-sunken)] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] dark:bg-[var(--bg-surface)]/50 dark:text-[var(--text-tertiary)]">
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
              <div className="border-t border-[var(--border-subtle)] px-4 py-3 dark:border-[var(--border-subtle)]">
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
