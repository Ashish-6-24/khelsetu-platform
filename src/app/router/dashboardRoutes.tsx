/* eslint-disable react-refresh/only-export-components */
import { DashboardLayout } from '@app/layouts/DashboardLayout';
import type { UserRole } from '@shared/types/auth';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@state/authStore';

import { Navigate, Route } from 'react-router-dom';

import { lazyPage, withSuspense } from './utils';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
};

const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) => {
  const user = useAuthStore((state) => state.user);
  if (!allowedRoles.includes(user?.role ?? 'viewer')) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
};

const DashboardPage = lazyPage(
  () => import('@features/dashboard/pages/DashboardPage'),
  'DashboardPage',
);
const TournamentsPage = lazyPage(
  () => import('@features/tournaments/pages/TournamentsPage'),
  'TournamentsPage',
);
const TeamsPage = lazyPage(
  () => import('@features/teams/pages/TeamsPage'),
  'TeamsPage',
);
const TournamentCreatePage = lazyPage(
  () => import('@features/tournaments/pages/TournamentCreatePage'),
  'TournamentCreatePage',
);
const TournamentDetailPage = lazyPage(
  () => import('@features/tournaments/pages/TournamentDetailPage'),
  'TournamentDetailPage',
);
const TournamentEditPage = lazyPage(
  () => import('@features/tournaments/pages/TournamentEditPage'),
  'TournamentEditPage',
);
const TournamentBracketPage = lazyPage(
  () => import('@features/tournaments/pages/TournamentBracketPage'),
  'TournamentBracketPage',
);
const TeamDetailPage = lazyPage(
  () => import('@features/teams/pages/TeamDetailPage'),
  'TeamDetailPage',
);
const ScoringPage = lazyPage(
  () => import('@features/scoring/pages/ScoringPage'),
  'ScoringPage',
);
const ScoringMatchPage = lazyPage(
  () => import('@features/scoring/pages/ScoringMatchPage'),
  'ScoringMatchPage',
);
const StandingsPage = lazyPage(
  () => import('@features/standings/pages/StandingsPage'),
  'StandingsPage',
);
const NotificationsPage = lazyPage(
  () => import('@features/notifications/pages/NotificationsPage'),
  'NotificationsPage',
);
const PlayersPage = lazyPage(
  () => import('@features/players/pages/PlayersPage'),
  'PlayersPage',
);
const PlayerDetailPage = lazyPage(
  () => import('@features/players/pages/PlayerDetailPage'),
  'PlayerDetailPage',
);
const PlayerEditPage = lazyPage(
  () => import('@features/players/pages/PlayerEditPage'),
  'PlayerEditPage',
);
const AnalyticsPage = lazyPage(
  () => import('@features/statistics/pages/AnalyticsPage'),
  'AnalyticsPage',
);
const BillingPage = lazyPage(
  () => import('@features/billing/pages/BillingPage'),
  'BillingPage',
);
const OfflineSyncPage = lazyPage(
  () => import('@features/offline-sync/pages/OfflineSyncPage'),
  'OfflineSyncPage',
);
const AccessibilityPage = lazyPage(
  () => import('@features/accessibility/pages/AccessibilityPage'),
  'AccessibilityPage',
);
const SearchPage = lazyPage(
  () => import('@features/search/pages/SearchPage'),
  'SearchPage',
);
const ReportsPage = lazyPage(
  () => import('@features/reports/pages/ReportsPage'),
  'ReportsPage',
);
const UserRolesPage = lazyPage(
  () => import('@features/access-control/pages/AccessControlPage'),
  'UserRolesPage',
);
const I18nPage = lazyPage(
  () => import('@features/i18n/pages/I18nPage'),
  'I18nPage',
);
const LiveBroadcastPage = lazyPage(
  () => import('@features/broadcast/pages/BroadcastPage'),
  'LiveBroadcastPage',
);
const MediaPage = lazyPage(
  () => import('@features/media-gallery/pages/MediaPage'),
  'MediaPage',
);
const SchedulePage = lazyPage(
  () => import('@features/tournaments/pages/SchedulePage'),
  'SchedulePage',
);
const VenuesPage = lazyPage(
  () => import('@features/venues/pages/VenuesPage'),
  'VenuesPage',
);
const CommunicationPage = lazyPage(
  () => import('@features/notifications/pages/MessagesPage'),
  'CommunicationPage',
);
const AuditLogPage = lazyPage(
  () => import('@features/access-control/pages/AuditLogsPage'),
  'AuditLogPage',
);
const DataImportPage = lazyPage(
  () => import('@features/offline-sync/pages/DataImportPage'),
  'DataImportPage',
);
const SettingsPage = lazyPage(
  () => import('@features/auth/pages/SettingsPage'),
  'SettingsPage',
);
const NewsPage = lazyPage(
  () => import('@features/news/pages/NewsPage'),
  'NewsPage',
);
const NewsDetailPage = lazyPage(
  () => import('@features/news/pages/NewsArticlePage'),
  'NewsDetailPage',
);
const CertificatesPage = lazyPage(
  () => import('@features/certificates/pages/CertificatesPage'),
  'CertificatesPage',
);
const FormationPage = lazyPage(
  () => import('@features/formation/pages/FormationPage'),
  'FormationPage',
);
const LiveEventCenterPage = lazyPage(
  () => import('@features/events/pages/MatchEventsPage'),
  'LiveEventCenterPage',
);
const MatchStatisticsPage = lazyPage(
  () => import('@features/statistics/pages/MatchStatisticsPage'),
  'MatchStatisticsPage',
);
const MatchReportPage = lazyPage(
  () => import('@features/reports/pages/MatchReportPage'),
  'MatchReportPage',
);
const MediaGalleryPage = lazyPage(
  () => import('@features/media-gallery/pages/MediaGalleryPage'),
  'MediaGalleryPage',
);

