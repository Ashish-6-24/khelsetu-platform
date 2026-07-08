import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FloatingOrbProps {
  readonly className?: string;
  readonly color?: string;
  readonly size?: number;
  readonly delay?: number;
  readonly duration?: number;
}

export const FloatingOrb = ({
  className,
  color = 'var(--brand-primary)',
  size = 200,
  delay = 0,
  duration = 20,
}: FloatingOrbProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'pointer-events-none absolute rounded-full blur-3xl opacity-20',
          'dark:opacity-30',
          className,
        ),
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: `float-orb ${duration}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    />
  );
};

/** Connected dots visualization - shows network/connected feel */
interface ConnectedDotsProps {
  className?: string;
  dots?: number;
  color?: string;
  /** Spacing between dots in px */
  spacing?: number;
}

export const ConnectedDots = ({
  className,
  dots = 6,
  color = 'var(--brand-primary)',
  spacing = 48,
}: ConnectedDotsProps) => {
  const positions = Array.from({ length: dots }, (_, i) => ({
    x: Math.cos((i / dots) * Math.PI * 2) * spacing,
    y: Math.sin((i / dots) * Math.PI * 2) * spacing,
  }));

  return (
    <div className={twMerge(clsx('relative h-32 w-32', className))} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="-60 -60 120 120">
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % positions.length]!;
          return (
            <line
              key={`line-${pos.x}-${pos.y}`}
              x1={pos.x}
              y1={pos.y}
              x2={next.x}
              y2={next.y}
              stroke={color}
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}
        {positions.map((pos, i) => (
          <circle
            key={`dot-${pos.x}-${pos.y}`}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill={color}
            opacity="0.8"
          >
            <animate
              attributeName="r"
              values="2;4;2"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle cx="0" cy="0" r="4" fill={color} opacity="0.9">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

/** Animated counter that counts up on mount */
interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedNumber = ({
  value,
  suffix = '',
  prefix = '',
  className,
}: AnimatedNumberProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          'tabular-nums font-mono',
          'bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent',
          className,
        ),
      )}
      style={{
        fontFeatureSettings: '"tnum"',
      }}
    >
      {prefix}
      <CountUpAnimated target={value} />
      {suffix}
    </span>
  );
};

/** Simple count-up animation using requestAnimationFrame */
function CountUpAnimated({ target }: { target: number }) {
  // This is a placeholder - in production, use a hook like useCountUp
  // For now, just render the target value
  return <>{target.toLocaleString()}</>;
}
