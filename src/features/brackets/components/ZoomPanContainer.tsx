import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import type { ReactNode } from 'react';

import { useZoomPan } from '../hooks/useZoomPan';

interface ZoomPanContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ZoomPanContainer = ({
  children,
  className,
  id,
}: ZoomPanContainerProps) => {
  const { scale, translateX, translateY, zoomIn, zoomOut, reset, handlers } =
    useZoomPan({ minScale: 0.2, maxScale: 3, step: 0.1 });

  return (
    <div className="relative">
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-xl bg-[var(--bg-surface)]/80 dark:bg-[var(--bg-surface)]/80 backdrop-blur-xl border border-[var(--border-subtle)]/60 shadow-[var(--shadow-md)] p-1">
        <button
          onClick={zoomOut}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-sunken)] transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]" />
        </button>
        <span className="px-2 text-xs font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] min-w-[3rem] text-center tabular-nums">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={zoomIn}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-sunken)] transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]" />
        </button>
        <div className="w-px h-5 bg-[var(--bg-surface-sunken)] mx-0.5" />
        <button
          onClick={reset}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-[var(--bg-surface-sunken)] transition-colors"
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-4 w-4 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]" />
        </button>
      </div>

      {/* Pannable area */}
      <div
        id={id}
        className={twMerge(
          clsx(
            'overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing',
            className,
          ),
        )}
        style={{ touchAction: 'none' }}
        {...handlers}
      >
        <motion.div
          animate={{ scale, x: translateX, y: translateY }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ transformOrigin: 'top left' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
