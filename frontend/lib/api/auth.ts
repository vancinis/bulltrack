import { apiClient } from './client';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

// Backend response uses snake_case
interface LoginResponseBackend {
  access_token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponseBackend>('/auth/login', credentials);
    // Map snake_case to camelCase
    return {
      accessToken: data.access_token,
      user: data.user,
    };
  },

  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/profile');
    return data;
  },
};
