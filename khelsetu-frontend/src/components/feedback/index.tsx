import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className,
    )}
  >
    <div className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600">
      {icon || (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )}
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
      {description}
    </p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className,
    )}
  >
    <div className="w-16 h-16 mb-4 text-red-500">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        Try again
      </button>
    )}
  </div>
);

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({
  message = 'Loading...',
  className,
}: LoadingStateProps) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12',
      className,
    )}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
    />
    {message && (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{message}</p>
    )}
  </div>
);

interface ConnectionStatusProps {
  isOnline: boolean;
  className?: string;
}

export const ConnectionStatus = ({
  isOnline,
  className,
}: ConnectionStatusProps) => (
  <div
    className={clsx(
      'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
      isOnline
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      className,
    )}
  >
    <span
      className={clsx(
        'w-2 h-2 rounded-full',
        isOnline ? 'bg-green-500' : 'bg-red-500',
      )}
    />
    {isOnline ? 'Connected' : 'Offline'}
  </div>
);

interface OfflineBannerProps {
  className?: string;
}

export const OfflineBanner = ({ className }: OfflineBannerProps) => (
  <div
    className={clsx(
      'bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2',
      className,
    )}
  >
    <div className="flex items-center justify-center gap-2 text-sm text-yellow-800 dark:text-yellow-300">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      You're offline. Changes will sync when connection is restored.
    </div>
  </div>
);