export const dashboardRoutes = (
  <>
    <Route
      path={ROUTES.DASHBOARD}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(DashboardPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TOURNAMENTS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(TournamentsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TOURNAMENT_CREATE}
      element={
        <ProtectedRoute>
          <DashboardLayout>
            {withSuspense(TournamentCreatePage)}
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TOURNAMENT_DETAIL}
      element={
        <ProtectedRoute>
          <DashboardLayout>
            {withSuspense(TournamentDetailPage)}
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TOURNAMENT_EDIT}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(TournamentEditPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TOURNAMENT_BRACKET}
      element={
        <ProtectedRoute>
          <DashboardLayout>
            {withSuspense(TournamentBracketPage)}
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TEAMS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(TeamsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.TEAM_DETAIL}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(TeamDetailPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.SCORING}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(ScoringPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.SCORING_MATCH}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(ScoringMatchPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.STANDINGS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(StandingsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.NOTIFICATIONS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(NotificationsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.PLAYERS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(PlayersPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.PLAYER_DETAIL}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(PlayerDetailPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.PLAYER_EDIT}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(PlayerEditPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.ANALYTICS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(AnalyticsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.BILLING}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['admin', 'organizer']}>
            <DashboardLayout>{withSuspense(BillingPage)}</DashboardLayout>
          </RoleGuard>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.OFFLINE_SYNC}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(OfflineSyncPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.ACCESSIBILITY}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(AccessibilityPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.SEARCH}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(SearchPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.REPORTS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(ReportsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.USER_ROLES}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['admin']}>
            <DashboardLayout>{withSuspense(UserRolesPage)}</DashboardLayout>
          </RoleGuard>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.I18N}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['admin']}>
            <DashboardLayout>{withSuspense(I18nPage)}</DashboardLayout>
          </RoleGuard>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.LIVE_BROADCAST}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(LiveBroadcastPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.MEDIA}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(MediaPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.SCHEDULE}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(SchedulePage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.VENUES}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(VenuesPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.COMMUNICATION}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(CommunicationPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.AUDIT_LOG}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['admin']}>
            <DashboardLayout>{withSuspense(AuditLogPage)}</DashboardLayout>
          </RoleGuard>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.DATA_IMPORT}
      element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['admin', 'organizer']}>
            <DashboardLayout>{withSuspense(DataImportPage)}</DashboardLayout>
          </RoleGuard>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.SETTINGS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(SettingsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.NEWS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(NewsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.NEWS_DETAIL}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(NewsDetailPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.CERTIFICATES}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(CertificatesPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.FORMATION}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(FormationPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.LIVE_EVENTS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(LiveEventCenterPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.MATCH_STATISTICS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(MatchStatisticsPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.MATCH_REPORTS}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(MatchReportPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTES.MEDIA_GALLERY}
      element={
        <ProtectedRoute>
          <DashboardLayout>{withSuspense(MediaGalleryPage)}</DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
