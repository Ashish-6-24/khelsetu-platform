import { clsx } from 'clsx';
import { motion } from 'framer-motion';

import { useCallback, useId, useRef } from 'react';

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'default',
  fullWidth = false,
}: TabsProps) => {
  const uniqueId = useId();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        const nextTab = tabs[nextIndex];
        if (nextTab) {
          onChange(nextTab.id);
          tabRefs.current.get(nextTab.id)?.focus();
        }
      }
    },
    [tabs, activeTab, onChange],
  );

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={clsx(
        'inline-flex',
        variant === 'pills' &&
          'rounded-xl bg-[var(--bg-surface-sunken)]/80 p-1 dark:bg-[var(--bg-surface-sunken)]/60',
        variant === 'underline' && 'border-b border-[var(--border-subtle)]',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]',
              fullWidth && 'flex-1',
              variant === 'pills' && 'h-9 px-3.5',
              variant === 'default' && 'h-9 px-3.5',
              variant === 'underline' && 'h-10 px-3',
              variant === 'pills' && isActive
                ? 'text-[var(--text-primary)] dark:text-white'
                : variant === 'pills'
                  ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-secondary)] dark:hover:text-white'
                  : variant === 'underline'
                    ? isActive
                      ? 'text-[var(--brand-primary)] dark:text-[var(--brand-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-[var(--text-secondary)] dark:hover:text-[var(--text-primary)]'
                    : isActive
                      ? 'text-[var(--brand-primary)] dark:text-[var(--brand-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-sunken)]/60 dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-sunken)]/50',
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums',
                  isActive
                    ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:bg-[var(--brand-primary)]/20 dark:text-[var(--brand-primary)]'
                    : 'bg-[var(--bg-surface-sunken)]/70 text-[var(--text-secondary)] dark:bg-[var(--bg-surface-sunken)]/60 dark:text-[var(--text-secondary)]',
                )}
              >
                {tab.count}
              </span>
            )}
            {/* Animated underline / active indicator */}
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId={`${uniqueId}-tab-underline`}
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {isActive && variant === 'default' && (
              <motion.div
                layoutId={`${uniqueId}-tab-default-bg`}
                className="absolute inset-0 -z-10 rounded-lg bg-[var(--brand-primary-soft)] dark:bg-[var(--brand-primary)]/15"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId={`${uniqueId}-tab-pills-bg`}
                className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm dark:bg-slate-900"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
