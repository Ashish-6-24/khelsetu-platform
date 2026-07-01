import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'particles' | 'grid' | 'dots' | 'waves';
  color?: string;
  density?: 'sparse' | 'normal' | 'dense';
}

export const AnimatedBackground = ({
  className,
  variant = 'particles',
  color = 'var(--brand-primary)',
  density = 'normal',
}: AnimatedBackgroundProps) => {
  const densityMap = {
    sparse: 8,
    normal: 16,
    dense: 24,
  };
  const count = densityMap[density];

  if (variant === 'particles') {
    return (
      <div
        className={twMerge(
          clsx(
            'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
            className,
          ),
        )}
        aria-hidden
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + (i % 5) * 2}s`,
            }}
          >
            <div
              className="h-1 w-1 rounded-full opacity-30"
              style={{ background: color }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div
        className={twMerge(
          clsx('pointer-events-none absolute inset-0 -z-10', className),
        )}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(${color}40 1px, transparent 1px),
              linear-gradient(90deg, ${color}40 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div
        className={twMerge(
          clsx('pointer-events-none absolute inset-0 -z-10', className),
        )}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${color}40 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>
    );
  }

  // waves
  return (
    <div
      className={twMerge(
        clsx(
          'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
          className,
        ),
      )}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.06] dark:opacity-[0.1]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        >
          <animate
            attributeName="d"
            values="
              M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,208C672,192,768,160,864,165.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};
