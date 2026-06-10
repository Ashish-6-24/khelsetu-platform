import { Logo } from '@components/ui/Logo';
import { APP_NAME } from '@utils/constants';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.5 22H1.244l8.04-9.18L1 2h7.02l4.85 6.41L18.244 2Zm-1.2 18h1.82L7.04 4H5.1l11.944 16Z" />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 7.05c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49C19.14 20.61 22 16.78 22 12.25 22 6.58 17.52 2 12 2Z"
    />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.5 12 3.5 12 3.5s-7.49 0-9.37.56A3.02 3.02 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 0 0 2.13 2.14C4.51 20.5 12 20.5 12 20.5s7.49 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z" />
  </svg>
);

const linkGroups = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Sports', href: '#sports' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Tournament Organizers', href: '#' },
      { name: 'Schools & Colleges', href: '#' },
      { name: 'Clubs & Academies', href: '#' },
      { name: 'Broadcasters', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Status', href: '#' },
      { name: 'Support', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Press kit', href: '#' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              The all-in-one platform to run, score, and broadcast world-class
              sports tournaments. Built for organizers, loved by fans.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href="#" icon={TwitterIcon} label="Twitter" />
              <SocialLink href="#" icon={LinkedInIcon} label="LinkedIn" />
              <SocialLink href="#" icon={GitHubIcon} label="GitHub" />
              <SocialLink href="#" icon={YouTubeIcon} label="YouTube" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} {APP_NAME}. Crafted in Kathmandu.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">
              Security
            </a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) => (
  <a
    href={href}
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-slate-500 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
  >
    <Icon className="h-4 w-4" />
  </a>
);
