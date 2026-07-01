import { api, axiosInstance } from '@lib/axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@lib/env', () => ({
  env: {
    apiUrl: 'http://localhost:3000/api',
  },
}));

vi.mock('@lib/logger', () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('Axios Instance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe('Request Interceptor', () => {
    it('should add Authorization header when token exists', () => {
      localStorage.setItem('auth_token', 'test-token');
      const config = {
        url: '/test',
        method: 'get' as const,
        headers: {} as Record<string, string>,
      };

      const handlers = axiosInstance.interceptors.request.handlers;
      if (!handlers?.[0]?.fulfilled) {
        throw new Error('Request interceptor not configured');
      }

      const result = handlers[0].fulfilled(config as never);
      if (result && typeof result === 'object' && !('then' in result)) {
        const configObj = result as unknown as Record<string, unknown>;
        const headers = configObj.headers as Record<string, unknown>;
        expect(headers?.Authorization).toBe('Bearer test-token');
      }
    });

    it('should not add Authorization header when no token', () => {
      const config = {
        url: '/test',
        method: 'get' as const,
        headers: {} as Record<string, string>,
      };

      const handlers = axiosInstance.interceptors.request.handlers;
      if (!handlers?.[0]?.fulfilled) {
        throw new Error('Request interceptor not configured');
      }

      const result = handlers[0].fulfilled(config as never);
      if (result && typeof result === 'object' && !('then' in result)) {
        const configObj = result as unknown as Record<string, unknown>;
        const headers = configObj.headers as Record<string, unknown>;
        expect(headers?.Authorization).toBeUndefined();
      }
    });
  });

  describe('Response Interceptor', () => {
    it('should have response error handler defined', () => {
      const handlers = axiosInstance.interceptors.response.handlers;
      expect(handlers && handlers.length).toBeGreaterThan(0);
      expect(typeof handlers?.[0]?.rejected).toBe('function');
    });
  });

  describe('API Wrapper', () => {
    it('should export get, post, put, patch, delete methods', () => {
      expect(typeof api.get).toBe('function');
      expect(typeof api.post).toBe('function');
      expect(typeof api.put).toBe('function');
      expect(typeof api.patch).toBe('function');
      expect(typeof api.delete).toBe('function');
    });

    it('should call axiosInstance.get', async () => {
      const spy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({
        data: { test: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as never);

      await api.get('/test');
      expect(spy).toHaveBeenCalledWith('/test', undefined);
    });

    it('should pass config to axiosInstance.get', async () => {
      const spy = vi.spyOn(axiosInstance, 'get').mockResolvedValue({
        data: { test: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as never);

      const config = { headers: { 'X-Custom': 'value' } };
      await api.get('/test', config);
      expect(spy).toHaveBeenCalledWith('/test', config);
    });

    it('should pass data to axiosInstance.post', async () => {
      const spy = vi.spyOn(axiosInstance, 'post').mockResolvedValue({
        data: { id: 1 },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {},
      } as never);

      await api.post('/test', { name: 'test' });
      expect(spy).toHaveBeenCalledWith('/test', { name: 'test' }, undefined);
    });

    it('should pass data to axiosInstance.put', async () => {
      const spy = vi.spyOn(axiosInstance, 'put').mockResolvedValue({
        data: { id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as never);

      await api.put('/test/1', { name: 'updated' });
      expect(spy).toHaveBeenCalledWith('/test/1', { name: 'updated' }, undefined);
    });

    it('should pass data to axiosInstance.patch', async () => {
      const spy = vi.spyOn(axiosInstance, 'patch').mockResolvedValue({
        data: { id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as never);

      await api.patch('/test/1', { name: 'patched' });
      expect(spy).toHaveBeenCalledWith('/test/1', { name: 'patched' }, undefined);
    });

    it('should call axiosInstance.delete', async () => {
      const spy = vi.spyOn(axiosInstance, 'delete').mockResolvedValue({
        data: {},
        status: 204,
        statusText: 'No Content',
        headers: {},
        config: {},
      } as never);

      await api.delete('/test/1');
      expect(spy).toHaveBeenCalledWith('/test/1', undefined);
    });
  });
});
