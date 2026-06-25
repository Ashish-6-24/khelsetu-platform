import { ThemeToggleSegmented } from '@components/ThemeToggle';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { useToast } from '@components/ui/toast-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@services/api/auth';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { useMutation } from '@tanstack/react-query';
import type { User } from '@types-domain/auth';
import { clsx } from 'clsx';
import {
  Loader2,
  Moon,
  Phone,
  Save,
  Sun,
  User as UserIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useEffect, useState } from 'react';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{7,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

type SaveState = 'idle' | 'loading' | 'success';

const SaveButton = ({
  isLoading,
  onSuccess,
  label = 'Save Changes',
}: {
  isLoading: boolean;
  onSuccess?: () => void;
  label?: string;
}) => {
  const [state, setState] = useState<SaveState>('idle');

  useEffect(() => {
    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState('loading');
    } else if (state === 'loading') {
      setState('success');
      onSuccess?.();
      const timer = setTimeout(() => setState('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, state, onSuccess]);

  return (
    <button
      type="submit"
      disabled={state === 'loading'}
      className={clsx(
        'btn-save shine relative inline-flex items-center justify-center gap-2',
        'rounded-xl px-5 py-2.5 text-sm font-semibold',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7F1D1D]',
        'dark:focus-visible:ring-[#FCA5A5] dark:focus-visible:ring-offset-slate-900',
        'disabled:cursor-not-allowed disabled:opacity-50',
        state === 'success'
          ? 'btn-save-success text-white'
          : 'bg-gradient-to-br from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] text-white shadow-[0_4px_14px_-2px_rgb(153_27_27/0.45)] hover:from-[#991B1B] hover:via-[#7F1D1D] hover:to-[#450A0A] hover:shadow-[0_8px_28px_-4px_rgb(153_27_27/0.55)] hover:brightness-110',
      )}
    >
      {state === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
      {state === 'success' && (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" className="check-draw" />
        </svg>
      )}
      {state === 'idle' && <Save className="h-4 w-4" />}
      {state === 'loading' ? 'Saving…' : state === 'success' ? 'Saved' : label}
    </button>
  );
};

export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = useUIStore((state) => state.theme);
  const { addToast } = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => authService.updateProfile(data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      resetProfile({ name: updatedUser.name, phone: updatedUser.phone ?? '' });
      addToast({ type: 'success', message: 'Profile updated successfully' });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to update profile' });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (_data: PasswordFormData) => Promise.resolve(),
    onSuccess: () => {
      addToast({ type: 'success', message: 'Password updated successfully' });
      resetPassword();
      setShowPasswordForm(false);
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to update password' });
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    updatePasswordMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile Information
            </h3>
            <div className="space-y-4">
              <Input
                label="Name"
                {...registerProfile('name')}
                error={profileErrors.name?.message}
              />
              <Input
                label="Email"
                value={user?.email}
                disabled
                helperText="Email cannot be changed"
              />
              <Input
                label="Phone"
                {...registerProfile('phone')}
                error={profileErrors.phone?.message}
                leftIcon={<Phone className="w-4 h-4" />}
              />
              <div className="flex gap-2">
                <SaveButton
                  isLoading={isProfileSubmitting}
                  onSuccess={() =>
                    addToast({
                      title: 'Profile updated',
                      type: 'success',
                      message: 'Profile updated successfully',
                    })
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => resetProfile()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Security
          </h3>
          {!showPasswordForm ? (
            <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
              Change Password
            </Button>
          ) : (
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  {...registerPassword('currentPassword')}
                  error={passwordErrors.currentPassword?.message}
                />
                <Input
                  label="New Password"
                  type="password"
                  {...registerPassword('newPassword')}
                  error={passwordErrors.newPassword?.message}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  {...registerPassword('confirmPassword')}
                  error={passwordErrors.confirmPassword?.message}
                />
                <div className="flex gap-2">
                  <SaveButton
                    isLoading={isPasswordSubmitting}
                    label="Update Password"
                    onSuccess={() => {
                      addToast({
                        title: 'Password updated',
                        type: 'success',
                        message: 'Password updated successfully',
                      });
                      setShowPasswordForm(false);
                      resetPassword();
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowPasswordForm(false);
                      resetPassword();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email updates for match events
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={clsx(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  emailNotifications
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600',
                )}
              >
                <span
                  className={clsx(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    emailNotifications ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle dark theme
                </p>
              </div>
              <ThemeToggleSegmented />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
