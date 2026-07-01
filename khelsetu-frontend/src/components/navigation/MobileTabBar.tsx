import { ROUTES } from '@utils/constants';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  LayoutDashboard,
  Radio,
  Trophy,
  User as UserIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

interface TabItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * The 5 most-used surfaces for organizers on a phone.
 * Anything else is reachable via Cmd-K, the hamburger drawer, or the URL.
 */
const TABS: TabItem[] = [
  { label: 'Home', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Tournaments', href: ROUTES.TOURNAMENTS, icon: Trophy },
  { label: 'Scoring', href: ROUTES.SCORING, icon: Radio },
  { label: 'Inbox', href: ROUTES.NOTIFICATIONS, icon: Bell },
  { label: 'Profile', href: ROUTES.SETTINGS, icon: UserIcon },
];

const tabBarMotion = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: 'spring' as const, stiffness: 320, damping: 30 },
};

export const MobileTabBar = () => {
  const location = useLocation();
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <AnimatePresence>
      <motion.nav
        key="mobile-tabbar"
        {...tabBarMotion}
        role="navigation"
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] backdrop-blur-2xl lg:hidden"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <ul className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            const Icon = tab.icon;
            return (
              <li key={tab.href} className="flex flex-1">
                <Link
                  to={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'group relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-semibold tracking-wide transition-colors',
                    active
                      ? 'text-[var(--text-link)]'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] dark:text-[var(--text-tertiary)] dark:hover:text-[var(--text-primary)]',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="tabbar-active-pill"
                      className="absolute inset-x-2 top-0 h-0.5 rounded-b-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className={clsx(
                      'h-5 w-5 transition-transform',
                      active && 'scale-110',
                    )}
                    aria-hidden
                  />
                  <span>{tab.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </AnimatePresence>
  );
};
