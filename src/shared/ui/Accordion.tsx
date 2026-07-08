import { clsx } from 'clsx';
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
              'rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-shadow',
              isOpen && 'shadow-sm',
            )}
          >
            <button
              id={`accordion-trigger-${item.id}`}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-sunken)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-inset"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200',
                  isOpen && 'rotate-180 text-[var(--text-secondary)]',
                )}
                aria-hidden
              />
            </button>
            {/* CSS Grid animation: 0fr → 1fr for butter-smooth height transition */}
            <section
              id={`accordion-panel-${item.id}`}
              aria-labelledby={`accordion-trigger-${item.id}`}
              className="grid transition-[grid-template-rows] duration-250 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[var(--border-subtle)] px-4 pb-4 pt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.content}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};
