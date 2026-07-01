import { Logo } from '@components/ui/Logo';
import { ROUTES } from '@utils/constants';
import { useUIStore } from '@store/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Link } from 'react-router-dom';

import { SidebarContent } from './SidebarContent';

export const Sidebar = () => {
  const sidebarState = useUIStore((s) => s.sidebarState);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const isCollapsed = sidebarState === 'collapsed';

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
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden h-11 w-11 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] dark:text-[var(--text-tertiary)] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--text-primary)] lg:flex"
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
