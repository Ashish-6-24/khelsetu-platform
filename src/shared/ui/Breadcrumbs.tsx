import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';

import { Fragment } from 'react';

import { Link } from 'react-router-dom';

export interface Crumb {
  /** Visible label. */
  label: string;
  /** Route. Omit on the last item (current page). */
  href?: string;
  /** Optional Lucide icon. */
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={clsx('flex', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--text-tertiary)]">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-[var(--text-tertiary)]/50"
                  aria-hidden
                />
              )}
              <li className="flex items-center gap-1.5">
                {crumb.icon && (
                  <span className="text-[var(--text-tertiary)]" aria-hidden>
                    {crumb.icon}
                  </span>
                )}
                {crumb.href && !isLast ? (
                  <Link
                    to={crumb.href}
                    className="rounded px-1 py-0.5 transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="px-1 py-0.5 font-semibold text-[var(--text-primary)]"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
