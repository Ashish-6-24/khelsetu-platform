import { NAV_GROUPS } from '@components/navigation/nav-config';
import { ROUTES } from '@utils/constants';
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
              <h3 className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white',
                        collapsed && 'justify-center px-0',
                        isPending && 'opacity-70',
                      )}
                    >
                      {active && (
                        <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full bg-gradient-to-b from-[#7F1D1D] to-[#B8860B]" />
                      )}
                      <Icon
                        className={clsx(
                          'h-[18px] w-[18px] shrink-0 transition-colors',
                          active
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300',
                        )}
                        aria-hidden
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.name}</span>
                          {item.badge && (
                            <span className="rounded-full bg-blue-100 px-1.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
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
          <div className="mx-1 mt-2 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[#FEF2F2] via-[#FAFAF9] to-[#FEF3C7]/40 p-4 dark:from-[#7F1D1D]/10 dark:via-[#1A1A23] dark:to-[#B8860B]/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade to Pro
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Unlock unlimited tournaments, OBS overlays & advanced analytics.
            </p>
            <Link
              to={ROUTES.BILLING}
              onClick={onItemClick}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              See plans
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
