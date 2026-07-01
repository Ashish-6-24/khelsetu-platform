import type { Notification } from '@features/notifications/types';
import { axiosInstance } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await axiosInstance.get<Notification[]>(
      API_ENDPOINTS.NOTIFICATIONS.LIST,
    );
    return data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  },

  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  deleteNotification: async (id: string): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
  },
};
