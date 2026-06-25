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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

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
        className={clsx(
          'pointer-events-none absolute z-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
