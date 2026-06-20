import { clsx } from 'clsx';
import { type ReactNode, useCallback } from 'react';
import { Link, type LinkProps, useNavigate, type NavigateOptions } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

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
      typeof (document as any).startViewTransition === 'function'
    ) {
      (document as any).startViewTransition(() => {
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
        typeof (document as any).startViewTransition === 'function'
      ) {
        (document as any).startViewTransition(() => {
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
