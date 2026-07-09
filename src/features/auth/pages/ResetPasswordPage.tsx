import { authService } from '@features/auth/services/auth';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Logo } from '@shared/ui/Logo';
import { useToast } from '@shared/ui/toast-context';
import { ROUTES } from '@shared/utils/constants';
import { Lock } from 'lucide-react';

import { useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!token || password !== confirmPassword || password.length < 8) return;
    setIsLoading(true);
    try {
      await authService.resetPassword(token, password);
      setReset(true);
    } catch {
      addToast({
        type: 'error',
        title: 'Reset failed',
        message: 'The reset link may have expired. Request a new one.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9 text-center">
        <Logo size="md" className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Invalid link</h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          This password reset link is invalid or expired.
        </p>
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="mt-6 inline-block text-sm font-semibold text-[var(--text-link)] hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (reset) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9 text-center">
        <Logo size="md" className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Password updated</h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Your password has been reset successfully.
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-block text-sm font-semibold text-[var(--text-link)] hover:underline"
        >
          Sign in with new password
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9">
      <Logo size="md" className="mx-auto mb-6" />
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Set new password</h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Choose a strong password for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          error={
            confirmPassword && password !== confirmPassword
              ? 'Passwords do not match'
              : undefined
          }
          required
        />
        <Button
          type="submit"
          disabled={isLoading || password.length < 8 || password !== confirmPassword}
          isLoading={isLoading}
          fullWidth
          size="lg"
        >
          {isLoading ? 'Resetting…' : 'Reset password'}
        </Button>
      </form>
    </div>
  );
};
