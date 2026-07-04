/* eslint-disable react-refresh/only-export-components */
import { ErrorBoundary } from '@shared/components/error/ErrorBoundary';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@store/authStore';

import { Navigate, Route } from 'react-router-dom';

import { lazyPage, withSuspense } from './utils';

const OverlaysPage = lazyPage(
  () => import('@pages/overlays/page'),
  'OverlaysPage',
);
const ScoreboardOverlay = lazyPage(
  () => import('@pages/overlays/scoreboard/[matchId]/page'),
  'ScoreboardOverlay',
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

export const overlayRoutes = (
  <>
    <Route
      path={ROUTES.OVERLAYS}
      element={
        <ErrorBoundary>
          <ProtectedRoute>{withSuspense(OverlaysPage)}</ProtectedRoute>
        </ErrorBoundary>
      }
    />
    <Route
      path={ROUTES.OVERLAY_SCOREBOARD}
      element={<ErrorBoundary>{withSuspense(ScoreboardOverlay)}</ErrorBoundary>}
    />
  </>
);
