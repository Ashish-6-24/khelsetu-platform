import { Logo } from '@components/ui/Logo';
import { SkipLink } from '@features/accessibility';
import { APP_NAME } from '@utils/constants';
import { ROUTES } from '@utils/constants';
import { motion } from 'framer-motion';
import { BarChart3, Radio, Sparkles, Trophy, Users } from 'lucide-react';

import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const highlights = [
  { icon: Trophy, text: 'Run unlimited tournaments' },
  { icon: Radio, text: 'Real-time ball-by-ball scoring' },
  { icon: Users, text: 'Manage teams & players easily' },
  { icon: BarChart3, text: 'Powerful analytics & reports' },
];

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-app)]">
      <SkipLink />
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      <div className="absolute inset-0 -z-10 grid-pattern mask-fade-b opacity-40" />

      <div
        id="main-content"
        className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative hidden flex-col justify-between p-10 lg:flex"
        >
          <Link to={ROUTES.HOME} aria-label={APP_NAME} className="inline-flex">
            <Logo size="md" />
          </Link>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#7F1D1D]/20 blur-3xl" />
            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#B8860B]/20 blur-3xl" />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
              Trusted by 1,200+ organizers across Nepal
            </div>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Run your local tournament{' '}
              <span className="text-[#7F1D1D] dark:text-[#FCA5A5]">
                like a national one.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Live scoring, fixtures, and broadcast overlays — built for
              cricket, football, volleyball, and basketball organizers across
              Nepal.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <motion.li
                  key={h.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-3 py-2.5 backdrop-blur"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] text-white shadow-sm">
                    <h.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {h.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            All systems operational
          </div>
        </motion.div>

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center justify-between lg:hidden">
            <Link to={ROUTES.HOME} aria-label={APP_NAME}>
              <Logo size="md" />
            </Link>
            <Link
              to={ROUTES.HOME}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
            >
              ← Back home
            </Link>
          </div>

          <div className="my-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mx-auto w-full max-w-md"
            >
              {children}
            </motion.div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} {APP_NAME}
          </p>
        </div>
      </div>
    </div>
  );
};
