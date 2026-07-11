import { useRef } from 'react';

export const useLiveAnnouncer = (): ((
  message: string,
  priority?: 'polite' | 'assertive',
) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    message: string,
    priority: 'polite' | 'assertive' = 'polite',
  ): void => {
    const el = document.getElementById(`aria-live-${priority}`);
    if (el) {
      el.textContent = '';
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        el.textContent = message;
      }, 100);
    }
  };
};
