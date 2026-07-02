import { NAV_GROUPS } from '@shared/components/navigation/nav-config';
import { ROUTES } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { Sparkles } from 'lucide-react';

import { useTransition } from 'react';

import { Link, useLocation } from 'react-router-dom';

interface SidebarContentProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const SidebarContent = ({
  collapsed = false,
  onItemClick,
}: SidebarContentProps) => {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return location.pathname === href || location.pathname === '/';
    }
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      <nav
        className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4"
        aria-label="Primary"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            {!collapsed && (
              <h3 className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                {group.title}
              </h3>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => {
                        startTransition(() => {
                          onItemClick?.();
                        });
                      }}
                      onMouseEnter={item.preload}
                      onFocus={item.preload}
                      aria-current={active ? 'page' : undefined}
                      title={collapsed ? item.name : undefined}
                      className={clsx(
                        'group relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150',
                        'min-h-11',
                        active
                          ? 'bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] dark:bg-[var(--brand-primary)]/15 dark:text-[var(--brand-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)]/70 hover:text-[var(--text-primary)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface)]/60 dark:hover:text-[var(--text-primary)]',
                        collapsed && 'justify-center px-0',
                        isPending && 'opacity-70',
                      )}
                    >
                      {active && (
                        <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-[var(--brand-primary)] to-[var(--brand-accent)]" />
                      )}
                      <Icon
                        className={clsx(
                          'h-[18px] w-[18px] shrink-0 transition-colors',
                          active
                            ? 'text-[var(--brand-primary)]'
                            : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] dark:text-[var(--text-tertiary)] dark:group-hover:text-[var(--text-secondary)]',
                        )}
                        aria-hidden
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.name}</span>
                          {item.badge && (
                            <span className="rounded-full bg-[var(--brand-primary-soft)] px-1.5 text-[10px] font-semibold text-[var(--brand-primary)] dark:bg-[var(--brand-primary)]/20 dark:text-[var(--brand-primary)]">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {!collapsed && (
          <div className="mx-1 mt-2 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--brand-primary-soft)] via-[var(--bg-surface)] to-[var(--brand-accent-soft)]/40 p-4 dark:from-[var(--brand-primary)]/10 dark:via-[var(--bg-surface-raised)] dark:to-[var(--brand-accent)]/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--brand-primary)] dark:text-[var(--brand-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade to Pro
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
              Unlock unlimited tournaments, OBS overlays & advanced analytics.
            </p>
            <Link
              to={ROUTES.BILLING}
              onClick={onItemClick}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[var(--text-primary)] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90 dark:bg-white dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-sunken)]"
            >
              See plans
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
