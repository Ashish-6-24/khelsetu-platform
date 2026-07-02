import { useEffect, useState } from 'react';

/**
 * CursorGlow — a subtle radial gradient that follows the cursor.
 *
 * Creates a premium "alive" feel on landing pages. The glow is very faint
 * (8% opacity) so it adds atmosphere without being distracting.
 *
 * Only renders on non-touch devices (no point showing a cursor glow on mobile).
 * Respects `prefers-reduced-motion` by not rendering at all.
 */
export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Don't render if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };

    const hide = () => setVisible(false);

    window.addEventListener('mousemove', handler, { passive: true });
    document.addEventListener('mouseleave', hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handler);
      document.removeEventListener('mouseleave', hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 hidden lg:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 40%)`,
        transition: 'background 0.1s ease',
      }}
    />
  );
};
