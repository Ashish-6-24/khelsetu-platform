import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ReactNode } from 'react';

interface GlowPulseProps {
  children?: ReactNode;
  className?: string;
  /** Color of the glow */
  color?: 'red' | 'green' | 'blue' | 'gold' | 'brand';
  /** Size of the pulse dot */
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  red: {
    dot: 'bg-[var(--color-live)]',
    glow: 'shadow-[0_0_8px_rgba(220,38,38,0.6)]', // RGBA kept — shadow opacity
    glowBg: 'rgba(220,38,38,0.4)', // RGBA kept — radial-gradient opacity
  },
  green: {
    dot: 'bg-[var(--color-success)]',
    glow: 'shadow-[0_0_8px_rgba(21,128,61,0.6)]', // RGBA kept — shadow opacity
    glowBg: 'rgba(21,128,61,0.4)', // RGBA kept — radial-gradient opacity
  },
  blue: {
    dot: 'bg-[var(--color-info)]',
    glow: 'shadow-[0_0_8px_rgba(37,99,235,0.6)]', // RGBA kept — shadow opacity
    glowBg: 'rgba(37,99,235,0.4)', // RGBA kept — radial-gradient opacity
  },
  gold: {
    dot: 'bg-[var(--brand-accent)]',
    glow: 'shadow-[0_0_8px_rgba(184,134,11,0.6)]', // RGBA kept — shadow opacity
    glowBg: 'rgba(184,134,11,0.4)', // RGBA kept — radial-gradient opacity
  },
  brand: {
    dot: 'bg-[var(--brand-primary)]',
    glow: 'shadow-[0_0_8px_rgba(127,29,29,0.6)]', // RGBA kept — shadow opacity
    glowBg: 'rgba(127,29,29,0.4)', // RGBA kept — radial-gradient opacity
  },
};

const sizeMap = {
  sm: { dot: 'h-1.5 w-1.5', glow: 'h-5 w-5' },
  md: { dot: 'h-2 w-2', glow: 'h-6 w-6' },
  lg: { dot: 'h-3 w-3', glow: 'h-8 w-8' },
};

export const GlowPulse = ({
  children,
  className,
  color = 'red',
  size = 'md',
}: GlowPulseProps) => {
  const colors = colorMap[color];
  const sizes = sizeMap[size];

  return (
    <span
      className={twMerge(clsx('relative inline-flex items-center', className))}
    >
      {/* Glow halo — blinks with the dot */}
      <span
        className={clsx('absolute rounded-full animate-pulse', sizes.glow)}
        style={{
          background: `radial-gradient(circle, ${colors.glowBg} 0%, transparent 70%)`,
        }}
      />
      {/* Solid dot — blinks via animate-pulse */}
      <span
        className={clsx(
          'relative inline-flex rounded-full animate-pulse',
          sizes.dot,
          colors.dot,
          colors.glow,
        )}
      />
      {children}
    </span>
  );
};
