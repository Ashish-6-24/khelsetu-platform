/* eslint-disable react-refresh/only-export-components */
import { DashboardLayout } from '@app/layouts/DashboardLayout';
import { ROUTES } from '@shared/utils/constants';
import { useAuthStore } from '@store/authStore';

import { Navigate, Route } from 'react-router-dom';

import { lazyPage, withSuspense } from './utils';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
};

const DashboardPage = lazyPage(
  () => import('@pages/dashboard/page'),
  'DashboardPage',
);
const TournamentsPage = lazyPage(
  () => import('@pages/tournaments/page'),
  'TournamentsPage',
);
const TeamsPage = lazyPage(() => import('@pages/teams/page'), 'TeamsPage');
const TournamentCreatePage = lazyPage(
  () => import('@pages/tournaments/create/page'),
  'TournamentCreatePage',
);
const TournamentDetailPage = lazyPage(
  () => import('@pages/tournaments/[id]/page'),
  'TournamentDetailPage',
);
const TournamentEditPage = lazyPage(
  () => import('@pages/tournaments/[id]/edit/page'),
  'TournamentEditPage',
);
const TournamentBracketPage = lazyPage(
  () => import('@pages/tournaments/[id]/bracket/page'),
  'TournamentBracketPage',
);
const TeamDetailPage = lazyPage(
  () => import('@pages/teams/[id]/page'),
  'TeamDetailPage',
);
const ScoringPage = lazyPage(
  () => import('@pages/scoring/page'),
  'ScoringPage',
);
const ScoringMatchPage = lazyPage(
  () => import('@pages/scoring/[matchId]/page'),
  'ScoringMatchPage',
);
const StandingsPage = lazyPage(
  () => import('@pages/standings/page'),
  'StandingsPage',
);
const NotificationsPage = lazyPage(
  () => import('@pages/notifications/page'),
  'NotificationsPage',
);
const PlayersPage = lazyPage(
  () => import('@pages/players/page'),
  'PlayersPage',
);
const PlayerDetailPage = lazyPage(
  () => import('@pages/players/[id]/page'),
  'PlayerDetailPage',
);
const PlayerEditPage = lazyPage(
  () => import('@pages/players/[id]/edit/page'),
  'PlayerEditPage',
);
const AnalyticsPage = lazyPage(
  () => import('@pages/analytics/page'),
  'AnalyticsPage',
);
const BillingPage = lazyPage(
  () => import('@pages/billing/page'),
  'BillingPage',
);
const OfflineSyncPage = lazyPage(
  () => import('@pages/offline-sync/page'),
  'OfflineSyncPage',
);
const AccessibilityPage = lazyPage(
  () => import('@pages/accessibility/page'),
  'AccessibilityPage',
);
const SearchPage = lazyPage(() => import('@pages/search/page'), 'SearchPage');
const ReportsPage = lazyPage(
  () => import('@pages/reports/page'),
  'ReportsPage',
);
const UserRolesPage = lazyPage(
  () => import('@pages/user-roles/page'),
  'UserRolesPage',
);
const I18nPage = lazyPage(() => import('@pages/i18n/page'), 'I18nPage');
const LiveBroadcastPage = lazyPage(
  () => import('@pages/live-broadcast/page'),
  'LiveBroadcastPage',
);
const MediaPage = lazyPage(() => import('@pages/media/page'), 'MediaPage');
const SchedulePage = lazyPage(
  () => import('@pages/schedule/page'),
  'SchedulePage',
);
const VenuesPage = lazyPage(() => import('@pages/venues/page'), 'VenuesPage');
const CommunicationPage = lazyPage(
  () => import('@pages/communication/page'),
  'CommunicationPage',
);
const AuditLogPage = lazyPage(
  () => import('@pages/audit-log/page'),
  'AuditLogPage',
);
const DataImportPage = lazyPage(
  () => import('@pages/data-import/page'),
  'DataImportPage',
);
const SettingsPage = lazyPage(
  () => import('@pages/settings/page'),
  'SettingsPage',
);
const NewsPage = lazyPage(() => import('@pages/news/page'), 'NewsPage');
const NewsDetailPage = lazyPage(
  () => import('@pages/news/[id]/page'),
  'NewsDetailPage',
);
const CertificatesPage = lazyPage(
  () => import('@pages/certificates/page'),
  'CertificatesPage',
);
const FormationPage = lazyPage(
  () => import('@pages/formation/[matchId]/page'),
  'FormationPage',
);
const LiveEventCenterPage = lazyPage(
  () => import('@pages/live-events/[matchId]/page'),
  'LiveEventCenterPage',
);
const MatchStatisticsPage = lazyPage(
  () => import('@pages/match-statistics/[matchId]/page'),
  'MatchStatisticsPage',
);
const MatchReportPage = lazyPage(
  () => import('@pages/match-reports/[matchId]/page'),
  'MatchReportPage',
);
const MediaGalleryPage = lazyPage(
  () => import('@pages/media-gallery/page'),
  'MediaGalleryPage',
);

