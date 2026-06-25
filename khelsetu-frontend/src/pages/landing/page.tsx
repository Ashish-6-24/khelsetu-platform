import { CountUp, CursorGlow, Reveal } from '@components/animations';
import { Accordion } from '@components/ui/Accordion';
import { AnimatedBackground } from '@components/ui/AnimatedBackground';
import { FloatingOrb } from '@components/ui/FloatingOrb';
import { GlowPulse } from '@components/ui/GlowPulse';
import { Logo } from '@components/ui/Logo';
import { GradientMesh } from '@components/ui/PremiumCard';
import { ScoreTicker, type TickerItem } from '@components/ui/ScoreTicker';
import { SportIcon } from '@components/ui/SportIcon';
import { ROUTES } from '@utils/constants';
import { clsx } from 'clsx';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Globe,
  HelpCircle,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  Trophy,
  Tv,
  Users,
  Zap,
} from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      <CursorGlow />
      <Hero />
      <SocialProof />
      <Sports />
      <Features />
      <Metrics />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
};

const Hero = () => {
  const liveScores: TickerItem[] = [
    {
      id: '1',
      label: 'T20',
      teamA: 'Tigers',
      teamB: 'Eagles',
      scoreA: '142/3',
      scoreB: '128/5',
      status: 'live',
    },
    {
      id: '2',
      label: 'ODI',
      teamA: 'Rhinos',
      teamB: 'Lions',
      scoreA: '245/6',
      scoreB: '198/4',
      status: 'live',
    },
    {
      id: '3',
      label: 'T10',
      teamA: 'Hawks',
      teamB: 'Wolves',
      scoreA: '87/2',
      scoreB: '64/4',
      status: 'live',
    },
    {
      id: '4',
      label: 'T20',
      teamA: 'Kings',
      teamB: 'Knights',
      scoreA: '156/4',
      scoreB: '156/8',
      status: 'completed',
    },
    {
      id: '5',
      label: 'League',
      teamA: 'Phoenix',
      teamB: 'Dragons',
      scoreA: '—',
      scoreB: '—',
      status: 'upcoming',
    },
    {
      id: '6',
      label: 'T20',
      teamA: 'Strikers',
      teamB: 'Warriors',
      scoreA: '178/5',
      scoreB: '162/7',
      status: 'live',
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <CursorGlow />
      <GradientMesh variant="premium" />
      <AnimatedBackground variant="dots" color="var(--brand-primary)" density="sparse" />

      {/* Floating orbs for connected feel */}
      <FloatingOrb
        color="var(--brand-primary)"
        size={300}
        delay={0}
        duration={25}
        className="-left-32 top-1/4"
      />
      <FloatingOrb
        color="var(--brand-accent)"
        size={250}
        delay={2}
        duration={20}
        className="-right-20 top-1/3"
      />
      <FloatingOrb
        color="var(--brand-primary)"
        size={180}
        delay={4}
        duration={22}
        className="left-1/4 -bottom-20"
      />

      <div
        className="absolute inset-0 -z-10 gradient-animate"
        style={{
          background:
            'linear-gradient(135deg, var(--bg-surface) 0%, var(--brand-primary-soft) 50%, var(--bg-surface) 100%)',
          backgroundSize: '400% 400%',
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(127, 29, 29, 0.08) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        {/* Live score ticker */}
        <div
          className="animate-fade-in-up mx-auto mb-10 max-w-3xl"
          style={{ animationDelay: '0ms' }}
        >
          <ScoreTicker items={liveScores} speed={35} />
        </div>

        <div className="animate-stagger mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/15 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] backdrop-blur dark:border-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 dark:text-[var(--brand-primary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
            KhelSetu · नेपालको लागि
          </div>

          <h1
            className="animate-fade-in-up mt-6 text-balance font-display text-4xl font-medium -tracking-[0.02em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl dark:text-white gradient-shimmer-text"
            style={{ animationDelay: '60ms' }}
          >
            Run your local tournament{' '}
            <span className="text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
              like a national one.
            </span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl dark:text-[var(--text-muted)]"
            style={{ animationDelay: '120ms' }}
          >
            KhelSetu is the operations platform for cricket, football,
            volleyball, and basketball organizers across Nepal. Set up fixtures,
            run live scoring, and share results — in 10 minutes.
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '180ms' }}
          >
            <Link to={ROUTES.REGISTER}>
              <button className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[var(--brand-primary-hover)] via-[var(--brand-primary)] to-[var(--brand-primary-active)] px-6 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgb(127_29_29/0.5)] transition-all hover:shadow-[0_8px_32px_-4px_rgb(127_29_29/0.6)] active:translate-y-px">
                Start a tournament
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <button className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-white/80 px-6 text-sm font-semibold text-[var(--text-primary)] backdrop-blur transition-all hover:border-[var(--border-strong)] hover:bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]/80 dark:text-[var(--text-primary)] dark:hover:border-[var(--border-strong)] dark:hover:bg-[var(--bg-surface-raised)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch a 90-second tour
            </button>
          </div>

          <p
            className="animate-fade-in-up mt-5 text-xs text-[var(--text-secondary)] dark:text-[var(--text-muted)]"
            style={{ animationDelay: '240ms' }}
          >
            Free for clubs under 8 teams · No credit card · 24/7 Nepali support
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-4 text-sm sm:flex-row"
            style={{ animationDelay: '300ms' }}
            aria-label="Platform metrics"
          >
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-0.5 text-[var(--brand-accent)]"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-base leading-none">
                    ★
                  </span>
                ))}
              </div>
              <span className="font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">
                4.9
              </span>
              <span className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                from 320+ organizers
              </span>
            </div>
            <span
              className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block dark:bg-[var(--border-strong)]"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2 text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
              <ShieldCheck className="h-4 w-4 text-[var(--color-success)]" aria-hidden />
              <span>SOC 2 ready · ISO-aligned</span>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-in-up relative mx-auto mt-20 max-w-5xl"
          style={{ animationDelay: '350ms' }}
        >
          <div
            className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2rem] opacity-30 blur-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)',
            }}
          />
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[0_24px_48px_-12px_rgb(15_23_42/0.12)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/80 px-4 py-3 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]/80">
              <span className="h-3 w-3 rounded-full bg-[var(--color-live)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--brand-accent)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
              <div className="ml-4 flex-1">
                <div className="mx-auto h-5 w-72 max-w-full rounded-md bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 sm:p-6">
              <div className="col-span-12 sm:col-span-3">
                <div className="space-y-2">
                  {[Trophy, Users, Calendar, BarChart3, Radio, Tv].map(
                    (Icon, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg bg-[var(--brand-primary)]/5 px-2.5 py-2 text-xs"
                      >
                        <Icon className="h-4 w-4 text-[var(--brand-primary)]" />
                        <span className="h-2 w-24 rounded bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]" />
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="col-span-12 space-y-4 sm:col-span-9">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: 'Tournaments', value: '12' },
                    { label: 'Live now', value: '3' },
                    { label: 'Teams', value: '48' },
                    { label: 'Players', value: '576' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                        {s.label}
                      </p>
                      <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="live-card relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl live-card-border" />
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
                      Live: Pokhara Tigers vs Kathmandu Eagles
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-live)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-live)]">
                      <GlowPulse color="red" size="sm" />
                      LIVE
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        name: 'Tigers',
                        score: '142/3',
                        overs: '15.2 ov',
                        pct: 80,
                      },
                      {
                        name: 'Eagles',
                        score: '128/5',
                        overs: '14.4 ov',
                        pct: 65,
                      },
                    ].map((t, i) => (
                      <div key={t.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                            {t.name}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-sm font-bold tabular-nums text-[var(--text-primary)] dark:text-white score-flash">
                              {t.score}
                            </span>
                            <span className="text-[10px] text-[var(--text-tertiary)] dark:text-[var(--text-secondary)] tabular-nums">
                              {t.overs}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]"
                            style={{
                              width: `${t.pct}%`,
                              animation: `progress-grow 1s ease-out ${i * 200}ms both`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const partners = [
    { code: 'CAN', name: 'Cricket Association of Nepal' },
    { code: 'ANFA', name: 'All Nepal Football Association' },
    { code: 'NVA', name: 'Nepal Volleyball Association' },
    { code: 'NSC', name: 'Nepal Sports Council' },
    { code: 'NSJF', name: 'Nepal Sports Journalists Forum' },
    { code: 'TU', name: 'Tribhuvan University' },
    { code: 'KU', name: 'Kathmandu University' },
    { code: 'NPL', name: 'Nepal Premier League' },
  ];
  const row = [...partners, ...partners];
  return (
    <Reveal intensity="subtle">
      <section
        aria-labelledby="social-proof-heading"
        className="relative border-y border-[var(--border-subtle)] bg-white py-10 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            id="social-proof-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] dark:text-[var(--text-muted)]"
          >
            Trusted by federations, clubs & organizers across Nepal
          </p>
          <div
            className="marquee mt-6"
            role="list"
            aria-label="Partner organizations"
          >
            <div className="marquee-track">
              {row.map((p, i) => (
                <div
                  role="listitem"
                  key={`${p.code}-${i}`}
                  className="group flex h-11 shrink-0 items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)]"
                >
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

const Features = () => {
  return (
    <Reveal intensity="moderate">
      <section id="features" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Everything you need</p>
            <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
              One platform, <span className="italic">every sport</span>.
            </h2>
            <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              Cricket, football, basketball, volleyball — all the tools you need
              to run, score, and broadcast tournaments at any scale.
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
            {/* Large hero card — Live scoring */}
            <div className="group lift-2 tilt-card relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-8 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] lg:p-10">
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 100% 0%, rgb(127 29 29 / 0.06) 0%, transparent 50%)',
                }}
                aria-hidden
              />
              <div className="relative flex h-full flex-col">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_8px_24px_-4px_rgb(127_29_29/0.45)]"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--brand-primary-hover) 0%, var(--brand-primary) 50%, var(--brand-primary-active) 100%)',
                  }}
                >
                  <Radio className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] dark:text-white">
                  Live scoring, ball by ball.
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                  Sport-specific scoring engines validate every event. Score
                  from any phone, tablet, or laptop — fans, parents, and
                  broadcasters see updates the instant the ball is bowled.
                </p>

                {/* Mock live score preview */}
                <div className="mt-8 flex-1 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                      OVER 12.3 · NPL ROUND 7
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-live)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-live)]">
                      <GlowPulse color="red" size="sm" />
                      LIVE
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Tigers', score: 142, pct: 80 },
                      { name: 'Eagles', score: 128, pct: 65 },
                    ].map((t) => (
                      <div key={t.name} className="flex items-center gap-3">
                        <span className="w-16 text-xs font-semibold text-[var(--text-primary)] dark:text-white">
                          {t.name}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${t.pct}%`,
                              background:
                                'linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)',
                            }}
                          />
                        </div>
                        <span className="w-10 text-right font-mono text-sm font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">
                          {t.score}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-4 dark:border-[var(--border-strong)]">
                    {['FOUR', 'WICKET', 'DOT'].map((e) => (
                      <span
                        key={e}
                        className="rounded-md bg-white px-2 py-1.5 text-center text-[10px] font-semibold tracking-wider text-[var(--text-secondary)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-muted)]"
                      >
                        + {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
                  See it in action
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Smart brackets */}
            <div className="group lift-1 tilt-card relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-hover) 100%)',
                }}
              >
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                Smart brackets
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                Single-elimination, double-elimination, round-robin, and group
                stages. Generated in seconds, edited in clicks.
              </p>
              <svg
                viewBox="0 0 120 40"
                className="mt-5 h-8 w-full text-[var(--brand-primary)]/30 dark:text-[var(--brand-primary)]/20"
                aria-hidden
              >
                <line
                  x1="20"
                  y1="10"
                  x2="50"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="20"
                  y1="30"
                  x2="50"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="50"
                  y1="20"
                  x2="80"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="80"
                  y1="20"
                  x2="80"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="80"
                  y1="20"
                  x2="80"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="80"
                  y1="10"
                  x2="110"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="80"
                  y1="30"
                  x2="110"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="20" cy="10" r="3" fill="var(--brand-primary)" />
                <circle cx="20" cy="30" r="3" fill="var(--brand-primary)" />
                <circle cx="110" cy="10" r="3" fill="var(--brand-accent)" />
                <circle cx="110" cy="30" r="3" fill="var(--brand-accent)" />
              </svg>
            </div>

            {/* Broadcast overlays */}
            <div className="group lift-1 tilt-card relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)',
                }}
                aria-hidden
              />
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, var(--text-primary) 0%, var(--bg-surface-raised) 100%)',
                }}
              >
                <Tv className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                Broadcast overlays
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                OBS-ready scoreboards, lower-thirds, and live stats — pixel
                perfect on every stream.
              </p>
              <div className="mt-5 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--text-primary)] to-[var(--bg-surface-raised)] p-3 dark:border-[var(--border-strong)]">
                <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider text-[var(--brand-accent)]">
                  <span>LIVE · OVER 8.2</span>
                  <span className="text-white/60">142/3</span>
                </div>
                <div className="mt-2 h-1 w-3/4 rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
              </div>
            </div>

            {/* Real-time analytics */}
            <div className="group lift-1 tilt-card relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, var(--brand-primary) 0%, #5B1414 100%)',
                }}
              >
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                Real-time analytics
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                Player form, team momentum, and tournament progress with
                dashboards built for organizers.
              </p>
              <div className="mt-5 flex h-16 items-end gap-1" aria-hidden>
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 5
                          ? 'linear-gradient(180deg, var(--brand-accent) 0%, var(--brand-primary) 100%)'
                          : 'linear-gradient(180deg, var(--border-subtle) 0%, var(--border-subtle) 100%)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Multi-tenant wide */}
            <div className="group lift-1 tilt-card relative col-span-1 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] lg:col-span-3">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex-1">
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--bg-surface-raised) 0%, var(--text-primary) 100%)',
                    }}
                  >
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                    Multi-tenant for federations & schools
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                    Organizations, role-based access, complete audit logs,
                    custom domains, and SSO. Built for the way Nepal&apos;s
                    federations and school networks actually run.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                      RBAC + audit logs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
                      SSO ready
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                      Custom domain
                    </span>
                  </div>
                </div>
                <div className="grid flex-shrink-0 grid-cols-3 gap-3 sm:max-w-xs">
                  {['CAN', 'ANFA', 'NSC', 'TU', 'KU', 'NVA'].map((c) => (
                    <div
                      key={c}
                      className="flex h-14 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-bold tracking-wider text-[var(--text-secondary)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] dark:text-[var(--text-muted)]"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

type Sport = 'cricket' | 'football' | 'volleyball' | 'basketball';

const sports: {
  name: string;
  sport: Sport;
  count: string;
  accent: string;
}[] = [
  {
    name: 'Cricket',
    sport: 'cricket',
    count: '340+ tournaments',
    accent: 'from-[var(--color-success)] to-[var(--color-success)]',
  },
  {
    name: 'Football',
    sport: 'football',
    count: '520+ tournaments',
    accent: 'from-[#1E40AF] to-[#1E3A8A]',
  },
  {
    name: 'Volleyball',
    sport: 'volleyball',
    count: '180+ tournaments',
    accent: 'from-[#B45309] to-[#92400E]',
  },
  {
    name: 'Basketball',
    sport: 'basketball',
    count: '210+ tournaments',
    accent: 'from-[#C2410C] to-[#9A3412]',
  },
];

const Sports = () => {
  return (
    <section
      id="sports"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]"
    >
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
                From cricket overs to football halves, basketball quarters to
                volleyball sets — our scoring engine is tailored for every
                sport&apos;s unique flow.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Sport-specific rules and validation',
                  'Undo history for every event',
                  'Real-time stats & commentary',
                  'Per-sport leaderboards',
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sports.map((s) => (
                <div
                  key={s.name}
                  className="group tilt-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgb(15_23_42/0.08)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
                >
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    aria-hidden
                  >
                    <SportIcon sport={s.sport} className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-[var(--text-primary)] dark:text-white">
                    {s.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                    {s.count}
                  </p>
                  <div
                    className={`pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 ${s.accent}`}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const steps = [
  {
    icon: Trophy,
    title: 'Create your tournament',
    description:
      'Set the format, add teams, configure rules — done in under 5 minutes.',
  },
  {
    icon: Users,
    title: 'Onboard teams & players',
    description:
      'Bulk import via CSV or add one at a time. Players get a complete profile.',
  },
  {
    icon: Radio,
    title: 'Run live scoring',
    description:
      'Score from any device. Brackets, standings, and stats update instantly.',
  },
  {
    icon: Tv,
    title: 'Broadcast like a pro',
    description:
      'Connect OBS to broadcast-ready overlays and share the action with the world.',
  },
];

const HowItWorks = () => {
  return (
    <Reveal intensity="moderate">
      <section id="how" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">How it works</p>
            <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
              From kickoff to championship in{' '}
              <span className="italic">four steps</span>.
            </h2>
            <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              A guided setup built for first-time organizers, with the depth
              that power-users need on day 100.
            </p>
          </div>

          <div className="relative mt-20">
            <div
              className="absolute left-0 right-0 top-12 hidden h-px lg:block"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, var(--brand-primary) 15%, var(--brand-accent) 50%, var(--brand-primary) 85%, transparent 100%)',
              }}
              aria-hidden
            />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, idx) => (
                <div key={s.title} className="group relative">
                  <div
                    className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-[0_8px_24px_-4px_rgb(127_29_29/0.35)] transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      background:
'linear-gradient(135deg, var(--brand-primary-hover) 0%, var(--brand-primary) 50%, var(--brand-primary-active) 100%)',
                    }}
                  >
                    <s.icon className="h-9 w-9" strokeWidth={1.5} />
                    <span
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-[var(--brand-primary-ink)] shadow-md"
                      aria-hidden
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-center text-base font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-center text-pretty text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

const metrics = [
  {
    target: 1250,
    suffix: '+',
    label: 'Tournaments run',
    sub: 'Across all 7 provinces',
  },
  {
    target: 18500,
    suffix: '',
    label: 'Players scored',
    sub: 'Cricket, football, VB, BB',
  },
  {
    target: 42000,
    suffix: '',
    label: 'Matches scored live',
    sub: 'In the last 12 months',
  },
  {
    target: 9997,
    suffix: '%',
    label: 'Uptime SLA',
    sub: 'Mumbai + Singapore regions',
    format: (n: number) => (n / 100).toFixed(2),
  },
];

const Metrics = () => {
  return (
    <Reveal intensity="bold">
      <section
        aria-labelledby="metrics-heading"
        className="relative border-y border-[var(--border-subtle)] bg-[var(--text-primary)] py-20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(184, 134, 11, 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'var(--brand-primary)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--brand-accent)' }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="metrics-heading" className="sr-only">
            Platform metrics
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className="relative">
                {i > 0 && (
                  <span
                    className="absolute -left-3 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[var(--brand-accent)]/30 to-transparent lg:block"
                    aria-hidden
                  />
                )}
                <p
                  className="font-display text-5xl font-medium leading-none -tracking-[0.02em] text-white sm:text-6xl tabular-nums"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  <CountUp
                    target={m.target}
                    suffix={m.suffix}
                    format={m.format ?? ((n) => n.toLocaleString())}
                  />
                </p>
                <p className="mt-3 text-sm font-semibold text-white/90">
                  {m.label}
                </p>
                <p className="mt-1 text-xs text-white/50">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
};

const Testimonials = () => {
  const items = [
    {
      quote:
        'KhelSetu cut our tournament ops time in half. Live scoring and overlays are unmatched for the Nepali circuit.',
      name: 'Sita Rana',
      role: 'Operations Lead',
      org: 'Pokhara Premier League',
      initials: 'SR',
      accent: 'from-[var(--brand-primary)] to-[var(--brand-primary-hover)]',
    },
    {
      quote:
        'We run 50+ school tournaments a year. KhelSetu is the only tool that scales with us — and the bulk import saves hours every season.',
      name: 'Bibek Shrestha',
      role: 'Athletic Director',
      org: 'Kathmandu Model College',
      initials: 'BS',
      accent: 'from-[var(--brand-accent)] to-[var(--brand-accent-hover)]',
    },
    {
      quote:
        'Our broadcast quality jumped overnight. The OBS overlays are simply gorgeous, and the OBS browser source never drops a frame.',
      name: 'Prakash Joshi',
      role: 'Producer',
      org: 'NSJF',
      initials: 'PJ',
      accent: 'from-[var(--text-primary)] to-[var(--bg-surface-raised)]',
    },
  ];
  return (
    <Reveal intensity="moderate">
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Loved by organizers</p>
              <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
                Hear from the people who run{' '}
                <span className="italic">Nepal&apos;s biggest</span>{' '}
                tournaments.
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
            {items.map((t, i) => (
              <figure
                key={t.name}
                className="card-hover relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${
                      i === 1 ? 'var(--brand-accent)' : 'var(--brand-primary)'
                    } 0%, transparent 70%)`,
                  }}
                  aria-hidden
                />
                <div
                  className="font-display text-5xl leading-none text-[var(--brand-primary)]/15 dark:text-[var(--brand-primary)]/15"
                  aria-hidden
                >
                  &ldquo;
                </div>
                <div className="flex gap-0.5 text-[var(--brand-accent)]" aria-hidden>
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
};

