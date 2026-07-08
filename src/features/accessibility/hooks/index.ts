import { useEffect, useRef, useState } from 'react';

export const useFocusTrap = <T extends HTMLElement = HTMLDivElement>(
  isActive: boolean,
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return ref;
};

export const useKeyboardNav = (
  items: HTMLElement[],
  onSelect: (index: number) => void,
): void => {
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          currentIndexRef.current = Math.min(
            currentIndexRef.current + 1,
            items.length - 1,
          );
          items[currentIndexRef.current]?.focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          currentIndexRef.current = Math.max(currentIndexRef.current - 1, 0);
          items[currentIndexRef.current]?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (currentIndexRef.current >= 0) {
            onSelect(currentIndexRef.current);
          }
          break;
        case 'Home':
          e.preventDefault();
          currentIndexRef.current = 0;
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          currentIndexRef.current = items.length - 1;
          items[currentIndexRef.current]?.focus();
          break;
      }
    };

    const container = items[0]?.parentElement;
    container?.addEventListener('keydown', handleKeyDown);
    return () => container?.removeEventListener('keydown', handleKeyDown);
  }, [items, onSelect]);
};

export const useReducedMotion = (): boolean => {
  const getInitialState = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent): void => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

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
