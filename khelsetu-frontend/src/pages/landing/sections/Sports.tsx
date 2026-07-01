import { SportIcon } from '@features/teams/components/SportIcon';
import { Reveal } from '@shared/components/animations';
import { CheckCircle2, Trophy } from 'lucide-react';
import { sports } from '../data';

export const Sports = () => (
  <section id="sports" className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
    <Reveal intensity="moderate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-accent-hover)] dark:border-[var(--brand-accent)]/30 dark:bg-[var(--brand-accent)]/15 dark:text-[var(--brand-accent)]">
              <Trophy className="h-3.5 w-3.5" />
              Multi-sport support
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-4xl dark:text-white">
              Built for the way each sport is actually scored.
            </h2>
            <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              From cricket overs to football halves, basketball quarters to volleyball sets — our scoring engine is tailored for every sport&apos;s unique flow.
            </p>
            <ul className="mt-6 space-y-2.5">
              {['Sport-specific rules and validation', 'Undo history for every event', 'Real-time stats & commentary', 'Per-sport leaderboards'].map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sports.map((s) => (
              <div key={s.name} className="group tilt-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgb(15_23_42/0.08)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`} aria-hidden>
                  <SportIcon sport={s.sport} className="h-7 w-7" />
                </div>
                <p className="mt-4 text-base font-semibold text-[var(--text-primary)] dark:text-white">{s.name}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">{s.count}</p>
                <div className={`pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 ${s.accent}`} aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);
