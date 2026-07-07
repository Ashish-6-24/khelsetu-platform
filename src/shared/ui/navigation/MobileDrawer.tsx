import { useFocusTrap } from '@shared/hooks/useFocusTrap';
import { Logo } from '@shared/ui/Logo';
import { ROUTES } from '@shared/utils/constants';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { useEffect, useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { SidebarContent } from './SidebarContent';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const location = useLocation();
  const containerRef = useFocusTrap<HTMLDivElement>(open);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Auto-close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Body scroll lock + focus restoration + Escape key
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', handleEscape);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md dark:bg-black/70"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className={clsx(
              'relative flex h-full w-[300px] max-w-[85vw] flex-col border-r border-[var(--border-subtle)]',
              'bg-[var(--bg-surface)] shadow-2xl',
            )}
          >
            <div className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] px-4">
              <Link to={ROUTES.HOME} aria-label="KhelSetu home">
                <Logo size="md" />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-10 w-10 min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] dark:text-[var(--text-tertiary)] dark:hover:bg-[var(--bg-surface-raised)] dark:hover:text-[var(--text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onItemClick={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
