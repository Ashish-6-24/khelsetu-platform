import { Reveal } from '@shared/ui/animations';

import { partners } from './data';

const PartnerLogo = ({ code }: { code: string }) => {
  switch (code) {
    case 'CAN':
      // Cricket: Wickets + Ball Arc
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <line x1="8" y1="6" x2="8" y2="20" />
          <line x1="12" y1="6" x2="12" y2="20" />
          <line x1="16" y1="6" x2="16" y2="20" />
          <line x1="7" y1="6" x2="17" y2="6" />
          <path d="M19,10 C21,12 21,14 19,16" strokeDasharray="2,2" />
          <circle cx="20" cy="8" r="1.5" className="fill-current" />
        </svg>
      );
    case 'ANFA':
      // Football: Soccer ball + Mountain top
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12,2 L12,7 M12,7 L8,10 M12,7 L16,10 M8,10 L4,9.5 M16,10 L20,9.5 M8,10 L9.5,15 M16,10 L14.5,15 M9.5,15 L14.5,15 M9.5,15 L7,18.5 M14.5,15 L17,18.5" />
          <path d="M8,17 L12,12 L16,17" className="stroke-[2.5]" />
        </svg>
      );
    case 'NVA':
      // Volleyball: Seams
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M6,6 C9,9 9,15 6,18" />
          <path d="M18,6 C15,9 15,15 18,18" />
          <path d="M12,2 C12,8 12,16 12,22" />
          <path d="M2,12 C8,12 16,12 22,12" />
        </svg>
      );
    case 'NSC':
      // Sports Council: Nepalese double-triangle
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M8,6 L16,10 L10,12 L16,16 L8,18 Z"
            className="fill-current/10"
          />
          <circle cx="12" cy="9" r="1.5" className="fill-current" />
          <path d="M10,14 C11,15 13,15 14,14" />
        </svg>
      );
    case 'NPL':
      // Premier League: Championship Trophy
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <path d="M6,4 L18,4 L17,13 C17,16 14,18 12,18 C10,18 7,16 7,13 Z" />
          <path d="M6,6 C4,6 4,10 6,11 M18,6 C20,6 20,10 18,11" />
          <path d="M9,18 L15,18 M10,18 L10,21 L14,21 L14,18" />
          <polygon
            points="12,2 13,5 16,5 14,7 15,10 12,8 9,10 10,7 8,5 11,5"
            className="fill-current"
          />
        </svg>
      );
    case 'NSJF':
      // Journalists Forum: Quill pen
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <rect x="3" y="6" width="18" height="12" rx="6" />
          <path d="M12,7 L14,11 L12,15 L10,11 Z" className="fill-current/10" />
          <line x1="12" y1="7" x2="12" y2="12" />
        </svg>
      );
    case 'TU':
      // Tribhuvan University
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <polygon points="12,3 20,12 12,21 4,12" />
          <polygon points="12,6 17,12 12,18 7,12" className="fill-current/10" />
          <circle cx="12" cy="12" r="2" className="fill-current" />
        </svg>
      );
    case 'KU':
      // Kathmandu University
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth={1.75}
        >
          <path d="M12,18 C10,15 5,15 3,16 L3,6 C5,5 10,5 12,8 C14,5 19,5 21,6 L21,16 C19,15 14,15 12,18 Z" />
          <line x1="12" y1="8" x2="12" y2="18" />
          <circle cx="12" cy="11" r="2" />
          <path d="M12,7 L12,5 M8,9 L6.5,8 M16,9 L17.5,8" />
        </svg>
      );
    default:
      return (
        <span className="flex h-5 w-5 items-center justify-center rounded bg-stone-100 text-[10px] font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {code.charAt(0)}
        </span>
      );
  }
};

export const SocialProof = () => {
  const row = [...partners, ...partners];
  return (
    <Reveal intensity="subtle">
      <section
        aria-labelledby="social-proof-heading"
        className="relative border-y border-[var(--border-subtle)] bg-white py-10 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            id="social-proof-heading"
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] dark:text-[var(--text-muted)]"
          >
            Trusted by federations, clubs &amp; organizers across Nepal
          </p>
          <div
            className="marquee mt-6"
            role="list"
            aria-label="Partner organizations"
          >
            <div className="marquee-track">
              {row.map((p, i) => (
                <div
                  role="listitem"
                  key={`${p.code}-${i}`}
                  className="group flex h-11 shrink-0 items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] dark:hover:border-[var(--brand-primary)]/30 dark:hover:bg-[var(--bg-surface-raised)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:bg-red-950/40 dark:text-red-400">
                    <PartnerLogo code={p.code} />
                  </span>
                  <span className="text-sm font-bold tracking-wider text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)] dark:text-[var(--text-tertiary)] dark:group-hover:text-white">
                    {p.code}
                  </span>
                  <span className="hidden text-xs text-[var(--text-tertiary)] dark:text-[var(--text-secondary)] sm:inline">
                    · {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
