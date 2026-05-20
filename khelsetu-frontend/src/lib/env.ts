const getEnv = () => {
  const env = import.meta.env.VITE_APP_ENV || 'development';

  const required = ['VITE_API_URL'];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0 && env === 'production') {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return {
    env,
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8080',
    appName: import.meta.env.VITE_APP_NAME || 'KhelSetu',
    isDev: env === 'development',
    isProd: env === 'production',
    isTest: env === 'test',
  } as const;
};

export const env = getEnv();
