/**
 * @module features/auth/lib/useAuth
 * @description Authentication hook for accessing auth state and actions
 */

import { useCallback, useMemo } from 'react';
import { useAuthStore } from '../model/store';
import type { User } from '@/entities/user';

/**
 * Return type for useAuth hook
 */
export interface UseAuthReturn {
  /** Current authenticated user or null */
  user: User | null;
  /** Whether an auth operation is in progress */
  isLoading: boolean;
  /** Current error message or null */
  error: string | null;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Authenticate with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Authenticate with Google */
  loginWithGoogle: () => Promise<void>;
  /** Authenticate with Apple */
  loginWithApple: () => Promise<void>;
  /** Register new user */
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  /** Log out current user */
  logout: () => void;
  /** Clear current error */
  clearError: () => void;
}

/**
 * Hook for accessing authentication state and actions
 *
 * @example
 * ```tsx
 * function LoginScreen() {
 *   const { login, isLoading, error } = useAuth();
 *
 *   const handleLogin = async (email: string, password: string) => {
 *     try {
 *       await login(email, password);
 *     } catch (e) {
 *       // Handle error
 *     }
 *   };
 *
 *   return <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />;
 * }
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const store = useAuthStore();

  // Memoize derived state
  const isAuthenticated = useMemo(() => store.user !== null, [store.user]);

  // Memoize action callbacks to prevent unnecessary re-renders
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      await store.login(email, password);
    },
    [store.login]
  );

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    await store.loginWithGoogle();
  }, [store.loginWithGoogle]);

  const loginWithApple = useCallback(async (): Promise<void> => {
    await store.loginWithApple();
  }, [store.loginWithApple]);

  const register = useCallback(
    async (email: string, password: string, displayName?: string): Promise<void> => {
      await store.register(email, password, displayName);
    },
    [store.register]
  );

  const logout = useCallback((): void => {
    store.logout();
  }, [store.logout]);

  const clearError = useCallback((): void => {
    store.clearError();
  }, [store.clearError]);

  return useMemo(
    () => ({
      user: store.user,
      isLoading: store.isLoading,
      error: store.error,
      isAuthenticated,
      login,
      loginWithGoogle,
      loginWithApple,
      register,
      logout,
      clearError,
    }),
    [
      store.user,
      store.isLoading,
      store.error,
      isAuthenticated,
      login,
      loginWithGoogle,
      loginWithApple,
      register,
      logout,
      clearError,
    ]
  );
};
