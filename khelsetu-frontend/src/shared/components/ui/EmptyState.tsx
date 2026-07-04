import { clsx } from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { Inbox, type LucideIcon } from 'lucide-react';

import type { ReactNode } from 'react';

interface EmptyStateProps {
  /** Lucide icon to show above the title. Defaults to <Inbox />. */
  icon?: LucideIcon;
  /** Heading. */
  title: string;
  /** Helper text below the heading. */
  description?: string;
  /** Primary action button / link. */
  action?: ReactNode;
  /** Optional secondary action (link, button). */
  secondaryAction?: ReactNode;
  /** Optional decorative illustration. */
  illustration?: ReactNode;
  /** Tighter layout for list/table empty areas. */
  compact?: boolean;
  className?: string;
}

export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  illustration,
  compact = false,
  className,
}: EmptyStateProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-2 px-4 py-8' : 'gap-3 px-6 py-14',
        className,
      )}
      role="region"
      aria-label={title}
    >
      {illustration ? (
        <div className="mb-1" aria-hidden>
          {illustration}
        </div>
      ) : (
        <div
          aria-hidden
          className={clsx(
            'relative flex items-center justify-center rounded-2xl',
            'bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-raised)] dark:from-[var(--bg-surface-raised)]/80 dark:to-[var(--bg-surface-sunken)]',
            'ring-1 ring-[var(--border-subtle)] shadow-sm',
            compact ? 'h-12 w-12' : 'h-16 w-16',
          )}
        >
          <Icon
            className={clsx(
              'text-[var(--text-muted)] dark:text-[var(--text-muted)]',
              compact ? 'h-5 w-5' : 'h-7 w-7',
            )}
          />
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--brand-primary)]/0 via-[var(--brand-primary-hover)]/0 to-[var(--brand-accent)]/10 opacity-60 blur"
            aria-hidden
          />
        </div>
      )}

      <div className="max-w-sm">
        <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)] dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </motion.div>
  );
};
