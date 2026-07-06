import { Logo } from '@shared/ui/Logo';
import { ROUTES } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { type Variants, motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

import { Link } from 'react-router-dom';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const AboutPage = () => {
  return (
    <div className="bg-[var(--bg-surface)] dark:bg-[var(--bg-canvas)]">
      <Hero />
      <Mission />
      <Story />
      <Team />
      <Values />
      <BackedBy />
      <FooterCta />
    </div>
  );
};

const Hero = () => (
  <section className="border-b border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/15 bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] dark:border-[var(--brand-primary)]/20 dark:bg-[var(--bg-surface-raised)] dark:text-[var(--brand-primary)]"
        >
          <Heart className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
          About KhelSetu
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-balance font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl dark:text-white"
        >
          Built in Nepal.{' '}
          <span className="text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
            For Nepal.
          </span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-pretty text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl dark:text-[var(--text-muted)]"
        >
          We&apos;re a small team of engineers, designers, and former tournament
          organizers building the operating system for local sports in Nepal.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

const Mission = () => (
  <section className="py-20 sm:py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)]">
        Our mission
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl dark:text-white">
        A local club in Dolpa should have the same tools as the IPL.
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
        We watched too many tournaments run on WhatsApp groups and Excel sheets.
        We watched organizers lose a day to printing scorecards, lose a season
        to rain delays, lose sponsors to clunky broadcasts. We thought: it
        doesn&apos;t have to be this way.
      </p>
      <blockquote className="mt-8 border-l-4 border-[var(--brand-primary)] pl-6 font-display text-2xl italic leading-relaxed text-[var(--text-primary)] dark:text-white">
        &ldquo;We believe a local club in Dolpa should have the same tools as
        the IPL — without needing a 12-person tech team.&rdquo;
      </blockquote>
      <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
        KhelSetu is our answer. One platform, designed for the way Nepali
        tournaments actually work — small budgets, monsoon weather, intermittent
        internet, and proud local pride.
      </p>
    </div>
  </section>
);

const milestones = [
  {
    year: '2024',
    title: 'Founded in Kathmandu',
    description:
      'Three engineers, one shared frustration with tournament chaos, and a Saturday morning chai meeting at Bhrikutimandap.',
  },
  {
    year: '2024',
    title: 'First tournament live',
    description:
      'A 6-team college cricket league in Lalitpur. 142 matches scored. Zero paper scorecards.',
  },
  {
    year: '2025',
    title: 'OBS overlays & broadcast',
    description:
      'A Pokhara football club used KhelSetu to broadcast a full season. Their YouTube channel got 18,000 subscribers.',
  },
  {
    year: '2025',
    title: 'eSewa & Khalti payments',
    description:
      'NPR payment methods integrated. Memberships, registration fees, and tournament entry — paid in rupees.',
  },
  {
    year: '2026',
    title: '1,200+ organizers, 32 districts',
    description:
      'From Dolpa to Jhapa, organizers across Nepal are running their tournaments on KhelSetu.',
  },
];

const Story = () => (
  <section className="border-t border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)]">
        Our story
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl dark:text-white">
        Two years of showing up.
      </h2>
      <div className="mt-12 space-y-12">
        {milestones.map((m, idx) => (
          <motion.div
            key={`${m.year}-${idx}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-[80px_1fr] gap-6"
          >
            <div className="text-3xl font-display font-bold text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
              {m.year}
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                {m.title}
              </h3>
              <p className="mt-2 text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                {m.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const team = [
  {
    name: 'Ashish Subedi',
    role: 'Co-founder, Engineering',
    bio: 'Previously at a fintech in Lalitpur. Built three tournament apps that nobody used.',
    initials: 'AS',
  },
  {
    name: 'Sita Rana',
    role: 'Co-founder, Product',
    bio: 'Ran the Pokhara Premier League for 4 years. Knows where scorecards go to die.',
    initials: 'SR',
  },
  {
    name: 'Bibek Shrestha',
    role: 'Co-founder, Design',
    bio: 'Designer, occasional cricket scorer, permanent chai enthusiast.',
    initials: 'BS',
  },
];

const Team = () => (
  <section className="border-t border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)]">
          The team
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl dark:text-white">
          Three people. One platform.
        </h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
          We&apos;re small, opinionated, and we ship on Fridays.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        {team.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-6px_rgb(15_23_42/0.08)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold text-white shadow-sm"
              style={{
                background:
                  'linear-gradient(135deg, var(--brand-primary-bg-hover) 0%, var(--brand-primary-bg) 100%)',
              }}
            >
              {m.initials}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)] dark:text-white">
              {m.name}
            </h3>
            <p className="mt-1 text-xs text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
              {m.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              {m.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const values = [
  {
    n: '01',
    title: 'Local first. Always.',
    description:
      'NPR, not USD. eSewa, not Stripe. NPT, not UTC. We build for Nepal first; international is a roadmap item.',
  },
  {
    n: '02',
    title: 'Quiet over loud.',
    description:
      'Premium is restraint. No pulse-everywhere. No marketing-speak. The product does the talking.',
  },
  {
    n: '03',
    title: 'Reliable over flashy.',
    description:
      'Offline-first scoring. Multi-day battery. Works on a 5-year-old Moto. We earn trust by showing up.',
  },
  {
    n: '04',
    title: 'Pay fairly.',
    description:
      'School clubs and youth clubs get 50% off. Free for clubs under 8 teams. Sports should not be a luxury.',
  },
];

const Values = () => (
  <section className="border-t border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)]">
          Our values
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl dark:text-white">
          What we believe in.
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.n} className="flex gap-5">
            <div
              className={clsx(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold',
                'bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-[var(--brand-primary-ink)] shadow-sm',
              )}
            >
              {v.n}
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                {v.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const partners = ['NPL', 'ANFA', 'CBA', 'NVL', 'NSC', 'NSJF', 'KMC', 'PPL'];
const BackedBy = () => (
  <section className="border-t border-[var(--border-subtle)] py-16 dark:border-[var(--border-strong)]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
        Supported by the local sports community
      </p>
      <div className="mt-8 grid grid-cols-4 gap-x-8 gap-y-4 sm:grid-cols-8">
        {partners.map((p) => (
          <div
            key={p}
            className="flex h-10 items-center justify-center rounded-lg border border-dashed border-[var(--border-subtle)] text-xs font-bold tracking-wider text-[var(--text-tertiary)] dark:border-[var(--border-strong)] dark:text-[var(--text-secondary)]"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FooterCta = () => (
  <section className="border-t border-[var(--border-subtle)] py-20 dark:border-[var(--border-strong)] sm:py-24">
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <Logo size="lg" />
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl dark:text-white">
        Want to know more?
      </h2>
      <p className="mt-3 text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
        Read our blog, talk to a human, or just start a tournament — we&apos;ll
        be there.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to={ROUTES.HOME}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-br from-[var(--brand-primary-bg-hover)] via-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-active)] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_-2px_rgb(127_29_29/0.45)] transition-all hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.55)]"
        >
          Start a tournament
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="mailto:hello@khelsetu.app"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-white px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-raised)]"
        >
          Email us
        </a>
      </div>
      <div className="mt-10 flex items-center justify-center gap-3 text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
        <a
          href="#"
          aria-label="X (Twitter)"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:bg-white hover:text-[var(--brand-primary)] dark:border-[var(--border-strong)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--brand-primary)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.5 22H1.244l8.04-9.18L1 2h7.02l4.85 6.41L18.244 2Zm-1.2 18h1.82L7.04 4H5.1l11.944 16Z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:bg-white hover:text-[var(--brand-primary)] dark:border-[var(--border-strong)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--brand-primary)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
          </svg>
        </a>
        <a
          href="#"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:bg-white hover:text-[var(--brand-primary)] dark:border-[var(--border-strong)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--brand-primary)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 7.05c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49C19.14 20.61 22 16.78 22 12.25 22 6.58 17.52 2 12 2Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
);
