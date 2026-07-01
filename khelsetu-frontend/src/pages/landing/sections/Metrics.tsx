import { CountUp, Reveal } from '@shared/components/animations';
import { metrics } from '../data';

export const Metrics = () => (
  <Reveal intensity="bold">
    <section aria-labelledby="metrics-heading" className="relative border-y border-[var(--border-subtle)] bg-[var(--text-primary)] py-20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(184, 134, 11, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--brand-primary)' }} aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--brand-accent)' }} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-heading" className="sr-only">Platform metrics</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="relative">
              {i > 0 && (
                <span className="absolute -left-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--brand-accent)]/30 to-transparent lg:block" aria-hidden />
              )}
              <p className="font-display text-5xl font-medium leading-none -tracking-[0.02em] text-white sm:text-6xl tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                <CountUp target={m.target} suffix={m.suffix} format={m.format ?? ((n) => n.toLocaleString())} />
              </p>
              <p className="mt-3 text-sm font-semibold text-white/90">{m.label}</p>
              <p className="mt-1 text-xs text-white/50">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Reveal>
);
