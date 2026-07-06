import { authService } from '@features/auth/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeToggleSegmented } from '@shared/components/theme-toggle';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useToast } from '@shared/components/ui/toast-context';
import type { User } from '@shared/types/auth';
import { useAuthStore } from '@store/authStore';
import { useUIStore } from '@store/uiStore';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import {
  Bell,
  Check,
  Lock,
  Mail,
  Moon,
  Palette,
  Phone,
  Save,
  Shield,
  Sun,
  User as UserIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Schemas ──────────────────────────────────────────────────
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

// ─── Toggle Component ─────────────────────────────────────────
const Toggle = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) => (
  <div className="settings-row">
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
      {description && (
        <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
          {description}
        </p>
      )}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="settings-toggle"
    />
  </div>
);

// ─── Section Card ─────────────────────────────────────────────
const SectionCard = ({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={clsx('settings-section', className)}>
    <div className="flex items-start gap-3.5 px-6 pt-6 pb-4">
      <div className="settings-section-icon">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
          {description}
        </p>
      </div>
    </div>
    <div className="px-6 pb-6">{children}</div>
  </div>
);

// ─── Save Button ──────────────────────────────────────────────
const SaveButton = ({
  isLoading,
  hasChanges,
  onSuccess,
  label = 'Save Changes',
}: {
  isLoading: boolean;
  hasChanges: boolean;
  onSuccess?: () => void;
  label?: string;
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const prevLoading = useRef(isLoading);

  useEffect(() => {
    if (prevLoading.current && !isLoading) {
      onSuccess?.();
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      prevLoading.current = isLoading;
      return () => clearTimeout(timer);
    }
    prevLoading.current = isLoading;
  }, [isLoading, onSuccess]);

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={isLoading || (!hasChanges && !showSuccess)}
      isLoading={isLoading}
      leftIcon={
        !isLoading && !showSuccess ? <Save className="h-4 w-4" /> : undefined
      }
      className={clsx(
        'min-w-[160px] transition-all duration-300',
        showSuccess &&
          '!bg-gradient-to-r !from-green-500 !to-green-600 !shadow-green-500/30',
      )}
    >
      {showSuccess ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Saved!
        </>
      ) : isLoading ? (
        'Saving...'
      ) : (
        label
      )}
    </Button>
  );
};

