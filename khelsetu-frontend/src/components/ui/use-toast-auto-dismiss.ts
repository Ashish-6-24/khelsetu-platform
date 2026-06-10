import { useEffect } from 'react';

import type { Toast } from './toast-context';

export const useToastAutoDismiss = (
  toasts: Toast[],
  removeToast: (id: string) => void,
): void => {
  useEffect(() => {
    const timers = toasts.map((t) =>
      t.duration !== 0
        ? setTimeout(() => removeToast(t.id), t.duration ?? 5000)
        : null,
    );
    return () => {
      timers.forEach((t) => t && clearTimeout(t));
    };
  }, [toasts, removeToast]);
};
