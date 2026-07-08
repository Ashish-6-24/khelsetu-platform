import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { useShortcut } from '@shared/hooks/useShortcut';
import { Logo } from '@shared/ui/Logo';
import { useCommandPalette } from '@shared/ui/command/palette-context';
import { PaletteContextProvider } from '@shared/ui/command/palette-provider';
import { NAV_GROUPS } from '@shared/ui/navigation/nav-config';
import { ROUTES } from '@shared/utils/constants';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Command as CommandIcon,
  FileText,
  type LucideIcon,
  Plus,
  Radio,
  Search as SearchIcon,
} from 'lucide-react';

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

interface PaletteItem {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  group: 'Navigate' | 'Actions' | 'Help';
  shortcut?: string;
  perform: () => void;
}

const buildItems = (navigate: (to: string) => void): PaletteItem[] => {
  const navigateTo = (href: string) => () => navigate(href);

  const navItems: PaletteItem[] = NAV_GROUPS.flatMap((g) =>
    g.items.map((it) => ({
      id: `nav:${it.href}`,
      label: it.name,
      description: g.title,
      icon: it.icon,
      group: 'Navigate' as const,
      perform: navigateTo(it.href),
    })),
  );

  const actionItems: PaletteItem[] = [
    {
      id: 'action:new-tournament',
      label: 'Create new tournament',
      description: 'Set up a fresh event in seconds',
      icon: Plus,
      group: 'Actions',
      shortcut: 'C',
      perform: navigateTo(ROUTES.TOURNAMENT_CREATE),
    },
    {
      id: 'action:start-scoring',
      label: 'Start live scoring',
      description: 'Open the scoring console for a match',
      icon: Radio,
      group: 'Actions',
      perform: navigateTo(ROUTES.SCORING),
    },
    {
      id: 'action:open-search',
      label: 'Open search',
      description: 'Full search across tournaments, teams, players',
      icon: SearchIcon,
      group: 'Actions',
      shortcut: '/',
      perform: navigateTo(ROUTES.SEARCH),
    },
  ];

  const helpItems: PaletteItem[] = [
    {
      id: 'help:shortcuts',
      label: 'Keyboard shortcuts',
      description: 'View all available shortcuts',
      icon: CommandIcon,
      group: 'Help',
      perform: () => {
        // Open a shortcuts modal in the future. For now, route to settings.
        navigateTo(ROUTES.ACCESSIBILITY)();
      },
    },
    {
      id: 'help:docs',
      label: 'Documentation',
      description: 'Guides, API reference and tutorials',
      icon: FileText,
      group: 'Help',
      perform: () =>
        window.open(
          'https://docs.khelsetu.app',
          '_blank',
          'noopener,noreferrer',
        ),
    },
  ];

  return [...navItems, ...actionItems, ...helpItems];
};

// ----------------------- provider wrapper -----------------------------------

export const CommandPaletteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen((o) => !o),
    }),
    [open],
  );
  return (
    <PaletteContextProvider value={value}>
      {children}
      <CommandPalette />
    </PaletteContextProvider>
  );
};

// ----------------------- modal ------------------------------------------------

const CommandPalette = () => {
  const { open, setOpen } = useCommandPalette();

  const navigate = useNavigate();
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const stableSetOpen = useCallback(
    (next: boolean) => setOpen(next),
    [setOpen],
  );

  // Cmd/Ctrl+K toggles
  useShortcut({ key: 'k' }, () => stableSetOpen(!open));

  // Close on route change
  useEffect(() => {
    stableSetOpen(false);
  }, [location.pathname, stableSetOpen]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        stableSetOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, stableSetOpen]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const items = useMemo(() => buildItems(navigate), [navigate]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md dark:bg-slate-950/70"
            onClick={() => stableSetOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }
            }
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl"
          >
            <Command label="Command palette" className="flex flex-col">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
                <SearchIcon
                  className="h-4 w-4 shrink-0 text-[var(--text-muted)]"
                  aria-hidden
                />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none dark:text-white dark:placeholder:text-[var(--text-muted)]"
                />
                <kbd className="hidden rounded-md border border-[var(--border-subtle)] bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--text-tertiary)] sm:inline-block dark:border-[var(--border-strong)] dark:bg-[var(--bg-inverse)] dark:text-[var(--text-muted)]">
                  ESC
                </kbd>
              </div>
              <Command.List className="scrollbar-thin max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-10 text-center text-sm text-[var(--text-tertiary)] dark:text-[var(--text-muted)]">
                  No results. Try a different query.
                </Command.Empty>
                {(['Navigate', 'Actions', 'Help'] as const).map((group) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[var(--text-muted)] dark:[&_[cmdk-group-heading]]:text-[var(--text-muted)]"
                  >
                    {items
                      .filter((i) => i.group === group)
                      .map((item) => {
                        const Icon = item.icon;
                        return (
                          <Command.Item
                            key={item.id}
                            value={`${item.label} ${item.description ?? ''}`}
                            onSelect={() => {
                              item.perform();
                              stableSetOpen(false);
                            }}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-primary)] transition-colors data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900 dark:text-[var(--text-secondary)] dark:data-[selected=true]:bg-blue-500/15 dark:data-[selected=true]:text-blue-200"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-surface-sunken)] text-[var(--text-tertiary)] dark:bg-[var(--bg-surface-raised)] dark:text-[var(--text-muted)]">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="flex flex-1 flex-col">
                              <span className="font-medium">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-muted)]">
                                  {item.description}
                                </span>
                              )}
                            </span>
                            {item.shortcut && (
                              <kbd className="rounded-md border border-[var(--border-subtle)] bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--text-tertiary)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-inverse)] dark:text-[var(--text-muted)]">
                                {item.shortcut}
                              </kbd>
                            )}
                            <CommandIcon
                              className="h-3.5 w-3.5 text-slate-300 dark:text-[var(--text-muted)]"
                              aria-hidden
                            />
                          </Command.Item>
                        );
                      })}
                  </Command.Group>
                ))}
              </Command.List>
              <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 px-4 py-2.5 text-[11px] text-[var(--text-tertiary)] dark:bg-[var(--bg-inverse)]/40 dark:text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-[var(--border-subtle)] bg-white px-1 py-0.5 font-mono dark:border-[var(--border-strong)] dark:bg-[var(--bg-inverse)]">
                      ↑↓
                    </kbd>
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded border border-[var(--border-subtle)] bg-white px-1 py-0.5 font-mono dark:border-[var(--border-strong)] dark:bg-[var(--bg-inverse)]">
                      ↵
                    </kbd>
                    select
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Logo size="sm" withWordmark={false} />
                  <span>KhelSetu</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