// ─── Page ─────────────────────────────────────────────────────
export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = useUIStore((state) => state.theme);
  const { addToast } = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Track unsaved changes

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: {
      errors: profileErrors,
      isSubmitting: isProfileSubmitting,
      isDirty: isProfileFormDirty,
    },
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
    formState: {
      errors: passwordErrors,
      isSubmitting: isPasswordSubmitting,
      isDirty: isPasswordFormDirty,
    },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const hasUnsavedChanges = isProfileFormDirty || isPasswordFormDirty;

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
    mutationFn: (_data: PasswordFormData) => {
      addToast({
        type: 'warning',
        message: 'Password change is not yet connected to the backend.',
      });
      return Promise.resolve();
    },
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

  const handleResetProfile = useCallback(() => {
    resetProfile({ name: user?.name ?? '', phone: user?.phone ?? '' });
  }, [resetProfile, user?.name, user?.phone]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* ── Sticky Save Bar ── */}
      <div
        className={clsx(
          'settings-save-bar rounded-t-2xl',
          hasUnsavedChanges && 'settings-save-bar--dirty',
        )}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            Settings
          </h1>
          {hasUnsavedChanges && (
            <div className="unsaved-dot" aria-label="Unsaved changes" />
          )}
        </div>
        {hasUnsavedChanges && (
          <SaveButton
            isLoading={isProfileSubmitting || isPasswordSubmitting}
            hasChanges={hasUnsavedChanges}
            onSuccess={() => {
              addToast({
                type: 'success',
                message: 'Changes saved successfully',
              });
            }}
          />
        )}
      </div>

      {/* ── Content ── */}
      <div className="space-y-5 px-1 py-6">
        {/* Profile Card */}
        <SectionCard
          icon={UserIcon}
          title="Profile"
          description="Your personal information and account details"
        >
          {/* Avatar + Name Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="avatar-ring relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-hover, #991b1b)] text-xl font-bold text-white shadow-md">
                {user?.name?.charAt(0).toUpperCase() ?? 'U'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--bg-surface)] bg-emerald-500">
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                {user?.name}
              </p>
              <p className="truncate text-xs text-[var(--text-tertiary)]">
                {user?.email}
              </p>
              <span className="mt-1 inline-flex items-center rounded-md bg-[var(--brand-primary)]/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="space-y-4"
          >
            <Input
              label="Full Name"
              placeholder="Your full name"
              {...registerProfile('name')}
              error={profileErrors.name?.message}
              leftIcon={<UserIcon className="h-4 w-4" />}
            />
            <Input
              label="Email Address"
              value={user?.email}
              disabled
              helperText="Contact support to change your email"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="Phone Number"
              placeholder="+977 98XXXXXXXX"
              {...registerProfile('phone')}
              error={profileErrors.phone?.message}
              leftIcon={<Phone className="h-4 w-4" />}
              optional
            />

            <div className="flex items-center gap-2 pt-2">
              <SaveButton
                isLoading={isProfileSubmitting}
                hasChanges={isProfileFormDirty}
                onSuccess={() =>
                  addToast({
                    type: 'success',
                    message: 'Profile updated successfully',
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleResetProfile}
                disabled={!isProfileFormDirty}
              >
                Reset
              </Button>
            </div>
          </form>
        </SectionCard>

        {/* Security Card */}
        <SectionCard
          icon={Shield}
          title="Security"
          description="Manage your password and account security"
        >
          {!showPasswordForm ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(true)}
              className="flex w-full items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-3 text-left transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-primary)]/8">
                  <Lock className="h-4 w-4 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Password
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Last changed 30+ days ago
                  </p>
                </div>
              </div>
              <svg
                className="h-4 w-4 text-[var(--text-tertiary)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                {...registerPassword('currentPassword')}
                error={passwordErrors.currentPassword?.message}
                leftIcon={<Lock className="h-4 w-4" />}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                {...registerPassword('newPassword')}
                error={passwordErrors.newPassword?.message}
                leftIcon={<Lock className="h-4 w-4" />}
                helperText="Minimum 8 characters"
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                {...registerPassword('confirmPassword')}
                error={passwordErrors.confirmPassword?.message}
                leftIcon={<Lock className="h-4 w-4" />}
              />

              <div className="flex items-center gap-2 pt-2">
                <SaveButton
                  isLoading={isPasswordSubmitting}
                  hasChanges={isPasswordFormDirty}
                  label="Update Password"
                  onSuccess={() => {
                    addToast({
                      type: 'success',
                      message: 'Password updated successfully',
                    });
                    setShowPasswordForm(false);
                    resetPassword();
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    setShowPasswordForm(false);
                    resetPassword();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </SectionCard>

        {/* Preferences Card */}
        <SectionCard
          icon={Palette}
          title="Preferences"
          description="Customize your experience and notifications"
        >
          <div className="space-y-0">
            <Toggle
              checked={emailNotifications}
              onChange={setEmailNotifications}
              label="Email Notifications"
              description="Receive match updates, scores, and tournament news via email"
            />

            <div className="settings-row">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                  {theme === 'dark' ? (
                    <Moon className="h-3.5 w-3.5" />
                  ) : (
                    <Sun className="h-3.5 w-3.5" />
                  )}
                  Appearance
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                  Choose between light, dark, or system theme
                </p>
              </div>
              <ThemeToggleSegmented />
            </div>

            <div className="settings-row">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                  <Bell className="h-3.5 w-3.5" />
                  Push Notifications
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                  Get notified about live match events in real-time
                </p>
              </div>
              <Toggle checked={true} onChange={() => {}} label="" />
            </div>
          </div>
        </SectionCard>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              <Shield className="h-4 w-4 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                Danger Zone
              </h3>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <Button
                type="button"
                variant="danger"
                size="sm"
                className="mt-3"
                onClick={() =>
                  addToast({
                    type: 'warning',
                    message: 'Account deletion is not yet available.',
                  })
                }
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
