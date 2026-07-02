import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode } from 'react';

import { Link, type LinkProps } from 'react-router-dom';

interface ViewTransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  viewTransitionName?: string;
}

/**
 * Link that triggers View Transitions on navigation.
 * Wraps the click handler with document.startViewTransition().
 */
export const ViewTransitionLink = ({
  children,
  className,
  viewTransitionName,
  onClick,
  ...props
}: ViewTransitionLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof document.startViewTransition === 'function'
    ) {
      document.startViewTransition(() => {
        onClick?.(e);
      });
    } else {
      onClick?.(e);
    }
  };

  return (
    <Link
      {...props}
      className={twMerge(clsx(className))}
      style={viewTransitionName ? { viewTransitionName } : undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
