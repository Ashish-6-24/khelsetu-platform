import { Button } from '@shared/components/ui/Button';
import { Logo } from '@shared/components/ui/Logo';
import { ROUTES } from '@shared/utils/constants';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-app)] px-4">
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      <div className="absolute inset-0 -z-10 grid-pattern mask-fade-b opacity-50" />

      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Logo size="md" className="mx-auto justify-center" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 font-display text-9xl font-bold tracking-tighter"
        >
          <span className="gradient-brand-text">404</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
        >
          We couldn&apos;t find that page
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-pretty text-slate-600 dark:text-slate-300"
        >
          The page you&apos;re looking for has moved, been deleted, or never
          existed. Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to={ROUTES.HOME}>
            <Button leftIcon={<Home className="h-4 w-4" />}>Go home</Button>
          </Link>
          <Button
            variant="outline"
            leftIcon={<Search className="h-4 w-4" />}
            onClick={() => navigate(ROUTES.SEARCH)}
          >
            Search
          </Button>
        </motion.div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Go back
        </button>
      </div>
    </div>
  );
};
