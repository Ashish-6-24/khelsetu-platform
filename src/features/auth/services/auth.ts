import { api } from '@lib/axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@shared/types/auth';
import { API_ENDPOINTS } from '@shared/utils/constants';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials,
    );
    return response.data;
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async () => {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.patch<User>(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token: string, password: string) => {
    await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  deleteAccount: async () => {
    await api.delete(API_ENDPOINTS.AUTH.PROFILE);
  },
};
