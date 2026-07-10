import { authService } from '@features/auth/services/auth';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Logo } from '@shared/ui/Logo';
import { useToast } from '@shared/ui/toast-context';
import { ROUTES } from '@shared/utils/constants';
import { Mail } from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      addToast({
        type: 'error',
        title: 'Request failed',
        message: 'Could not send reset email. Try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9 text-center">
        <Logo size="md" className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Check your email
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          We sent a password reset link to <strong>{email}</strong>. Check your
          inbox and follow the instructions.
        </p>
        <p className="mt-6 text-xs text-[var(--text-tertiary)]">
          Didn't receive it? Check your spam folder or{' '}
          <button
            type="button"
            onClick={() => setSent(false)}
            className="font-semibold text-[var(--text-link)] hover:underline"
          >
            try again
          </button>
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-block text-sm font-semibold text-[var(--text-link)] hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9">
      <Logo size="md" className="mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@club.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
        <Button
          type="submit"
          disabled={isLoading || !email.trim()}
          isLoading={isLoading}
          fullWidth
          size="lg"
        >
          {isLoading ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Remember your password?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-[var(--text-link)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
