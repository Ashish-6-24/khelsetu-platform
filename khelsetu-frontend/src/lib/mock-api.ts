import type { AxiosInstance } from 'axios';

const parseBody = (data: unknown) =>
  typeof data === 'string' ? JSON.parse(data) : data || {};

export const setupMockApi = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    if (config.url?.includes('/auth/register') && config.method === 'post') {
      const { name, email } = parseBody(config.data);
      return new Promise((resolve) => {
        setTimeout(() => {
          config.adapter = () =>
            Promise.resolve({
              data: {
                user: {
                  id: 'mock-user-1',
                  name,
                  email,
                  role: 'organizer' as const,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
                tokens: {
                  accessToken: 'mock-access-token-' + Date.now(),
                  refreshToken: 'mock-refresh-token-' + Date.now(),
                },
              },
              status: 200,
              statusText: 'OK',
              headers: { 'content-type': 'application/json' },
              config,
            });
          resolve(config);
        }, 800);
      });
    }

    if (config.url?.includes('/auth/login') && config.method === 'post') {
      const { email } = parseBody(config.data);
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'error@test.com') {
            config.adapter = () =>
              Promise.reject({
                response: {
                  data: { message: 'Invalid email or password' },
                  status: 401,
                },
              });
          } else {
            config.adapter = () =>
              Promise.resolve({
                data: {
                  user: {
                    id: 'mock-user-1',
                    name: 'Test User',
                    email,
                    role: 'organizer' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                  tokens: {
                    accessToken: 'mock-access-token-' + Date.now(),
                    refreshToken: 'mock-refresh-token-' + Date.now(),
                  },
                },
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'application/json' },
                config,
              });
          }
          resolve(config);
        }, 600);
      });
    }

    return config;
  });
};
