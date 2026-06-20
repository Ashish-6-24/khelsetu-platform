import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FootballPitchProps {
  children?: React.ReactNode;
  className?: string;
}

export const FootballPitch = ({ children, className }: FootballPitchProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'relative overflow-hidden rounded-2xl shadow-[var(--shadow-lg)]',
          'bg-gradient-to-b from-green-600 to-green-700',
          'dark:from-green-800 dark:to-green-900',
          className,
        ),
      )}
      style={{ aspectRatio: '68 / 105' }}
    >
      <svg
        viewBox="0 0 680 1050"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="0"
          y="0"
          width="680"
          height="1050"
          fill="transparent"
        />

        {/* Outer boundary */}
        <rect
          x="40"
          y="40"
          width="600"
          height="970"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Center line */}
        <line
          x1="40"
          y1="525"
          x2="640"
          y2="525"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Center circle */}
        <circle
          cx="340"
          cy="525"
          r="91.5"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Center spot */}
        <circle cx="340" cy="525" r="4" fill="rgba(255,255,255,0.85)" />

        {/* Top penalty area */}
        <rect
          x="138"
          y="40"
          width="404"
          height="165"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Top goal area */}
        <rect
          x="218"
          y="40"
          width="244"
          height="55"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Top penalty spot */}
        <circle cx="340" cy="130" r="4" fill="rgba(255,255,255,0.85)" />

        {/* Top penalty arc */}
        <path
          d="M 273 205 A 91.5 91.5 0 0 1 407 205"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Top goal */}
        <rect
          x="280"
          y="20"
          width="120"
          height="20"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />

        {/* Top corner arcs */}
        <path
          d="M 40 60 A 20 20 0 0 0 60 40"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />
        <path
          d="M 620 40 A 20 20 0 0 0 640 60"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Bottom penalty area */}
        <rect
          x="138"
          y="845"
          width="404"
          height="165"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Bottom goal area */}
        <rect
          x="218"
          y="955"
          width="244"
          height="55"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Bottom penalty spot */}
        <circle cx="340" cy="920" r="4" fill="rgba(255,255,255,0.85)" />

        {/* Bottom penalty arc */}
        <path
          d="M 273 845 A 91.5 91.5 0 0 0 407 845"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />

        {/* Bottom goal */}
        <rect
          x="280"
          y="1010"
          width="120"
          height="20"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />

        {/* Bottom corner arcs */}
        <path
          d="M 40 990 A 20 20 0 0 1 60 1010"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />
        <path
          d="M 620 1010 A 20 20 0 0 1 640 990"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />
      </svg>

      {children}
    </div>
  );
};
