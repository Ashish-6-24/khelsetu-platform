import { clsx } from 'clsx';

interface SportIconProps {
  className?: string;
  sport: 'cricket' | 'football' | 'volleyball' | 'basketball';
}

/**
 * Premium branded sport icon set.
 * Custom monoline SVG marks designed to read instantly at 24–48px,
 * render in any colour (uses currentColor), and stay on-brand across
 * both light and dark themes.
 */
const CricketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M24 8v3M24 37v3M8 24h3M37 24h3" />
    <path d="M11 11l2 2M35 35l2 2M11 37l2-2M35 13l2-2" />
    <path d="M19 19l10 10" strokeWidth={2.8} />
    <path d="M14 30c2 0 4 2 4 4" strokeWidth={2} opacity={0.6} />
  </svg>
);

const FootballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M24 14l7 4-3 8h-8l-3-8 7-4Z" />
    <path d="M24 14v-6M14 18l-5-3M34 18l5-3M14 30l-5 3M34 30l5 3M20 34l-2 6M28 34l2 6" />
  </svg>
);

const VolleyballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M24 4c-7 6-10 13-10 20" />
    <path d="M24 4c7 6 10 13 10 20" />
    <path d="M4 24c6 7 13 10 20 10" />
    <path d="M4 24c6-7 13-10 20-10" />
    <path d="M14 34c4-4 7-6 10-6s6 2 10 6" opacity={0.7} />
  </svg>
);

const BasketballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="24" cy="24" r="20" />
    <path d="M24 4v40M4 24h40" />
    <path d="M9 11c5 6 30 20 30 20" opacity={0.85} />
    <path d="M39 11C34 17 9 31 9 31" opacity={0.85} />
  </svg>
);

const iconMap = {
  cricket: CricketIcon,
  football: FootballIcon,
  volleyball: VolleyballIcon,
  basketball: BasketballIcon,
};

export const SportIcon = ({ sport, className }: SportIconProps) => {
  const Icon = iconMap[sport];
  return <Icon className={clsx('h-full w-full', className)} aria-hidden />;
};
