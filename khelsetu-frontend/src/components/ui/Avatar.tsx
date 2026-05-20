import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  status,
}: AvatarProps) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={clsx('relative inline-flex', className)}>
      <div
        className={clsx(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 overflow-hidden',
          sizeStyles[size],
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-medium text-white">{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800',
            statusColors[status],
            size === 'xs' ? 'w-2 h-2' : 'w-3 h-3',
          )}
        />
      )}
    </div>
  );
};
