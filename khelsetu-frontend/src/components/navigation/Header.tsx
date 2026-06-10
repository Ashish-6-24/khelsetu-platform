import { useCommandPalette } from '@components/command/palette-context';
import { Avatar } from '@components/ui/Avatar';
import { BadgeDot } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { ROUTES } from '@utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

type Theme = 'light' | 'dark' | 'system';

const THEME_ORDER: Theme[] = ['light', 'dark', 'system'];

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const { setOpen: openCommandPalette } = useCommandPalette();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cycleTheme = () => {
    const current: Theme = theme ?? 'system';
    const idx = THEME_ORDER.indexOf(current);
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length] as Theme;
    setTheme(next);
  };

  const currentTheme: Theme = theme ?? 'system';
  const ThemeIcon =
    currentTheme === 'light' ? Sun : currentTheme === 'dark' ? Moon : Sparkles;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation"
          iconOnly
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span>Open navigation</span>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {greeting},
          </p>
          <p className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            {user?.name?.split(' ')[0] || 'Welcome back'}
            <BadgeDot variant="success" pulse className="ml-2 inline-block" />
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCommandPalette(true)}
          aria-label="Open command palette"
          className="hidden h-10 items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-slate-100/60 px-3.5 text-sm text-slate-500 transition-all hover:border-slate-200 hover:bg-white hover:text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:inline-flex md:w-64"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search tournaments, teams…</span>
          <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500 sm:inline-block dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            ⌘K
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => openCommandPalette(true)}
          aria-label="Open command palette"
          iconOnly
          className="md:hidden"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={cycleTheme}
          aria-label={`Theme: ${currentTheme}. Click to change.`}
          iconOnly
        >
          <ThemeIcon className="h-4 w-4" />
        </Button>

        <div className="relative" ref={notifRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            iconOnly
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--bg-surface)]" />
          </Button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-xl)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    Mark all read
                  </button>
                </div>
                <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  You&apos;re all caught up.
                </div>
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate(ROUTES.NOTIFICATIONS);
                  }}
                  className="block w-full border-t border-[var(--border-subtle)] py-2.5 text-center text-xs font-semibold text-blue-600 transition-colors hover:bg-slate-50 dark:text-blue-400 dark:hover:bg-slate-800/50"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Avatar name={user?.name || 'User'} size="sm" status="online" />
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-500 transition-transform ${
                menuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-xl)]"
              >
                <div className="border-b border-[var(--border-subtle)] px-4 py-3.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
                <div className="p-1.5">
                  <MenuItem
                    icon={User}
                    label="Your profile"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(ROUTES.SETTINGS);
                    }}
                  />
                  <MenuItem
                    icon={Settings}
                    label="Settings"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(ROUTES.SETTINGS);
                    }}
                  />
                  <MenuItem
                    icon={Sparkles}
                    label="Upgrade plan"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(ROUTES.BILLING);
                    }}
                  />
                </div>
                <div className="border-t border-[var(--border-subtle)] p-1.5">
                  <MenuItem
                    icon={LogOut}
                    label="Sign out"
                    danger
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const MenuItem = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      danger
        ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);
