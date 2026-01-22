import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../(stores)/authStore';
import { authService, LoginCredentials } from '@/lib/api/auth';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setAuth, logout: logoutAction, isAuthenticated, user } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setAuth(response.user, response.accessToken);
      router.push('/'); // Redirect to dashboard
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutAction();
    router.push('/login');
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
  };
}
