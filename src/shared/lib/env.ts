const getEnv = () => {
  const env = import.meta.env.VITE_APP_ENV || 'development';
  const isProd = env === 'production';

  const required: string[] = [];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0 && isProd) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  const apiUrl = import.meta.env.VITE_API_URL || '';
  const wsUrl =
    import.meta.env.VITE_WS_URL !== undefined
      ? import.meta.env.VITE_WS_URL
      : 'ws://localhost:8080';

  if (isProd && apiUrl && !apiUrl.startsWith('https://')) {
    throw new Error(
      `VITE_API_URL must use https:// in production. Got: ${apiUrl}`,
    );
  }
  if (isProd && wsUrl && !wsUrl.startsWith('wss://')) {
    throw new Error(`VITE_WS_URL must use wss:// in production. Got: ${wsUrl}`);
  }

  return {
    env,
    apiUrl,
    wsUrl,
    appName: import.meta.env.VITE_APP_NAME || 'KhelSetu',
    isDev: env === 'development',
    isProd,
    isTest: env === 'test',
  } as const;
};

export const env = getEnv();
