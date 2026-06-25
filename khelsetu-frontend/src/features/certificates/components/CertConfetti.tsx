import { useEffect, useMemo } from 'react';

interface CertConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const COLORS = [
  'var(--brand-accent)',
  'var(--brand-accent-hover)',
  '#f5d060',
  'var(--brand-primary)',
  'var(--color-danger)',
  'var(--brand-accent-soft)',
];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  round: boolean;
}

function generateParticles(): Particle[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length]!,
    delay: Math.random() * 0.5,
    size: 4 + Math.random() * 6,
    round: Math.random() > 0.5,
  }));
}

export function CertConfetti({ trigger, onComplete }: CertConfettiProps) {
  const particles = useMemo(
    () => (trigger ? generateParticles() : []),
    [trigger],
  );

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => onComplete?.(), 1500);
    return () => clearTimeout(timeout);
  }, [trigger, onComplete]);

  if (!trigger || particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="cert-confetti absolute bottom-0"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
