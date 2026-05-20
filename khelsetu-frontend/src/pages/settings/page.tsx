import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { useToast } from '@components/ui/useToast';
import { authService } from '@services/api/auth';
import { useAuthStore } from '@store/authStore';
import type { User } from '@types-domain/auth';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Moon, Phone, Save, Sun, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z.string().regex(/^\+?[\d\s-]{7,15}$/, 'Invalid phone number').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { addToast } = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
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
                <Button
                  type="submit"
                  isLoading={isProfileSubmitting}
                  disabled={isProfileSubmitting}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
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
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(true)}
            >
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
                  <Button
                    type="submit"
                    isLoading={isPasswordSubmitting}
                    disabled={isPasswordSubmitting}
                  >
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
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
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle dark theme
                </p>
              </div>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  document.documentElement.classList.toggle('dark');
                }}
                className={clsx(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  darkMode
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600',
                )}
              >
                <span
                  className={clsx(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    darkMode ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
