import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode, useCallback } from 'react';

import {
  Link,
  type LinkProps,
  type NavigateOptions,
  useNavigate,
} from 'react-router-dom';

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

/**
 * Wraps React Router navigation in View Transitions API.
 * Falls back to standard navigation in unsupported browsers.
 */
export function useViewTransitionNavigate() {
  const navigate = useNavigate();

  const transitionNavigate = useCallback(
    (to: string, options?: NavigateOptions) => {
      if (
        typeof document !== 'undefined' &&
        'startViewTransition' in document &&
        typeof document.startViewTransition === 'function'
      ) {
        document.startViewTransition(() => {
          navigate(to, options);
        });
      } else {
        navigate(to, options);
      }
    },
    [navigate],
  );

  return transitionNavigate;
}
