/* eslint-disable react-refresh/only-export-components */
import { AuthLayout } from '@app/layouts/AuthLayout';
import { LandingLayout } from '@app/layouts/LandingLayout';
import { ErrorBoundary } from '@shared/ui/error/ErrorBoundary';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@state/authStore';

import { Navigate, Route } from 'react-router-dom';

import { lazyPage, withSuspense } from './utils';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <>{children}</>;
};

const LandingPage = lazyPage(
  () => import('@features/dashboard/pages/LandingPage'),
  'LandingPage',
);
const AboutPage = lazyPage(
  () => import('@features/dashboard/pages/AboutPage'),
  'AboutPage',
);
const ContactPage = lazyPage(
  () => import('@features/dashboard/pages/ContactPage'),
  'ContactPage',
);
const LoginPage = lazyPage(
  () => import('@features/auth/pages/LoginPage'),
  'LoginPage',
);
const RegisterPage = lazyPage(
  () => import('@features/auth/pages/RegisterPage'),
  'RegisterPage',
);
const ForgotPasswordPage = lazyPage(
  () => import('@features/auth/pages/ForgotPasswordPage'),
  'ForgotPasswordPage',
);
const ResetPasswordPage = lazyPage(
  () => import('@features/auth/pages/ResetPasswordPage'),
  'ResetPasswordPage',
);
const TermsPage = lazyPage(
  () => import('@features/dashboard/pages/TermsPage'),
  'TermsPage',
);
const PrivacyPage = lazyPage(
  () => import('@features/dashboard/pages/PrivacyPage'),
  'PrivacyPage',
);

export const publicRoutes = (
  <>
    <Route
      path={ROUTES.HOME}
      element={
        <ErrorBoundary>
          <LandingLayout>
            <LandingPage />
          </LandingLayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={ROUTES.ABOUT}
      element={
        <ErrorBoundary>
          <LandingLayout>{withSuspense(AboutPage)}</LandingLayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={ROUTES.CONTACT}
      element={
        <ErrorBoundary>
          <LandingLayout>{withSuspense(ContactPage)}</LandingLayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={ROUTES.LOGIN}
      element={
        <PublicRoute>
          <AuthLayout>{withSuspense(LoginPage)}</AuthLayout>
        </PublicRoute>
      }
    />
    <Route
      path={ROUTES.REGISTER}
      element={
        <PublicRoute>
          <AuthLayout>{withSuspense(RegisterPage)}</AuthLayout>
        </PublicRoute>
      }
    />
    <Route
      path={ROUTES.FORGOT_PASSWORD}
      element={
        <PublicRoute>
          <AuthLayout>{withSuspense(ForgotPasswordPage)}</AuthLayout>
        </PublicRoute>
      }
    />
    <Route
      path={ROUTES.RESET_PASSWORD}
      element={
        <PublicRoute>
          <AuthLayout>{withSuspense(ResetPasswordPage)}</AuthLayout>
        </PublicRoute>
      }
    />
    <Route
      path={ROUTES.TERMS}
      element={
        <ErrorBoundary>
          <LandingLayout>{withSuspense(TermsPage)}</LandingLayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={ROUTES.PRIVACY}
      element={
        <ErrorBoundary>
          <LandingLayout>{withSuspense(PrivacyPage)}</LandingLayout>
        </ErrorBoundary>
      }
    />
  </>
);
