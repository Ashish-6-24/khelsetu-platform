import { Logo } from '@components/ui/Logo';
import { ROUTES, STORAGE_KEYS } from '@utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { SidebarContent } from './SidebarContent';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === '1';
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SIDEBAR_COLLAPSED,
      isCollapsed ? '1' : '0',
    );
  }, [isCollapsed]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-xl lg:flex"
    >
      <div className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] px-4">
        <AnimatePresence mode="wait" initial={false}>
          {!isCollapsed ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link to={ROUTES.HOME} aria-label="KhelSetu home">
                <Logo size="md" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="logo-mark"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex justify-center"
            >
              <Link to={ROUTES.HOME} aria-label="KhelSetu home">
                <Logo size="md" withWordmark={false} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden h-8 w-8 min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:flex"
        >
          {isCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <SidebarContent collapsed={isCollapsed} />
    </motion.aside>
  );
};
