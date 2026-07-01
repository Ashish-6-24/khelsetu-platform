import { GlowPulse } from '@shared/components/ui/GlowPulse';
import { Reveal } from '@shared/components/animations';
import { BarChart3, ChevronRight, Globe, Radio, ShieldCheck, Trophy, Tv, Zap } from 'lucide-react';

export const Features = () => (
  <Reveal intensity="moderate">
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Everything you need</p>
          <h2 className="mt-5 font-display text-4xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-5xl dark:text-white">
            One platform, <span className="italic">every sport</span>.
          </h2>
          <p className="mt-4 text-pretty text-lg text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            Cricket, football, basketball, volleyball — all the tools you need to run, score, and broadcast tournaments at any scale.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Live scoring */}
          <div className="group lift-2 tilt-card relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-8 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] lg:p-10">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 100% 0%, rgb(127 29 29 / 0.06) 0%, transparent 50%)' }} aria-hidden />
            <div className="relative flex h-full flex-col">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_8px_24px_-4px_rgb(127_29_29/0.45)]" style={{ background: 'linear-gradient(135deg, var(--brand-primary-hover) 0%, var(--brand-primary) 50%, var(--brand-primary-active) 100%)' }}>
                <Radio className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] dark:text-white">Live scoring, ball by ball.</h3>
              <p className="mt-3 text-pretty leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                Sport-specific scoring engines validate every event. Score from any phone, tablet, or laptop — fans, parents, and broadcasters see updates the instant the ball is bowled.
              </p>
              <div className="mt-8 flex-1 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">OVER 12.3 · NPL ROUND 7</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-live)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-live)]">
                    <GlowPulse color="red" size="sm" />
                    LIVE
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[{ name: 'Tigers', score: 142, pct: 80 }, { name: 'Eagles', score: 128, pct: 65 }].map((t) => (
                    <div key={t.name} className="flex items-center gap-3">
                      <span className="w-16 text-xs font-semibold text-[var(--text-primary)] dark:text-white">{t.name}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]">
                        <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: 'linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)' }} />
                      </div>
                      <span className="w-10 text-right font-mono text-sm font-semibold tabular-nums text-[var(--text-primary)] dark:text-white">{t.score}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-4 dark:border-[var(--border-strong)]">
                  {['FOUR', 'WICKET', 'DOT'].map((e) => (
                    <span key={e} className="rounded-md bg-white px-2 py-1.5 text-center text-[10px] font-semibold tracking-wider text-[var(--text-secondary)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-muted)]">+ {e}</span>
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
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md" style={{ background: 'linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-hover) 100%)' }}>
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">Smart brackets</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              Single-elimination, double-elimination, round-robin, and group stages. Generated in seconds, edited in clicks.
            </p>
            <svg viewBox="0 0 120 40" className="mt-5 h-8 w-full text-[var(--brand-primary)]/30 dark:text-[var(--brand-primary)]/20" aria-hidden>
              <line x1="20" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="20" x2="80" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="20" x2="80" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="10" x2="110" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="30" x2="110" y2="30" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="10" r="3" fill="var(--brand-primary)" />
              <circle cx="20" cy="30" r="3" fill="var(--brand-primary)" />
              <circle cx="110" cy="10" r="3" fill="var(--brand-accent)" />
              <circle cx="110" cy="30" r="3" fill="var(--brand-accent)" />
            </svg>
          </div>

          {/* Broadcast overlays */}
          <div className="group lift-1 tilt-card relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-2xl" style={{ background: 'radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)' }} aria-hidden />
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md" style={{ background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--bg-surface-raised) 100%)' }}>
              <Tv className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">Broadcast overlays</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              OBS-ready scoreboards, lower-thirds, and live stats — pixel perfect on every stream.
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
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md" style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, #5B1414 100%)' }}>
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">Real-time analytics</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
              Player form, team momentum, and tournament progress with dashboards built for organizers.
            </p>
            <div className="mt-5 flex h-16 items-end gap-1" aria-hidden>
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? 'linear-gradient(180deg, var(--brand-accent) 0%, var(--brand-primary) 100%)' : 'linear-gradient(180deg, var(--border-subtle) 0%, var(--border-subtle) 100%)' }} />
              ))}
            </div>
          </div>

          {/* Multi-tenant */}
          <div className="group lift-1 tilt-card relative col-span-1 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white p-7 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] lg:col-span-3">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex-1">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md" style={{ background: 'linear-gradient(135deg, var(--bg-surface-raised) 0%, var(--text-primary) 100%)' }}>
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">Multi-tenant for federations &amp; schools</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                  Organizations, role-based access, complete audit logs, custom domains, and SSO. Built for the way Nepal&apos;s federations and school networks actually run.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-primary)]" />RBAC + audit logs</span>
                  <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[var(--brand-accent)]" />SSO ready</span>
                  <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[var(--brand-primary)]" />Custom domain</span>
                </div>
              </div>
              <div className="grid flex-shrink-0 grid-cols-3 gap-3 sm:max-w-xs">
                {['CAN', 'ANFA', 'NSC', 'TU', 'KU', 'NVA'].map((c) => (
                  <div key={c} className="flex h-14 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-bold tracking-wider text-[var(--text-secondary)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] dark:text-[var(--text-muted)]">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Reveal>
);
