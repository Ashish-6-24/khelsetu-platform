import { LivePulse } from '@components/animations';
import { Avatar } from '@components/ui/Avatar';
import { NotificationDropdown } from '@features/notifications/components';
import { useNotifications } from '@features/notifications/hooks';
import { useNotificationsWebSocket } from '@features/notifications/hooks/useNotificationsWebSocket';
import { useAuth } from '@hooks/useAuth';
import { useAuthStore } from '@store/authStore';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  useNotificationsWebSocket();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <LivePulse size="sm" color="green" />
        </div>

        <div className="flex items-center gap-4">
          <NotificationDropdown
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onDelete={deleteNotification}
            onViewAll={() => navigate('/notifications')}
          />

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <Avatar name={user?.name} size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
            <button
              onClick={logout}
              className="ml-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
