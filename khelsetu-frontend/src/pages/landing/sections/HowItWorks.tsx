import { Reveal } from '@shared/components/animations';
import { steps } from '../data';

export const HowItWorks = () => (
  <Reveal intensity="moderate">
    <section id="how" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How it works</p>
          <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
            From kickoff to championship in <span className="italic">four steps</span>.
          </h2>
          <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            A guided setup built for first-time organizers, with the depth that power-users need on day 100.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-12 hidden h-px lg:block" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--brand-primary) 15%, var(--brand-accent) 50%, var(--brand-primary) 85%, transparent 100%)' }} aria-hidden />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div key={s.title} className="group relative">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-[0_8px_24px_-4px_rgb(127_29_29/0.35)] transition-transform duration-300 group-hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, var(--brand-primary-hover) 0%, var(--brand-primary) 50%, var(--brand-primary-active) 100%)' }}>
                  <s.icon className="h-9 w-9" strokeWidth={1.5} />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-[var(--brand-primary-ink)] shadow-md" aria-hidden>
                    {idx + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-center text-base font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">{s.title}</h3>
                <p className="mt-2 text-center text-pretty text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Reveal>
);
