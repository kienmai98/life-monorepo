/**
 * @module features/auth/model/store
 * @description Authentication store using Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialAuthState } from './types';
import type { AuthState } from './types';
import type { User } from '@/entities/user';

/**
 * Authentication store interface
 * Extends AuthState with action methods
 */
export interface AuthStore extends AuthState {
  /** Authenticate user with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Authenticate user with Google OAuth */
  loginWithGoogle: () => Promise<void>;
  /** Authenticate user with Apple OAuth */
  loginWithApple: () => Promise<void>;
  /** Register new user */
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  /** Log out current user */
  logout: () => void;
  /** Clear current error */
  clearError: () => void;
  /** Set user directly (e.g., after token refresh) */
  setUser: (user: User | null) => void;
  /** Set loading state */
  setLoading: (isLoading: boolean) => void;
}

/**
 * Helper function to handle errors consistently
 */
const handleAuthError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};

/**
 * Authentication store hook
 * @example
 * ```tsx
 * const { user, login, logout } = useAuthStore();
 * ```
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialAuthState,

      login: async (email: string, password: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual Firebase/Auth API call
          console.log('Login:', email);
          throw new Error('Not implemented');
        } catch (error) {
          set({
            error: handleAuthError(error, 'Login failed. Please try again.'),
            isLoading: false,
          });
          throw error;
        }
      },

      loginWithGoogle: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Google OAuth
          throw new Error('Not implemented');
        } catch (error) {
          set({
            error: handleAuthError(error, 'Google login failed. Please try again.'),
            isLoading: false,
          });
          throw error;
        }
      },

      loginWithApple: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Apple OAuth
          throw new Error('Not implemented');
        } catch (error) {
          set({
            error: handleAuthError(error, 'Apple login failed. Please try again.'),
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, displayName?: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement registration API call
          console.log('Register:', email, displayName);
          throw new Error('Not implemented');
        } catch (error) {
          set({
            error: handleAuthError(error, 'Registration failed. Please try again.'),
            isLoading: false,
          });
          throw error;
        }
      },

      logout: (): void => {
        set({ user: null, error: null, isLoading: false });
      },

      clearError: (): void => {
        set({ error: null });
      },

      setUser: (user: User | null): void => {
        set({ user, isLoading: false });
      },

      setLoading: (isLoading: boolean): void => {
        set({ isLoading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): Pick<AuthState, 'user' | 'isBiometricEnabled'> => ({
        user: state.user,
        isBiometricEnabled: state.isBiometricEnabled,
      }),
    }
  )
);
