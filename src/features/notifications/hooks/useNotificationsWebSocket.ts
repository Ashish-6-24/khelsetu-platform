import { useNotificationStore } from '@features/notifications/store';
import type {
  Notification,
  NotificationType,
} from '@features/notifications/types';
import { wsService } from '@lib/websocket-client';

import { useCallback, useEffect } from 'react';

interface WebSocketNotificationPayload {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  metadata?: Record<string, unknown>;
}

export const useNotificationsWebSocket = () => {
  const { addNotification } = useNotificationStore();

  const handleNotification = useCallback(
    (data: unknown) => {
      const payload = data as WebSocketNotificationPayload;
      if (payload.id && payload.title && payload.message) {
        const notification: Notification = {
          id: payload.id,
          type: payload.type,
          title: payload.title,
          message: payload.message,
          read: payload.read ?? false,
          createdAt: payload.timestamp ?? new Date().toISOString(),
          metadata: payload.metadata,
        };

        addNotification(notification);
      }
    },
    [addNotification],
  );

  useEffect(() => {
    wsService.on('notification', handleNotification);

    return () => {
      wsService.off('notification', handleNotification);
    };
  }, [handleNotification]);

  return {
    subscribe: () => wsService.on('notification', handleNotification),
    unsubscribe: () => wsService.off('notification', handleNotification),
  };
};
