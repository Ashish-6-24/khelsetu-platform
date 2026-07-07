import { useCallback } from 'react';

import { type NavigateOptions, useNavigate } from 'react-router-dom';

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
