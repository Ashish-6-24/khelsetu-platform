import { clsx } from 'clsx';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withWordmark?: boolean;
  className?: string;
  variant?: 'default' | 'white' | 'mono';
}

const sizes = {
  sm: { box: 'h-7 w-7', mark: 'h-4 w-4', text: 'text-base' },
  md: { box: 'h-9 w-9', mark: 'h-5 w-5', text: 'text-lg' },
  lg: { box: 'h-12 w-12', mark: 'h-6 w-6', text: 'text-2xl' },
  xl: { box: 'h-16 w-16', mark: 'h-8 w-8', text: 'text-3xl' },
};

/**
 * The brand mark.
 *
 * Square gradient badge with a monoline "K" stroke. No decorative dot —
 * we want a stable, professional identity across every surface (favicon,
 * sidebar, app store, OG image).
 */
export const Logo = ({
  size = 'md',
  withWordmark = true,
  className,
  variant = 'default',
}: LogoProps) => {
  const s = sizes[size];
  return (
    <div className={clsx('inline-flex items-center gap-2.5', className)}>
      <div
        className={clsx(
          'relative shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-inset ring-white/10',
          'bg-gradient-to-br from-[#991B1B] via-[#7F1D1D] to-[#450A0A]',
          s.box,
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className={clsx('absolute inset-0 m-auto text-white', s.mark)}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M7 4h3v6h4V4h3v16h-3v-7h-4v7H7V4Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
          aria-hidden
        />
      </div>
      {withWordmark && (
        <span
          className={clsx(
            'font-display font-bold tracking-tight',
            s.text,
            variant === 'white' && 'text-white',
            variant === 'default' && 'text-[#7F1D1D] dark:text-[#FCA5A5]',
            variant === 'mono' && 'text-slate-900 dark:text-white',
          )}
        >
          KhelSetu
        </span>
      )}
    </div>
  );
};
