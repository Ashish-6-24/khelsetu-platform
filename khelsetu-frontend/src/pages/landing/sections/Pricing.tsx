import { Reveal } from '@shared/components/animations';
import { CheckCircle2, ChevronRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useState } from 'react';
import { ROUTES } from '@shared/utils/constants';
import { plans, renderPrice } from '../data';

export const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <Reveal intensity="subtle">
      <section id="pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-accent-hover)] dark:border-[var(--brand-accent)]/30 dark:bg-[var(--brand-accent)]/15 dark:text-[var(--brand-accent)]">
              <Cpu className="h-3.5 w-3.5" />
              Pricing
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-4xl dark:text-white">
              Pricing for local clubs, not international SaaS.
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              Pay in NPR. Cancel anytime. Free for clubs under 8 teams.
            </p>

            <div role="radiogroup" aria-label="Billing period" className="mt-8 inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/70 p-1 text-sm dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]/60">
              <button type="button" role="radio" aria-checked={!annual} onClick={() => setAnnual(false)} className={clsx('h-8 rounded-full px-4 text-sm font-semibold transition-all', !annual ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-[var(--bg-surface-raised)] dark:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted)] dark:hover:text-white')}>
                Monthly
              </button>
              <button type="button" role="radio" aria-checked={annual} onClick={() => setAnnual(true)} className={clsx('inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all', annual ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-[var(--bg-surface-raised)] dark:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted)] dark:hover:text-white')}>
                Annual
                <span className="rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand-primary-ink)]">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => {
              const price = renderPrice(p.monthly, annual);
              return (
                <div key={p.name} className={`lift-1 relative flex flex-col overflow-hidden rounded-3xl border p-7 ${p.highlight ? 'border-[var(--brand-primary)] bg-gradient-to-br from-[var(--brand-primary-soft)] via-white to-[var(--bg-surface)] shadow-[0_20px_60px_-15px_rgb(127_29_29/0.35)] dark:from-[var(--brand-primary)]/10 dark:via-[var(--bg-surface)] dark:to-[var(--bg-surface-raised)]' : 'border-[var(--border-subtle)] bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]'}`}>
                  {p.highlight && <div className="pointer-events-none absolute inset-0 pinstripe opacity-60" aria-hidden />}
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">{p.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums text-[var(--text-primary)] dark:text-white">{price.amount}</span>
                    {price.suffix && <span className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">{price.suffix}</span>}
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-success)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Link to={ROUTES.REGISTER}>
                      <button className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${p.highlight ? 'bg-gradient-to-br from-[var(--brand-primary-hover)] via-[var(--brand-primary)] to-[var(--brand-primary-active)] text-white shadow-[0_4px_14px_-2px_rgb(127_29_29/0.45)] hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.55)]' : 'border border-[var(--border-subtle)] bg-white text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-raised)]'}`}>
                        {p.cta}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
            All plans billed in NPR · Pay via eSewa, Khalti, Fonepay, or bank transfer · 17% off annual
          </p>
        </div>
      </section>
    </Reveal>
  );
};
