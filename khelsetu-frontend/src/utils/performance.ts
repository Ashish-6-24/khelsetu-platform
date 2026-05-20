import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  memory: number | null;
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

const getInitialMetrics = (): PerformanceMetrics => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const ttfb = navigation ? navigation.responseStart - navigation.requestStart : null;

  const perf = performance as PerformanceWithMemory;
  const memoryMB = perf.memory ? perf.memory.usedJSHeapSize / 1024 / 1024 : null;

  return {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb,
    memory: memoryMB,
  };
};

export const usePerformanceMetrics = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(getInitialMetrics);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
            }
            break;
          case 'largest-contentful-paint':
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
            break;
          case 'layout-shift': {
            const layoutEntry = entry as unknown as { value: number };
            setMetrics((prev) => ({
              ...prev,
              cls: (prev.cls ?? 0) + layoutEntry.value,
            }));
            break;
          }
        }
      }
    });

    try {
      observer.observe({ type: 'paint', buffered: true });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Browser doesn't support PerformanceObserver
    }

    return () => observer.disconnect();
  }, []);

  return metrics;
};

export const getPerformanceReport = (metrics: PerformanceMetrics): string => {
  const lines: string[] = ['=== Performance Report ==='];

  if (metrics.fcp !== null) {
    const status = metrics.fcp < 1800 ? 'Good' : metrics.fcp < 3000 ? 'Needs Improvement' : 'Poor';
    lines.push(`FCP: ${metrics.fcp.toFixed(0)}ms (${status})`);
  }

  if (metrics.lcp !== null) {
    const status = metrics.lcp < 2500 ? 'Good' : metrics.lcp < 4000 ? 'Needs Improvement' : 'Poor';
    lines.push(`LCP: ${metrics.lcp.toFixed(0)}ms (${status})`);
  }

  if (metrics.cls !== null) {
    const status = metrics.cls < 0.1 ? 'Good' : metrics.cls < 0.25 ? 'Needs Improvement' : 'Poor';
    lines.push(`CLS: ${metrics.cls.toFixed(3)} (${status})`);
  }

  if (metrics.memory !== null) {
    lines.push(`Memory: ${metrics.memory.toFixed(2)}MB`);
  }

  return lines.join('\n');
};
