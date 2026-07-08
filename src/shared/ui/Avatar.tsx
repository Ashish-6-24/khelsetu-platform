import { clsx } from 'clsx';

import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  ring?: boolean;
}

const sizeStyles = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-20 w-20 text-xl',
};

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

const statusSize = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
  '2xl': 'h-4 w-4',
};

const gradients = [
  'from-[var(--brand-primary)] to-[var(--brand-primary-hover)]',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-sky-600',
];

const hashName = (name?: string) => {
  if (!name) return 0;
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.codePointAt(i)!;
    h = Math.trunc(h);
  }
  return Math.abs(h);
};

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  status,
  ring = false,
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const initials =
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';
  const gradient = gradients[hashName(name) % gradients.length];

  return (
    <div className={clsx('relative inline-flex shrink-0', className)}>
      <div
        className={clsx(
          'inline-flex items-center justify-center overflow-hidden rounded-full',
          'bg-gradient-to-br font-semibold text-white',
          'shadow-sm',
          ring && 'ring-2 ring-[var(--bg-surface)]',
          gradient,
          sizeStyles[size],
        )}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="select-none">{initials}</span>
        )}
      </div>
      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={clsx(
            'absolute right-0 bottom-0 block rounded-full ring-2 ring-[var(--bg-surface)]',
            statusColors[status],
            statusSize[size],
          )}
        />
      )}
    </div>
  );
};
