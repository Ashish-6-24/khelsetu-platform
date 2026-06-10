import { useReducedMotion } from '@features/accessibility';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
  /** Allow more than one item to be open at a time. */
  multiple?: boolean;
}

export const Accordion = ({
  items,
  defaultOpen,
  className,
  multiple = false,
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpen ? [defaultOpen] : []),
  );
  const reducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) return next;
      next.add(id);
      return next;
    });
  };

  return (
    <div className={clsx('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={clsx(
              'overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-shadow',
              isOpen && 'shadow-sm',
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset dark:text-white dark:hover:bg-slate-800/50"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                  isOpen && 'rotate-180 text-slate-600 dark:text-slate-200',
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={
                    reducedMotion
                      ? { opacity: 0, height: 'auto' }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    reducedMotion
                      ? { opacity: 1, height: 'auto' }
                      : { height: 'auto', opacity: 1 }
                  }
                  exit={
                    reducedMotion
                      ? { opacity: 0, height: 'auto' }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--border-subtle)] px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
