import { ROUTES } from '@shared/utils/constants';
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
      {
        name: 'Tournaments',
        href: ROUTES.TOURNAMENTS,
        icon: Trophy,
        preload: preloadRoute(
          () => import('@features/tournaments/pages/TournamentsPage'),
        ),
      },
      {
        name: 'Standings',
        href: ROUTES.STANDINGS,
        icon: ListTree,
      },
      {
        name: 'Schedule',
        href: ROUTES.SCHEDULE,
        icon: Calendar,
      },
      {
        name: 'Scoring',
        href: ROUTES.SCORING,
        icon: Zap,
        preload: preloadRoute(
          () => import('@features/scoring/pages/ScoringPage'),
        ),
      },
      {
        name: 'News',
        href: ROUTES.NEWS,
        icon: FileText,
      },
    ],
  },
  {
    title: 'Manage',
    items: [
      {
        name: 'Teams',
        href: ROUTES.TEAMS,
        icon: Users,
      },
      {
        name: 'Players',
        href: ROUTES.PLAYERS,
        icon: Shield,
      },
      {
        name: 'Venues',
        href: ROUTES.VENUES,
        icon: MapPin,
      },
      {
        name: 'Certificates',
        href: ROUTES.CERTIFICATES,
        icon: Award,
      },
      {
        name: 'Media Gallery',
        href: ROUTES.MEDIA_GALLERY,
        icon: Database,
      },
    ],
  },
  {
    title: 'Insights',
    items: [
      {
        name: 'Analytics',
        href: ROUTES.ANALYTICS,
        icon: BarChart3,
      },
      {
        name: 'Reports',
        href: ROUTES.REPORTS,
        icon: FileText,
      },
    ],
  },
  {
    title: 'Broadcast',
    items: [
      {
        name: 'Live Broadcast',
        href: ROUTES.LIVE_BROADCAST,
        icon: Video,
      },
      {
        name: 'Overlays',
        href: ROUTES.OVERLAYS,
        icon: Eye,
      },
    ],
  },
  {
    title: 'Workspace',
    items: [
      {
        name: 'Notifications',
        href: ROUTES.NOTIFICATIONS,
        icon: Bell,
      },
      {
        name: 'Messages',
        href: ROUTES.COMMUNICATION,
        icon: MessageSquare,
      },
      {
        name: 'Search',
        href: ROUTES.SEARCH,
        icon: ClipboardList,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        name: 'Billing',
        href: ROUTES.BILLING,
        icon: DollarSign,
      },
      {
        name: 'User Roles',
        href: ROUTES.USER_ROLES,
        icon: Shield,
      },
      {
        name: 'Audit Log',
        href: ROUTES.AUDIT_LOG,
        icon: ClipboardList,
      },
      {
        name: 'Data Import',
        href: ROUTES.DATA_IMPORT,
        icon: Upload,
      },
      {
        name: 'Languages',
        href: ROUTES.I18N,
        icon: Languages,
      },
      {
        name: 'Offline Sync',
        href: ROUTES.OFFLINE_SYNC,
        icon: Wifi,
      },
      {
        name: 'Settings',
        href: ROUTES.SETTINGS,
        icon: Settings,
      },
      {
        name: 'Media',
        href: ROUTES.MEDIA,
        icon: Database,
      },
    ],
  },
];