export const dashboardRoutes = (
  <>
    <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardLayout>{withSuspense(DashboardPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TOURNAMENTS} element={<ProtectedRoute><DashboardLayout>{withSuspense(TournamentsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TOURNAMENT_CREATE} element={<ProtectedRoute><DashboardLayout>{withSuspense(TournamentCreatePage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TOURNAMENT_DETAIL} element={<ProtectedRoute><DashboardLayout>{withSuspense(TournamentDetailPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TOURNAMENT_EDIT} element={<ProtectedRoute><DashboardLayout>{withSuspense(TournamentEditPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TOURNAMENT_BRACKET} element={<ProtectedRoute><DashboardLayout>{withSuspense(TournamentBracketPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TEAMS} element={<ProtectedRoute><DashboardLayout>{withSuspense(TeamsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.TEAM_DETAIL} element={<ProtectedRoute><DashboardLayout>{withSuspense(TeamDetailPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.SCORING} element={<ProtectedRoute><DashboardLayout>{withSuspense(ScoringPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.SCORING_MATCH} element={<ProtectedRoute><DashboardLayout>{withSuspense(ScoringMatchPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.STANDINGS} element={<ProtectedRoute><DashboardLayout>{withSuspense(StandingsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.NOTIFICATIONS} element={<ProtectedRoute><DashboardLayout>{withSuspense(NotificationsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.PLAYERS} element={<ProtectedRoute><DashboardLayout>{withSuspense(PlayersPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.PLAYER_DETAIL} element={<ProtectedRoute><DashboardLayout>{withSuspense(PlayerDetailPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.PLAYER_EDIT} element={<ProtectedRoute><DashboardLayout>{withSuspense(PlayerEditPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.ANALYTICS} element={<ProtectedRoute><DashboardLayout>{withSuspense(AnalyticsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.BILLING} element={<ProtectedRoute><DashboardLayout>{withSuspense(BillingPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.OFFLINE_SYNC} element={<ProtectedRoute><DashboardLayout>{withSuspense(OfflineSyncPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.ACCESSIBILITY} element={<ProtectedRoute><DashboardLayout>{withSuspense(AccessibilityPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.SEARCH} element={<ProtectedRoute><DashboardLayout>{withSuspense(SearchPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.REPORTS} element={<ProtectedRoute><DashboardLayout>{withSuspense(ReportsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.USER_ROLES} element={<ProtectedRoute><DashboardLayout>{withSuspense(UserRolesPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.I18N} element={<ProtectedRoute><DashboardLayout>{withSuspense(I18nPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.LIVE_BROADCAST} element={<ProtectedRoute><DashboardLayout>{withSuspense(LiveBroadcastPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.MEDIA} element={<ProtectedRoute><DashboardLayout>{withSuspense(MediaPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.SCHEDULE} element={<ProtectedRoute><DashboardLayout>{withSuspense(SchedulePage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.VENUES} element={<ProtectedRoute><DashboardLayout>{withSuspense(VenuesPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.COMMUNICATION} element={<ProtectedRoute><DashboardLayout>{withSuspense(CommunicationPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.AUDIT_LOG} element={<ProtectedRoute><DashboardLayout>{withSuspense(AuditLogPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.DATA_IMPORT} element={<ProtectedRoute><DashboardLayout>{withSuspense(DataImportPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><DashboardLayout>{withSuspense(SettingsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.NEWS} element={<ProtectedRoute><DashboardLayout>{withSuspense(NewsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.NEWS_DETAIL} element={<ProtectedRoute><DashboardLayout>{withSuspense(NewsDetailPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.CERTIFICATES} element={<ProtectedRoute><DashboardLayout>{withSuspense(CertificatesPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.FORMATION} element={<ProtectedRoute><DashboardLayout>{withSuspense(FormationPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.LIVE_EVENTS} element={<ProtectedRoute><DashboardLayout>{withSuspense(LiveEventCenterPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.MATCH_STATISTICS} element={<ProtectedRoute><DashboardLayout>{withSuspense(MatchStatisticsPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.MATCH_REPORTS} element={<ProtectedRoute><DashboardLayout>{withSuspense(MatchReportPage)}</DashboardLayout></ProtectedRoute>} />
    <Route path={ROUTES.MEDIA_GALLERY} element={<ProtectedRoute><DashboardLayout>{withSuspense(MediaGalleryPage)}</DashboardLayout></ProtectedRoute>} />
  </>
);
