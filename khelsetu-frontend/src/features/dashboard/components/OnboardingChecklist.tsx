import { useReducedMotion } from '@features/accessibility';
import { Card, CardBody, CardHeader } from '@shared/components/ui/Card';
import { STORAGE_KEYS } from '@shared/utils/constants';
import { ROUTES } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Radio,
  Sparkles,
  Trophy,
  Users,
  Video,
  X,
} from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

interface Step {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Heuristic — `false` = not done, `true` = done. */
  done: boolean;
}

interface OnboardingChecklistProps {
  /**
   * Per-step completion state, keyed by step id.
   * The host page derives this from app state (tournaments, teams, etc).
   */
  state: Partial<Record<string, boolean>>;
  className?: string;
}

const baseSteps = [
  {
    id: 'tournament',
    title: 'Create your first tournament',
    description: 'Set the format, rules, and dates. Takes 2 minutes.',
    href: ROUTES.TOURNAMENT_CREATE,
    cta: 'Create',
    icon: Trophy,
  },
  {
    id: 'team',
    title: 'Add a team',
    description: 'Onboard 1 or 100 teams — manual or CSV import.',
    href: ROUTES.TEAMS,
    cta: 'Add team',
    icon: Users,
  },
  {
    id: 'scoring',
    title: 'Run a scoring demo',
    description: 'See how live scoring feels in seconds.',
    href: ROUTES.SCORING,
    cta: 'Try scoring',
    icon: Radio,
  },
  {
    id: 'overlay',
    title: 'Connect OBS overlay',
    description: 'Broadcast-ready scoreboards in one click.',
    href: ROUTES.OVERLAYS,
    cta: 'Open overlays',
    icon: Video,
  },
] as const;

export const OnboardingChecklist = ({
  state,
  className,
}: OnboardingChecklistProps) => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE) === '1';
  });
  const reducedMotion = useReducedMotion();

  const steps: Step[] = baseSteps.map((s) => ({
    ...s,
    done: Boolean(state[s.id]),
  }));

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;

  // Auto-collapse when everything is done or user has dismissed
  if (allDone) return null;
  if (dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, '1');
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
        transition={{ duration: 0.3 }}
        className={clsx('relative', className)}
      >
        <Card elevated className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/[0.04] via-transparent to-[var(--brand-accent)]/[0.04]"
            aria-hidden
          />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss onboarding"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
          <CardHeader divided className="!pr-12">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-hover)] text-white shadow-md">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  Get set up in 4 steps
                </h3>
                <p className="mt-0.5 text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  <span className="font-semibold text-[var(--brand-primary)]">
                    {completedCount} of {steps.length}
                  </span>{' '}
                  complete
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-1">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={clsx(
                    'h-1 flex-1 rounded-full transition-colors duration-500',
                    s.done
                      ? 'bg-emerald-500'
                      : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)]',
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </CardHeader>
          <CardBody padding="none">
            <ul className="divide-y divide-[var(--border-subtle)]">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.id}>
                    <Link
                      to={step.href}
                      className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--bg-surface-sunken)]/70 focus-visible:bg-[var(--bg-surface-sunken)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-primary)] dark:hover:bg-[var(--bg-surface)]/40"
                    >
                      <span
                        className={clsx(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors',
                          step.done
                            ? 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400'
                            : 'bg-[var(--bg-surface-sunken)] text-[var(--text-tertiary)] ring-[var(--border-subtle)] group-hover:bg-[var(--brand-primary)]/10 group-hover:text-[var(--brand-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-tertiary)] dark:group-hover:bg-[var(--brand-primary)]/15 dark:group-hover:text-[var(--brand-primary)]',
                        )}
                        aria-hidden
                      >
                        {step.done ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={clsx(
                            'truncate text-sm font-semibold',
                            step.done
                              ? 'text-[var(--text-tertiary)] line-through dark:text-[var(--text-tertiary)]'
                              : 'text-slate-900 dark:text-white',
                          )}
                        >
                          {step.title}
                        </p>
                        <p className="truncate text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                          {step.description}
                        </p>
                      </div>
                      {!step.done && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] opacity-0 transition-opacity group-hover:opacity-100">
                          {step.cta}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
