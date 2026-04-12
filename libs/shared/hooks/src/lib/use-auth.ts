import { useState, useEffect } from 'react';
import { useAuthStore } from '@tawakalna/store';
import { mockLogin } from '@tawakalna/usecases';
import { environment } from './environment.js';

interface UseAuthResult {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export function useAuth(): UseAuthResult {
  const { setTokens, clearTokens, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      clearTokens();
      try {
        const response = await mockLogin({
          twkEnabled: environment.twkEnabled,
          apiUrl: environment.apiUrl,
          appId: environment.appId,
        });

        if (response?.isSuccess && response?.responseDetails) {
          const { token, refreshToken } = response.responseDetails;
          setTokens(token, refreshToken);
        }
      } catch (err) {
        console.error('[useAuth] Login error:', err);
        setError(err instanceof Error ? err : new Error('Authentication failed'));
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  return { isLoading, isAuthenticated, error };
}
