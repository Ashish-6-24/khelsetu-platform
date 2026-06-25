import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { LanguageToggle } from '@components/ui/LanguageToggle';
import { Logo } from '@components/ui/Logo';
import { useToast } from '@components/ui/toast-context';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@utils/constants';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const res = await login({ email, password });
    setIsLoading(false);
    if (res.success) {
      addToast({
        type: 'success',
        title: 'Welcome back!',
        message: 'Signed in successfully. Redirecting…',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Sign in failed',
        message: 'Check your credentials and try again.',
      });
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9">
      <div className="lg:hidden mb-6 flex justify-center">
        <Logo size="md" />
      </div>

      <h1 className="font-display text-3xl font-medium -tracking-[0.01em] text-[var(--text-primary)] sm:text-4xl">
        Welcome back.
      </h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Sign in to manage your tournaments.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@club.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="group inline-flex cursor-pointer items-center gap-2 text-[var(--text-secondary)]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--border-strong)] text-[var(--brand-primary)] transition-colors focus:ring-2 focus:ring-[var(--brand-primary)]/30 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-sunken)]"
            />
            Remember me
          </label>
          <Link
            to="#"
            className="font-medium text-[var(--text-link)] transition-colors hover:text-[var(--brand-primary-hover)]"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          fullWidth
          size="lg"
          className="shine"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[var(--bg-surface)] px-2 text-[var(--text-tertiary)]">
            or
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        size="lg"
        leftIcon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.22-4.74 3.22-8.32z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.83z"
            />
            <path
              fill="#EA4335"
              d="M12 5.4c1.62 0 3.07.56 4.21 1.65l3.15-3.15C17.46 2.1 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.4 12 5.4z"
            />
          </svg>
        }
      >
        Continue with Google
      </Button>

      <div className="mt-7 flex items-center justify-center gap-1.5 text-xs text-[var(--text-tertiary)]">
        <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-success)]" />
        Protected by enterprise-grade security
      </div>

      <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
        New to KhelSetu?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-[var(--text-link)] transition-colors hover:text-[var(--brand-primary-hover)]"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-6 flex justify-center">
        <LanguageToggle size="sm" />
      </div>
    </div>
  );
};
