import { useFocusTrap } from '@shared/hooks/useFocusTrap';
import { useReducedMotion } from '@shared/hooks/useReducedMotion';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { useEffect, useId, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footer?: React.ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  footer,
}: ModalProps) => {
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const backdropTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.18 };

  const dialogTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 360, damping: 30 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            className="fixed inset-0 bg-[var(--bg-inverse)]/40 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descId : undefined}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={dialogTransition}
              className={clsx(
                'relative w-full overflow-hidden rounded-2xl bg-[var(--bg-surface)] shadow-[var(--shadow-xl)] ring-1 ring-[var(--border-subtle)]',
                sizeStyles[size],
              )}
            >
              {(title || description) && (
                <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] px-6 py-4">
                  <div>
                    {title && (
                      <h2
                        id={titleId}
                        className="text-lg font-semibold tracking-tight text-[var(--text-primary)]"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        id={descId}
                        className="mt-1 text-sm text-[var(--text-secondary)]"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="inline-flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-surface-sunken)] hover:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              <div className="px-6 py-5">{children}</div>
              {footer && (
                <div className="flex items-center justify-end gap-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)]/60 px-6 py-3.5">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
