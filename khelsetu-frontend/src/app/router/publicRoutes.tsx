import { AuthLayout } from '@app/layouts/AuthLayout';
import { LandingLayout } from '@app/layouts/LandingLayout';
import { ErrorBoundary } from '@shared/components/error/ErrorBoundary';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@store/authStore';

import { Navigate, Route } from 'react-router-dom';

import { lazyPage, withSuspense } from './utils';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <>{children}</>;
};

const LandingPage = lazyPage(
  () => import('@pages/landing/page'),
  'LandingPage',
);
const AboutPage = lazyPage(() => import('@pages/about/page'), 'AboutPage');
const ContactPage = lazyPage(
  () => import('@pages/contact/page'),
  'ContactPage',
);
const LoginPage = lazyPage(() => import('@pages/auth/login/page'), 'LoginPage');
const RegisterPage = lazyPage(
  () => import('@pages/auth/register/page'),
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
        <PublicRoute><AuthLayout>{withSuspense(LoginPage)}</AuthLayout></PublicRoute>
      }
    />
    <Route
      path={ROUTES.REGISTER}
      element={
        <PublicRoute><AuthLayout>{withSuspense(RegisterPage)}</AuthLayout></PublicRoute>
      }
    />
  </>
);
