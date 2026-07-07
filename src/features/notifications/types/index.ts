export type NotificationType =
  'match_start' | 'score_update' | 'tournament_update' | 'system' | 'billing';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}
