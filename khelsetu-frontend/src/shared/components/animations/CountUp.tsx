import { useReducedMotion } from '@features/accessibility';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  target: number;
  duration?: number;
  format?: (n: number) => string;
  suffix?: string;
  className?: string;
}

export const CountUp = ({
  target,
  duration = 2000,
  format = (n) => n.toLocaleString(),
  suffix = '',
  className,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const animatingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    if (animatingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !animatingRef.current) {
          animatingRef.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, reducedMotion]);

  const displayValue = reducedMotion ? target : count;

  return (
    <span ref={ref} className={className}>
      {format(displayValue)}
      {suffix}
    </span>
  );
};
