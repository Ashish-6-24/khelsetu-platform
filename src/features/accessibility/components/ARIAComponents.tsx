import { clsx } from 'clsx';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: 'span' | 'div' | 'p' | 'label';
  className?: string;
}

export const VisuallyHidden = ({
  children,
  as: Component = 'span',
  className,
}: VisuallyHiddenProps) => {
  return (
    <Component
      className={clsx(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        'clip-[rect(0,0,0,0)]',
        className,
      )}
    >
      {children}
    </Component>
  );
};

interface LiveRegionProps {
  priority?: 'polite' | 'assertive';
  'aria-atomic'?: boolean;
}

export const LiveRegion = ({
  children,
  priority = 'polite',
  'aria-atomic': ariaAtomic,
}: React.PropsWithChildren<LiveRegionProps>) => {
  return (
    <div
      id={`aria-live-${priority}`}
      role="status"
      aria-live={priority}
      aria-atomic={ariaAtomic}
      className="sr-only"
    >
      {children}
    </div>
  );
};
