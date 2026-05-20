import { useCallback, useEffect, useRef, useState } from 'react';

export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): T {
  const lastCall = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttled = useCallback(
    function throttledFn(...args: Parameters<T>) {
      const now = Date.now();
      const remaining = delay - (now - lastCall.current);

      if (remaining <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        lastCall.current = now;
        callback(...args);
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          lastCall.current = Date.now();
          timeout.current = null;
          callback(...args);
        }, remaining);
      }
    },
    [callback, delay],
  );

  return throttled as T;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface VirtualListItem<T> {
  item: T;
  index: number;
  top: number;
}

export function useVirtualList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
): {
  visibleItems: VirtualListItem<T>[];
  totalHeight: number;
  scrollTop: number;
  setScrollTop: (scrollTop: number) => void;
} {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const visibleItems: VirtualListItem<T>[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    const item = items[i];
    if (item !== undefined) {
      visibleItems.push({
        item,
        index: i,
        top: i * itemHeight,
      });
    }
  }

  return {
    visibleItems,
    totalHeight,
    scrollTop,
    setScrollTop,
  };
}
