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
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  TERMS: '/terms',
  PRIVACY: '/privacy',
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
  NEWS: '/news',
  NEWS_DETAIL: '/news/:id',
  CERTIFICATES: '/certificates',
  FORMATION: '/formation/:matchId',
  LIVE_EVENTS: '/live-events/:matchId',
  MATCH_STATISTICS: '/match-statistics/:matchId',
  MATCH_REPORTS: '/match-reports/:matchId',
  MEDIA_GALLERY: '/media-gallery',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
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
    BY_TOURNAMENT: (tournamentId: string) =>
      `/tournaments/${tournamentId}/teams`,
  },
  PLAYERS: {
    LIST: '/players',
    DETAIL: (id: string) => `/players/${id}`,
    CREATE: '/players',
    UPDATE: (id: string) => `/players/${id}`,
    BY_TEAM: (teamId: string) => `/teams/${teamId}/players`,
  },
  STANDINGS: {
    LIST: (tournamentId: string) => `/tournaments/${tournamentId}/standings`,
    CREATE: (tournamentId: string) => `/tournaments/${tournamentId}/standings`,
    UPDATE: (tournamentId: string, teamId: string) =>
      `/tournaments/${tournamentId}/standings/${teamId}`,
    BULK_CREATE: (tournamentId: string) =>
      `/tournaments/${tournamentId}/standings/bulk`,
  },
  VENUES: {
    LIST: '/venues',
    DETAIL: (id: string) => `/venues/${id}`,
    CREATE: '/venues',
    UPDATE: (id: string) => `/venues/${id}`,
    DELETE: (id: string) => `/venues/${id}`,
  },
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
  NEWS: {
    LIST: '/news',
    DETAIL: (id: string) => `/news/${id}`,
    CREATE: '/news',
    UPDATE: (id: string) => `/news/${id}`,
    DELETE: (id: string) => `/news/${id}`,
  },
  CONTACT: {
    SEND: '/contact',
  },
  CERTIFICATES: {
    GENERATE: '/certificates/generate',
    VERIFY: (id: string) => `/certificates/verify/${id}`,
    LIST: '/certificates',
  },
  FORMATIONS: {
    GET: (matchId: string) => `/formations/${matchId}`,
    SAVE: (matchId: string) => `/formations/${matchId}`,
  },
  MATCH_EVENTS: {
    LIST: (matchId: string) => `/matches/${matchId}/events`,
    CREATE: (matchId: string) => `/matches/${matchId}/events`,
  },
  MATCH_STATISTICS: {
    GET: (matchId: string) => `/matches/${matchId}/statistics`,
  },
  MATCH_REPORTS: {
    GET: (matchId: string) => `/matches/${matchId}/report`,
    GENERATE: (matchId: string) => `/matches/${matchId}/report/generate`,
    UPDATE: (matchId: string) => `/matches/${matchId}/report`,
  },
  MEDIA: {
    LIST: '/media',
    UPLOAD: '/media/upload',
    DELETE: (id: string) => `/media/${id}`,
  },
  BRACKETS: {
    GET: (tournamentId: string) => `/tournaments/${tournamentId}/bracket`,
    SAVE: (tournamentId: string) => `/tournaments/${tournamentId}/bracket`,
    UPDATE_MATCH: (tournamentId: string, matchId: string) =>
      `/tournaments/${tournamentId}/bracket/matches/${matchId}`,
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
