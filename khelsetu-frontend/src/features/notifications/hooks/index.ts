import { notificationService } from '@features/notifications/services';
import { useNotificationStore } from '@features/notifications/store';
import type { Notification } from '@features/notifications/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead: storeMarkAsRead,
    markAllAsRead: storeMarkAllAsRead,
    deleteNotification: storeDeleteNotification,
  } = useNotificationStore();

  const queryClient = useQueryClient();

  const { isLoading, error } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    staleTime: 30000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAsRead = async (id: string) => {
    storeMarkAsRead(id);
    await markAsReadMutation.mutateAsync(id);
  };

  const markAllAsRead = async () => {
    storeMarkAllAsRead();
    await markAllAsReadMutation.mutateAsync();
  };

  const deleteNotification = async (id: string) => {
    storeDeleteNotification(id);
    await deleteMutation.mutateAsync(id);
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error: error instanceof Error ? error.message : null,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};