const formatNPR = (amount: number) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount);

interface Plan {
  name: string;
  monthly: number | 'free' | 'custom';
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthly: 'free',
    description: 'For small clubs and first-time organizers.',
    features: [
      '1 tournament',
      'Up to 4 teams',
      'Live scoring',
      'Community support',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Club',
    monthly: 2500,
    description: 'For leagues and competitive organizers.',
    features: [
      '5 tournaments',
      'Up to 24 teams',
      'OBS broadcast overlays',
      'Custom branding',
      'eSewa / Khalti payments',
      'Priority support',
    ],
    cta: 'Start with Club',
    highlight: true,
  },
  {
    name: 'District',
    monthly: 9500,
    description: 'For federations & multi-org platforms.',
    features: [
      'Unlimited tournaments',
      'Unlimited teams',
      'Custom domain',
      'Multi-club sub-accounts',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

const renderPrice = (monthly: Plan['monthly'], annual: boolean) => {
  if (monthly === 'free') return { amount: 'Free', suffix: 'forever' };
  if (monthly === 'custom') return { amount: 'Custom', suffix: '' };
  const value = annual ? monthly * 10 : monthly;
  return {
    amount: formatNPR(value),
    suffix: annual ? '/ year' : '/ month',
  };
};

const Pricing = () => {
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

            <div
              role="radiogroup"
              aria-label="Billing period"
              className="mt-8 inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/70 p-1 text-sm dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]/60"
            >
              <button
                type="button"
                role="radio"
                aria-checked={!annual}
                onClick={() => setAnnual(false)}
                className={clsx(
                  'h-8 rounded-full px-4 text-sm font-semibold transition-all',
                  !annual
                    ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-[var(--bg-surface-raised)] dark:text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted)] dark:hover:text-white',
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={annual}
                onClick={() => setAnnual(true)}
                className={clsx(
                  'inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all',
                  annual
                    ? 'bg-white text-[var(--text-primary)] shadow-sm dark:bg-[var(--bg-surface-raised)] dark:text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-muted)] dark:hover:text-white',
                )}
              >
                Annual
                <span className="rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand-primary-ink)]">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => {
              const price = renderPrice(p.monthly, annual);
              return (
                <div
                  key={p.name}
                  className={`lift-1 relative flex flex-col overflow-hidden rounded-3xl border p-7 ${
                    p.highlight
                      ? 'border-[var(--brand-primary)] bg-gradient-to-br from-[var(--brand-primary-soft)] via-white to-[var(--bg-surface)] shadow-[0_20px_60px_-15px_rgb(127_29_29/0.35)] dark:from-[var(--brand-primary)]/10 dark:via-[var(--bg-surface)] dark:to-[var(--bg-surface-raised)]'
                      : 'border-[var(--border-subtle)] bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]'
                  }`}
                >
                  {p.highlight && (
                    <div
                      className="pointer-events-none absolute inset-0 pinstripe opacity-60"
                      aria-hidden
                    />
                  )}
                  <h3 className="text-base font-semibold text-[var(--text-primary)] dark:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                    {p.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums text-[var(--text-primary)] dark:text-white">
                      {price.amount}
                    </span>
                    {price.suffix && (
                      <span className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                        {price.suffix}
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)]"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-success)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Link to={ROUTES.REGISTER}>
                      <button
                        className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${
                          p.highlight
                            ? 'bg-gradient-to-br from-[var(--brand-primary-hover)] via-[var(--brand-primary)] to-[var(--brand-primary-active)] text-white shadow-[0_4px_14px_-2px_rgb(127_29_29/0.45)] hover:shadow-[0_8px_24px_-4px_rgb(127_29_29/0.55)]'
                            : 'border border-[var(--border-subtle)] bg-white text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-raised)]'
                        }`}
                      >
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
            All plans billed in NPR · Pay via eSewa, Khalti, Fonepay, or bank
            transfer · 17% off annual
          </p>
        </div>
      </section>
    </Reveal>
  );
};

const faqItems = [
  {
    id: 'faq-trial',
    title: 'Is there really a free trial? Do I need a credit card?',
    content: (
      <p>
        Yes — 14 days, full access to every Club feature. We don&apos;t ask for
        a credit card upfront. When the trial ends, you can keep using the free
        Starter plan or upgrade. No surprises.
      </p>
    ),
  },
  {
    id: 'faq-payments',
    title: 'Which Nepali payment methods do you accept?',
    content: (
      <p>
        We accept eSewa, Khalti, Fonepay, ConnectIPS, direct bank transfer, and
        (for District plan) invoiced annual contracts in NPR. Invoices in
        English or Nepali.
      </p>
    ),
  },
  {
    id: 'faq-sports',
    title: 'Which sports are supported?',
    content: (
      <p>
        Cricket (T20, ODI, T10), football (11-a-side & 5-a-side), volleyball
        (indoor & beach), and basketball. Each sport has its own scoring engine,
        validation rules, and stat categories.
      </p>
    ),
  },
  {
    id: 'faq-broadcast',
    title: 'Do the OBS overlays cost extra?',
    content: (
      <p>
        OBS broadcast overlays are included on the Club and District plans. You
        connect OBS via a browser source URL, and we stream pixel-perfect
        scoreboards, lower-thirds, and live stats.
      </p>
    ),
  },
  {
    id: 'faq-offline',
    title: 'What happens if my internet drops during a match?',
    content: (
      <p>
        KhelSetu has offline-first scoring built in. Scorekeepers can keep
        scoring without internet — events are queued locally and synced the
        moment connectivity returns. Crucial for grounds in the hills.
      </p>
    ),
  },
  {
    id: 'faq-schools',
    title: 'Do you offer discounts for schools and youth clubs?',
    content: (
      <p>
        Yes. Schools and registered youth clubs get 50% off the Club plan.
        Contact our team with your school registration to apply.
      </p>
    ),
  },
  {
    id: 'faq-data',
    title: 'Where is my data stored? Can I export it?',
    content: (
      <p>
        All data is stored on encrypted Postgres databases with backups in
        ap-south-1 (Mumbai). You can export tournaments, players, scoring
        history, and analytics as CSV or JSON at any time.
      </p>
    ),
  },
  {
    id: 'faq-support',
    title: 'How do I get help if something goes wrong?',
    content: (
      <p>
        Email and chat support in English and Nepali. Club customers get 24-hour
        response. District customers get a dedicated account manager and a
        private WhatsApp group for fast turnaround.
      </p>
    ),
  },
];

const FAQ = () => {
  return (
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
};

const CTA = () => {
  return (
    <Reveal intensity="bold">
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16 gradient-animate"
            style={{
              background:
                'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-active) 50%, var(--bg-surface-raised) 100%)',
              backgroundSize: '400% 400%',
            }}
          >
            {/* Animated dot grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Floating orbs for premium feel */}
            <FloatingOrb
              color="var(--brand-accent)"
              size={280}
              delay={0}
              duration={18}
              className="-left-20 -top-20"
            />
            <FloatingOrb
              color="var(--brand-primary)"
              size={220}
              delay={3}
              duration={22}
              className="-right-16 -bottom-16"
            />
            <div className="relative">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-hover) 100%)',
                }}
              >
                <Zap className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-medium -tracking-[0.02em] text-white sm:text-5xl">
                Ready to run your{' '}
                <span className="italic text-[var(--brand-accent)]">best tournament</span>{' '}
                yet?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-stone-200 sm:text-lg">
                Join 1,200+ organizers who trust KhelSetu to deliver
                unforgettable sporting moments across Nepal.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to={ROUTES.REGISTER}>
                  <button className="shine inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[var(--brand-primary)] shadow-lg transition-all hover:shadow-xl dark:text-[var(--brand-primary)]">
                    Start a tournament — free
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/15">
                    <ShieldCheck className="h-4 w-4" />
                    Sign in
                  </button>
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'No credit card', icon: CheckCircle2 },
                  { label: 'Free under 8 teams', icon: Trophy },
                  { label: '24/7 Nepali support', icon: ShieldCheck },
                  { label: 'Cancel anytime', icon: Sparkles },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur"
                  >
                    <chip.icon className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
                    {chip.label}
                  </div>
                ))}
              </div>
              <p className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-300">
                <Logo size="sm" variant="white" withWordmark={false} />
                Made with care in Nepal
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
