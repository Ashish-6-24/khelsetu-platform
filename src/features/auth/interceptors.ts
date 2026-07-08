import { axiosInstance, setAccessToken } from '@shared/lib/axios';
import { useAuthStore } from '@state/authStore';
import { AxiosError, AxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupAuthInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              throw err;
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { authService } = await import('./services/auth');
          const response = await authService.refreshToken();
          const newToken = response.tokens.accessToken;
          setAccessToken(newToken);
          processQueue(null, newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          setAccessToken(null);
          useAuthStore.getState().logout();
          window.location.href = '/auth/login';
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      throw error;
    },
  );
};
