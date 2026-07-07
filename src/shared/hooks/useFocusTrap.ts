import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = <T extends HTMLElement = HTMLDivElement>(
  isActive: boolean,
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;

    const getFocusable = () =>
      Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE));

    const focusable = getFocusable();
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      const current = getFocusable();
      if (current.length === 0) {
        e.preventDefault();
        return;
      }

      const first = current[0];
      const last = current[current.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return ref;
};
