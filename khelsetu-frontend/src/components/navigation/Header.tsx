import { ThemeToggle } from '@components/ThemeToggle';
import { useCommandPalette } from '@components/command/palette-context';
import { Avatar } from '@components/ui/Avatar';
import { BadgeDot } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { ROUTES } from '@utils/constants';
import { getGreeting } from '@utils/date';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();
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

  const greeting = getGreeting();

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
          <p className="truncate text-sm text-[var(--text-tertiary)]">
            {greeting},
          </p>
          <p className="truncate text-base font-semibold tracking-tight text-[var(--text-primary)]">
            {user?.name?.split(' ')[0] || 'Welcome back'}
            <BadgeDot variant="success" pulse className="ml-2 inline-block" />
          </p>
        </div>

        <button
          type="button"
          onClick={() => openCommandPalette(true)}
          aria-label="Open command palette"
          className="hidden h-10 items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/60 px-3.5 text-sm text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-secondary)] dark:bg-[var(--bg-surface)]/50 dark:text-[var(--text-tertiary)] dark:hover:border-[var(--border-subtle)] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--text-secondary)] md:inline-flex md:w-64"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search tournaments, teams…</span>
          <kbd className="hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--text-tertiary)] sm:inline-block dark:border-[var(--border-subtle)] dark:bg-[var(--bg-canvas)] dark:text-[var(--text-tertiary)]">
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

        <ThemeToggle />

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
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-live)] ring-2 ring-[var(--bg-surface)]" />
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
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Notifications
                  </h3>
                  <button className="text-xs font-semibold text-[var(--text-link)]">
                    Mark all read
                  </button>
                </div>
                <div className="px-4 py-8 text-center text-sm text-[var(--text-tertiary)]">
                  You&apos;re all caught up.
                </div>
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate(ROUTES.NOTIFICATIONS);
                  }}
                  className="block w-full border-t border-[var(--border-subtle)] py-2.5 text-center text-xs font-semibold text-[var(--text-link)] transition-colors hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface)]/50"
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
             className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-[var(--brand-primary)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
           >
            <Avatar name={user?.name || 'User'} size="sm" status="online" />
            <ChevronDown
              className={`h-3.5 w-3.5 text-[var(--text-secondary)] transition-transform ${
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
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {user?.name}
                  </p>
                  <p className="truncate text-xs text-[var(--text-tertiary)]">
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
        ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 dark:text-[var(--color-danger)] dark:hover:bg-[var(--color-danger-soft)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface)]/60'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);
