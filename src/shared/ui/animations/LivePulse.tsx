interface LivePulseProps {
  color?: 'red' | 'green';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { dot: 'h-2 w-2', ring: 'h-2 w-2' },
  md: { dot: 'h-3 w-3', ring: 'h-3 w-3' },
  lg: { dot: 'h-4 w-4', ring: 'h-4 w-4' },
} as const;

const colorMap = {
  red: {
    dot: 'bg-[var(--color-live)]',
    ring: 'bg-[var(--color-live)]',
  },
  green: {
    dot: 'bg-[var(--color-success)]',
    ring: 'bg-[var(--color-success)]',
  },
};

/**
 * Premium live indicator with expanding ping ring + solid dot.
 * Accessible: hidden from screen readers (decorative).
 * Respects prefers-reduced-motion via Tailwind's built-in media query.
 */
export const LivePulse = ({ color = 'red', size = 'md' }: LivePulseProps) => (
  <span className="relative inline-flex" aria-hidden="true">
    <span
      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${sizeMap[size].ring} ${colorMap[color].ring}`}
    />
    <span
      className={`relative inline-flex rounded-full ${sizeMap[size].dot} ${colorMap[color].dot}`}
    />
  </span>
);
