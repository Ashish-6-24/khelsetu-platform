import { useAuth } from '@features/auth/useAuth';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Logo } from '@shared/components/ui/Logo';
import { useToast } from '@shared/components/ui/toast-context';
import { ROUTES } from '@shared/utils/constants';
import { Lock, Mail, User as UserIcon } from 'lucide-react';

import { useState } from 'react';

import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name) e.name = 'Name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Use at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const res = await register({ name, email, password });
    setIsLoading(false);
    if (res.success) {
      addToast({
        type: 'success',
        title: 'Account created',
        message: 'Welcome aboard! Setting up your workspace…',
      });
    } else {
      const msg =
        (res.error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (res.error as { message?: string })?.message ||
        'Please try again in a moment.';
      addToast({
        type: 'error',
        title: 'Could not create account',
        message: msg,
      });
    }
  };

  return (
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-xl)] sm:p-9">
      <div className="lg:hidden mb-6 flex justify-center">
        <Logo size="md" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)] dark:text-slate-400">
        Start managing world-class tournaments in minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Organizer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<UserIcon className="h-4 w-4" />}
          error={errors.name}
          required
        />
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@organizer.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          helperText="Use 8+ characters with a mix of letters, numbers & symbols."
          error={errors.password}
          required
        />

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-800"
          />
          <span>
            I agree to the{' '}
            <a
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              href="#"
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <Button type="submit" isLoading={isLoading} fullWidth size="lg">
          {isLoading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
