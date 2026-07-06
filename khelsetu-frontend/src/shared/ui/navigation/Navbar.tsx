import { Button } from '@shared/ui/Button';
import { Logo } from '@shared/ui/Logo';
import { ROUTES } from '@shared/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { AnchorLink } from './AnchorLink';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Sports', href: '#sports' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Contact', href: ROUTES.CONTACT },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] shadow-[var(--shadow-sm)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.HOME}
          aria-label="KhelSetu home"
          className="flex items-center"
        >
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) =>
            l.href.startsWith('#') ? (
              <AnchorLink
                key={l.name}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-sunken)]/70 hover:text-[var(--text-primary)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-sunken)]/60 dark:hover:text-[var(--text-primary)]"
              >
                {l.name}
              </AnchorLink>
            ) : (
              <Link
                key={l.name}
                to={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-sunken)]/70 hover:text-[var(--text-primary)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-sunken)]/60 dark:hover:text-[var(--text-primary)]"
              >
                {l.name}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button
              variant="create"
              size="sm"
              rightIcon={<span aria-hidden>→</span>}
            >
              Get started
            </Button>
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-sunken)] md:hidden dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-sunken)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((l) =>
                l.href.startsWith('#') ? (
                  <AnchorLink
                    key={l.name}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-sunken)]"
                  >
                    {l.name}
                  </AnchorLink>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-sunken)] dark:text-[var(--text-primary)] dark:hover:bg-[var(--bg-surface-sunken)]"
                  >
                    {l.name}
                  </Link>
                ),
              )}
              <div className="mt-3 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3">
                <Link to={ROUTES.LOGIN} onClick={() => setOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} onClick={() => setOpen(false)}>
                  <Button variant="create" fullWidth>
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
