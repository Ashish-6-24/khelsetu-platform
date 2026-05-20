import { logger } from '@lib/logger';

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
};

export const analyticsService = {
  track: (event: AnalyticsEvent): void => {
    const eventData = {
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString(),
    };

    logger.debug('Analytics event:', eventData);

    if (import.meta.env.PROD) {
      // Production analytics integration
      // e.g., Google Analytics, Mixpanel, etc.
    }
  },

  pageView: (page: string, properties?: Record<string, unknown>): void => {
    analyticsService.track({
      name: 'page_view',
      properties: { page, ...properties },
    });
  },

  userAction: (action: string, properties?: Record<string, unknown>): void => {
    analyticsService.track({
      name: 'user_action',
      properties: { action, ...properties },
    });
  },

  error: (error: Error, context?: Record<string, unknown>): void => {
    analyticsService.track({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        ...context,
      },
    });
  },

  performance: (metric: string, value: number, unit = 'ms'): void => {
    analyticsService.track({
      name: 'performance',
      properties: { metric, value, unit },
    });
  },
};
