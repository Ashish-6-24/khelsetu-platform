import { ROUTES } from '@utils/constants';
import {
  Award,
  BarChart3,
  Bell,
  Calendar,
  ClipboardList,
  Database,
  DollarSign,
  Eye,
  FileText,
  Languages,
  LayoutDashboard,
  ListTree,
  type LucideIcon,
  MapPin,
  MessageSquare,
  Settings,
  Shield,
  Trophy,
  Upload,
  Users,
  Video,
  Wifi,
  Zap,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  preload?: () => Promise<unknown>;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

const preloadRoute = (importFn: () => Promise<unknown>) => {
  let promise: Promise<unknown> | null = null;
  return () => {
    promise ??= importFn();
    return promise;
  };
};

/**
 * Source of truth for the app's navigation IA. The desktop <Sidebar />,
 * the mobile drawer, and the command palette all consume this.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    ],
  },
  {
    title: 'Compete',
    items: [
      { name: 'Tournaments', href: ROUTES.TOURNAMENTS, icon: Trophy, preload: preloadRoute(() => import('@pages/tournaments/page')) },
      { name: 'Standings', href: ROUTES.STANDINGS, icon: ListTree, preload: preloadRoute(() => import('@pages/standings/page')) },
      { name: 'Schedule', href: ROUTES.SCHEDULE, icon: Calendar, preload: preloadRoute(() => import('@pages/schedule/page')) },
      { name: 'Scoring', href: ROUTES.SCORING, icon: Zap, preload: preloadRoute(() => import('@pages/scoring/page')) },
      { name: 'News', href: ROUTES.NEWS, icon: FileText, preload: preloadRoute(() => import('@pages/news/page')) },
    ],
  },
  {
    title: 'Manage',
    items: [
      { name: 'Teams', href: ROUTES.TEAMS, icon: Users, preload: preloadRoute(() => import('@pages/teams/page')) },
      { name: 'Players', href: ROUTES.PLAYERS, icon: Shield, preload: preloadRoute(() => import('@pages/players/page')) },
      { name: 'Venues', href: ROUTES.VENUES, icon: MapPin, preload: preloadRoute(() => import('@pages/venues/page')) },
      { name: 'Certificates', href: ROUTES.CERTIFICATES, icon: Award, preload: preloadRoute(() => import('@pages/certificates/page')) },
      { name: 'Media Gallery', href: ROUTES.MEDIA_GALLERY, icon: Database, preload: preloadRoute(() => import('@pages/media-gallery/page')) },
    ],
  },
  {
    title: 'Insights',
    items: [
      { name: 'Analytics', href: ROUTES.ANALYTICS, icon: BarChart3, preload: preloadRoute(() => import('@pages/analytics/page')) },
      { name: 'Reports', href: ROUTES.REPORTS, icon: FileText, preload: preloadRoute(() => import('@pages/reports/page')) },
    ],
  },
  {
    title: 'Broadcast',
    items: [
      { name: 'Live Broadcast', href: ROUTES.LIVE_BROADCAST, icon: Video, preload: preloadRoute(() => import('@pages/live-broadcast/page')) },
      { name: 'Overlays', href: ROUTES.OVERLAYS, icon: Eye, preload: preloadRoute(() => import('@pages/overlays/page')) },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { name: 'Notifications', href: ROUTES.NOTIFICATIONS, icon: Bell, preload: preloadRoute(() => import('@pages/notifications/page')) },
      { name: 'Messages', href: ROUTES.COMMUNICATION, icon: MessageSquare, preload: preloadRoute(() => import('@pages/communication/page')) },
      { name: 'Search', href: ROUTES.SEARCH, icon: ClipboardList, preload: preloadRoute(() => import('@pages/search/page')) },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Billing', href: ROUTES.BILLING, icon: DollarSign, preload: preloadRoute(() => import('@pages/billing/page')) },
      { name: 'User Roles', href: ROUTES.USER_ROLES, icon: Shield, preload: preloadRoute(() => import('@pages/user-roles/page')) },
      { name: 'Audit Log', href: ROUTES.AUDIT_LOG, icon: ClipboardList, preload: preloadRoute(() => import('@pages/audit-log/page')) },
      { name: 'Data Import', href: ROUTES.DATA_IMPORT, icon: Upload, preload: preloadRoute(() => import('@pages/data-import/page')) },
      { name: 'Languages', href: ROUTES.I18N, icon: Languages, preload: preloadRoute(() => import('@pages/i18n/page')) },
      { name: 'Offline Sync', href: ROUTES.OFFLINE_SYNC, icon: Wifi, preload: preloadRoute(() => import('@pages/offline-sync/page')) },
      { name: 'Settings', href: ROUTES.SETTINGS, icon: Settings, preload: preloadRoute(() => import('@pages/settings/page')) },
      { name: 'Media', href: ROUTES.MEDIA, icon: Database, preload: preloadRoute(() => import('@pages/media/page')) },
    ],
  },
];
