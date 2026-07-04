import { ErrorBoundary } from '@shared/components/error/ErrorBoundary';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@store/authStore';

import { Navigate, Route, Routes } from 'react-router-dom';

import { dashboardRoutes } from './dashboardRoutes';
import { overlayRoutes } from './overlayRoutes';
import { publicRoutes } from './publicRoutes';
import { lazyPage, withSuspense } from './utils';

const NotFoundPage = lazyPage(
  () => import('@pages/not-found/page'),
  'NotFoundPage',
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes}
      {dashboardRoutes}
      {overlayRoutes}
      <Route path="*" element={withSuspense(NotFoundPage)} />
    </Routes>
  );
};

export { ProtectedRoute };
