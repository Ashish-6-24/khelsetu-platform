import { Accordion } from '@shared/ui/Accordion';
import { Reveal } from '@shared/ui/animations';
import { HelpCircle } from 'lucide-react';

import { faqItems } from '../data';

export const FAQ = () => (
  <Reveal intensity="subtle">
    <section
      id="faq"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/15 bg-[var(--brand-primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] dark:border-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 dark:text-[var(--brand-primary)]">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="mt-4 font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-4xl dark:text-white">
            Questions, answered.
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="mt-12">
          <Accordion items={faqItems} defaultOpen={faqItems[0]?.id} />
        </div>
        <p className="mt-10 text-center text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
          Still have questions?{' '}
          <a
            href="mailto:hello@khelsetu.app"
            className="font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] dark:text-[var(--brand-primary)]"
          >
            Talk to our team
          </a>
        </p>
      </div>
    </section>
  </Reveal>
);
