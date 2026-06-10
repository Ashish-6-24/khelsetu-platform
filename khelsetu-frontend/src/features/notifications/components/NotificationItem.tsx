import type { Notification } from '@features/notifications/types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Check, type LucideIcon, Trash2 } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  icon: LucideIcon;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  icon: Icon,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`border-b px-4 py-3 transition-colors last:border-0 ${
        !notification.read
          ? 'border-gray-100 bg-blue-50/50 hover:bg-blue-50 dark:border-gray-800 dark:bg-blue-900/10 dark:hover:bg-blue-900/20'
          : 'border-gray-100 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
            !notification.read
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
              : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
          }`}
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className={`text-sm font-medium ${
                  !notification.read
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {notification.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                {notification.message}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-1">
              {!notification.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                  aria-label="Mark as read"
                  className="inline-flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-200 hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-400"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                aria-label="Delete notification"
                className="inline-flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-200 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
