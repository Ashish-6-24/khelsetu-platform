/* eslint-disable react-refresh/only-export-components */
import { AuthLayout } from '@core/layouts/AuthLayout';
import { LandingLayout } from '@core/layouts/LandingLayout';
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
  () => import('@routes/landing/page'),
  'LandingPage',
);
const AboutPage = lazyPage(() => import('@routes/about/page'), 'AboutPage');
const ContactPage = lazyPage(
  () => import('@routes/contact/page'),
  'ContactPage',
);
const LoginPage = lazyPage(
  () => import('@routes/auth/login/page'),
  'LoginPage',
);
const RegisterPage = lazyPage(
  () => import('@routes/auth/register/page'),
  'RegisterPage',
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
  </>
);
