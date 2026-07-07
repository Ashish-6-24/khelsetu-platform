import { Reveal } from '@shared/ui/animations';
import { CheckCircle2 } from 'lucide-react';

import { testimonials } from '../data';

export const Testimonials = () => (
  <Reveal intensity="moderate">
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Loved by organizers</p>
            <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
              Hear from the people who run{' '}
              <span className="italic">Nepal&apos;s biggest</span> tournaments.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white px-5 py-4 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
            <div className="flex flex-col">
              <div
                className="flex items-center gap-1 text-[var(--brand-accent)]"
                aria-hidden
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg leading-none">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-[var(--text-primary)] dark:text-white">
                4.9
                <span className="ml-1 text-sm font-medium text-[var(--text-tertiary)]">
                  / 5
                </span>
              </p>
            </div>
            <div
              className="h-10 w-px bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
                320+ reviews
              </p>
              <p className="text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                Verified organizers
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="card-hover relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${i === 1 ? 'var(--brand-accent)' : 'var(--brand-primary)'} 0%, transparent 70%)`,
                }}
                aria-hidden
              />
              <div
                className="font-display text-5xl leading-none text-[var(--brand-primary)]/15 dark:text-[var(--brand-primary)]/15"
                aria-hidden
              >
                &ldquo;
              </div>
              <div
                className="flex gap-0.5 text-[var(--brand-accent)]"
                aria-hidden
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-sm leading-none">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="text-pretty text-base leading-relaxed text-[var(--text-primary)] dark:text-white">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-[var(--border-subtle)] pt-5 dark:border-[var(--border-strong)]">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-sm ${t.accent}`}
                >
                  {t.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                    {t.role} · {t.org}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-success)] dark:bg-[var(--color-success)]/15 dark:text-[var(--color-success)]"
                  title="Verified customer"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  </Reveal>
);
