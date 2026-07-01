import { Reveal } from '@shared/components/animations';
import { partners } from '../data';

export const SocialProof = () => {
  const row = [...partners, ...partners];
  return (
    <Reveal intensity="subtle">
      <section aria-labelledby="social-proof-heading" className="relative border-y border-[var(--border-subtle)] bg-white py-10 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p id="social-proof-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            Trusted by federations, clubs &amp; organizers across Nepal
          </p>
          <div className="marquee mt-6" role="list" aria-label="Partner organizations">
            <div className="marquee-track">
              {row.map((p, i) => (
                <div role="listitem" key={`${p.code}-${i}`} className="group flex h-11 shrink-0 items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-active)] text-[10px] font-bold tracking-wider text-white">
                    {p.code.charAt(0)}
                  </span>
                  <span className="text-sm font-bold tracking-wider text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)] dark:text-[var(--text-tertiary)] dark:group-hover:text-white">
                    {p.code}
                  </span>
                  <span className="hidden text-xs text-[var(--text-tertiary)] dark:text-[var(--text-secondary)] sm:inline">
                    · {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
