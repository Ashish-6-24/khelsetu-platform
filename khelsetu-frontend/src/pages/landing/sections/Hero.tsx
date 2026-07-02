import { ScoreTicker } from '@features/live-scoring/components/ScoreTicker';
import { CursorGlow } from '@shared/components/animations';
import { Button } from '@shared/components/ui/Button';
import { FloatingOrb } from '@shared/components/ui/FloatingOrb';
import { GradientMesh } from '@shared/components/ui/PremiumCard';
import { ROUTES } from '@shared/utils/constants';
import { BarChart3, Calendar, ChevronRight, Play, Radio, ShieldCheck, Sparkles, Trophy, Tv, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { liveScores } from '../data';
import { LiveMatchCard } from './LiveMatchCard';

export const Hero = () => (
  <section className="relative overflow-hidden">
    <CursorGlow />
    <GradientMesh variant="premium" />
    <FloatingOrb color="var(--brand-primary)" size={300} delay={0} duration={25} className="-left-32 top-1/4" />

    <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="animate-fade-in-up mx-auto mb-10 max-w-3xl" style={{ animationDelay: '0ms' }}>
        <ScoreTicker items={liveScores} speed={35} />
      </div>

      <div className="animate-stagger mx-auto max-w-3xl text-center">
        <div className="animate-fade-in-up mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/15 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] backdrop-blur dark:border-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 dark:text-[var(--brand-primary)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
          KhelSetu · नेपालको लागि
        </div>

        <h1 className="animate-fade-in-up mt-6 text-balance font-display text-4xl font-medium -tracking-[0.02em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl dark:text-white gradient-shimmer-text" style={{ animationDelay: '60ms' }}>
          Run your local tournament{' '}
          <span className="text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">like a national one.</span>
        </h1>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl dark:text-[var(--text-muted)]" style={{ animationDelay: '120ms' }}>
          KhelSetu is the operations platform for cricket, football, volleyball, and basketball organizers across Nepal. Set up fixtures, run live scoring, and share results — in 10 minutes.
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '180ms' }}>
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="lg" rightIcon={<ChevronRight className="h-4 w-4" />}>
              Start a tournament
            </Button>
          </Link>
          <Button variant="outline" size="lg" leftIcon={<span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:text-[var(--brand-primary)]"><Play className="h-3 w-3 fill-current" /></span>}>
            Watch a 90-second tour
          </Button>
        </div>

        <p className="animate-fade-in-up mt-5 text-xs text-[var(--text-secondary)] dark:text-[var(--text-muted)]" style={{ animationDelay: '240ms' }}>
          Free for clubs under 8 teams · No credit card · 24/7 Nepali support
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-4 text-sm sm:flex-row" style={{ animationDelay: '300ms' }} aria-label="Platform metrics">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[var(--brand-accent)]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-base leading-none">★</span>
              ))}
            </div>
            <span className="font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">4.9</span>
            <span className="text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">from 320+ organizers</span>
          </div>
          <span className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block dark:bg-[var(--border-strong)]" aria-hidden="true" />
          <div className="flex items-center gap-2 text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-success)]" aria-hidden />
            <span>SOC 2 ready · ISO-aligned</span>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up relative mx-auto mt-20 max-w-5xl" style={{ animationDelay: '350ms' }}>
        <div className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2rem] opacity-30 blur-2xl" style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)' }} />
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
                {[Trophy, Users, Calendar, BarChart3, Radio, Tv].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-[var(--brand-primary)]/5 px-2.5 py-2 text-xs">
                    <Icon className="h-4 w-4 text-[var(--brand-primary)]" />
                    <span className="h-2 w-24 rounded bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 space-y-4 sm:col-span-9">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[{ label: 'Tournaments', value: '12' }, { label: 'Live now', value: '3' }, { label: 'Teams', value: '48' }, { label: 'Players', value: '576' }].map((s) => (
                  <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">{s.label}</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">{s.value}</p>
                  </div>
                ))}
              </div>
              <LiveMatchCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
