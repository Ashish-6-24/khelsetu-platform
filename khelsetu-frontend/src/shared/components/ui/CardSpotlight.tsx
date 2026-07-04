import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode, useCallback, useRef, useState } from 'react';

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
}

export const CardSpotlight = ({
  children,
  className,
  // RGBA kept — CSS vars can't handle per-channel opacity in radial-gradient
  spotlightColor = 'rgba(184, 134, 11, 0.12)',
  size = 300,
}: CardSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const spotlight = spotlightRef.current;
      if (!container || !spotlight) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.setProperty('--spotlight-x', `${x - size / 2}px`);
      spotlight.style.setProperty('--spotlight-y', `${y - size / 2}px`);
    },
    [size],
  );

  return (
    <div
      ref={containerRef}
      className={twMerge(clsx('relative overflow-hidden', className))}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight gradient */}
      <div
        ref={spotlightRef}
        className={clsx(
          'pointer-events-none absolute z-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          left: 0,
          top: 0,
          width: size,
          height: size,
          transform:
            'translate(var(--spotlight-x, -9999px), var(--spotlight-y, -9999px))',
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
