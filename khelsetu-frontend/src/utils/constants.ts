export const APP_NAME = 'KhelSetu';
export const APP_VERSION = '1.0.0';
export const APP_TAGLINE =
  'Production-grade multi-tenant sports tournament management for Nepal';

export const STORAGE_KEYS = {
  THEME: 'khelsetu-theme',
  UI_STATE: 'khelsetu-ui',
  COMMAND_RECENT: 'khelsetu-cmd-recent',
  TOUR_DONE: 'khelsetu-tour-done',
  ONBOARDING_DONE: 'khelsetu-onboarding-done',
  SIDEBAR_COLLAPSED: 'khelsetu-sidebar-collapsed',
} as const;

export const THEME_VALUES = ['light', 'dark', 'system'] as const;
export type ThemeValue = (typeof THEME_VALUES)[number];

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  TOURNAMENTS: '/tournaments',
  TOURNAMENT_CREATE: '/tournaments/create',
  TOURNAMENT_DETAIL: '/tournaments/:id',
  TOURNAMENT_EDIT: '/tournaments/:id/edit',
  TOURNAMENT_BRACKET: '/tournaments/:id/bracket',
  TEAMS: '/teams',
  TEAM_DETAIL: '/teams/:id',
  SCORING: '/scoring',
  SCORING_MATCH: '/scoring/:matchId',
  STANDINGS: '/standings',
  NOTIFICATIONS: '/notifications',
  PLAYERS: '/players',
  PLAYER_DETAIL: '/players/:id',
  PLAYER_EDIT: '/players/:id/edit',
  ANALYTICS: '/analytics',
  BILLING: '/billing',
  OFFLINE_SYNC: '/offline-sync',
  ACCESSIBILITY: '/accessibility',
  SEARCH: '/search',
  REPORTS: '/reports',
  USER_ROLES: '/user-roles',
  I18N: '/i18n',
  LIVE_BROADCAST: '/live-broadcast',
  MEDIA: '/media',
  SCHEDULE: '/schedule',
  VENUES: '/venues',
  COMMUNICATION: '/communication',
  AUDIT_LOG: '/audit-log',
  DATA_IMPORT: '/data-import',
  SETTINGS: '/settings',
  OVERLAYS: '/overlays',
  OVERLAY_SCOREBOARD: '/overlays/scoreboard/:matchId',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  TOURNAMENTS: {
    LIST: '/tournaments',
    DETAIL: (id: string) => `/tournaments/${id}`,
    CREATE: '/tournaments',
    UPDATE: (id: string) => `/tournaments/${id}`,
    DELETE: (id: string) => `/tournaments/${id}`,
  },
  MATCHES: {
    LIST: '/matches',
    DETAIL: (id: string) => `/matches/${id}`,
    CREATE: '/matches',
    UPDATE: (id: string) => `/matches/${id}`,
    SCORE: (id: string) => `/matches/${id}/score`,
  },
  TEAMS: {
    LIST: '/teams',
    DETAIL: (id: string) => `/teams/${id}`,
    CREATE: '/teams',
    UPDATE: (id: string) => `/teams/${id}`,
  },
  PLAYERS: {
    LIST: '/players',
    DETAIL: (id: string) => `/players/${id}`,
    CREATE: '/players',
    UPDATE: (id: string) => `/players/${id}`,
  },
  STANDINGS: (tournamentId: string) => `/tournaments/${tournamentId}/standings`,
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  BILLING: {
    PLANS: '/billing/plans',
    SUBSCRIPTION: '/billing/subscription',
    INVOICES: '/billing/invoices',
    UPDATE_PLAN: '/billing/subscription/update',
    CANCEL_SUBSCRIPTION: '/billing/subscription/cancel',
    PAYMENT_METHODS: '/billing/payment-methods',
  },
} as const;

export const WS_EVENTS = {
  SCORE_UPDATE: 'score_update',
  MATCH_START: 'match_start',
  MATCH_END: 'match_end',
  TOURNAMENT_UPDATE: 'tournament_update',
  STANDINGS_UPDATE: 'standings_update',
  NOTIFICATION: 'notification',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
