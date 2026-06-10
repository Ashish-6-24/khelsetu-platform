import { AuthLayout } from '@app/layouts/AuthLayout';
import { DashboardLayout } from '@app/layouts/DashboardLayout';
import { LandingLayout } from '@app/layouts/LandingLayout';
import { ErrorBoundary } from '@components/error/ErrorBoundary';
import { AboutPage } from '@pages/about/page';
import { AccessibilityPage } from '@pages/accessibility/page';
import { AnalyticsPage } from '@pages/analytics/page';
import { AuditLogPage } from '@pages/audit-log/page';
import { LoginPage } from '@pages/auth/login/page';
import { RegisterPage } from '@pages/auth/register/page';
import { BillingPage } from '@pages/billing/page';
import { CommunicationPage } from '@pages/communication/page';
import { ContactPage } from '@pages/contact/page';
import { DashboardPage } from '@pages/dashboard/page';
import { DataImportPage } from '@pages/data-import/page';
import { I18nPage } from '@pages/i18n/page';
import { LandingPage } from '@pages/landing/page';
import { LiveBroadcastPage } from '@pages/live-broadcast/page';
import { MediaPage } from '@pages/media/page';
import { NotFoundPage } from '@pages/not-found/page';
import { NotificationsPage } from '@pages/notifications/page';
import { OfflineSyncPage } from '@pages/offline-sync/page';
import { OverlaysPage } from '@pages/overlays/page';
import { ScoreboardOverlay } from '@pages/overlays/scoreboard/[matchId]/page';
import { PlayerEditPage } from '@pages/players/[id]/edit/page';
import { PlayerDetailPage } from '@pages/players/[id]/page';
import { PlayersPage } from '@pages/players/page';
import { ReportsPage } from '@pages/reports/page';
import { SchedulePage } from '@pages/schedule/page';
import { ScoringMatchPage } from '@pages/scoring/[matchId]/page';
import { ScoringPage } from '@pages/scoring/page';
import { SearchPage } from '@pages/search/page';
import { SettingsPage } from '@pages/settings/page';
import { StandingsPage } from '@pages/standings/page';
import { TeamDetailPage } from '@pages/teams/[id]/page';
import { TeamsPage } from '@pages/teams/page';
import { TournamentBracketPage } from '@pages/tournaments/[id]/bracket/page';
import { TournamentEditPage } from '@pages/tournaments/[id]/edit/page';
import { TournamentDetailPage } from '@pages/tournaments/[id]/page';
import { TournamentCreatePage } from '@pages/tournaments/create/page';
import { TournamentsPage } from '@pages/tournaments/page';
import { UserRolesPage } from '@pages/user-roles/page';
import { VenuesPage } from '@pages/venues/page';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@utils/constants';

import { Navigate, Route, Routes } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <Routes>
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
            <LandingLayout>
              <AboutPage />
            </LandingLayout>
          </ErrorBoundary>
        }
      />

      <Route
        path={ROUTES.CONTACT}
        element={
          <ErrorBoundary>
            <LandingLayout>
              <ContactPage />
            </LandingLayout>
          </ErrorBoundary>
        }
      />

      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TOURNAMENTS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TournamentsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TOURNAMENT_CREATE}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TournamentCreatePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TOURNAMENT_DETAIL}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TournamentDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TOURNAMENT_EDIT}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TournamentEditPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TOURNAMENT_BRACKET}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TournamentBracketPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TEAMS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TeamsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.TEAM_DETAIL}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TeamDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SCORING}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ScoringPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SCORING_MATCH}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ScoringMatchPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STANDINGS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <StandingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.NOTIFICATIONS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <NotificationsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PLAYERS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlayersPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PLAYER_DETAIL}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlayerDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PLAYER_EDIT}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlayerEditPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ANALYTICS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.BILLING}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BillingPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.OFFLINE_SYNC}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OfflineSyncPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ACCESSIBILITY}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AccessibilityPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SEARCH}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SearchPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.REPORTS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ReportsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.USER_ROLES}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserRolesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.I18N}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <I18nPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.LIVE_BROADCAST}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <LiveBroadcastPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.MEDIA}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MediaPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SCHEDULE}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SchedulePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.VENUES}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <VenuesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.COMMUNICATION}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CommunicationPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.AUDIT_LOG}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AuditLogPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.DATA_IMPORT}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DataImportPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.OVERLAYS}
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <OverlaysPage />
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />

      <Route
        path={ROUTES.OVERLAY_SCOREBOARD}
        element={
          <ErrorBoundary>
            <ScoreboardOverlay />
          </ErrorBoundary>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
