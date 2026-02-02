import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * User entity type
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User email address */
  email: string;
  /** Display name (optional) */
  displayName: string | null;
  /** Profile photo URL (optional) */
  photoURL: string | null;
  /** Email verification status */
  emailVerified?: boolean;
  /** User creation timestamp */
  createdAt?: string;
}

/**
 * Authentication state interface
 */
interface AuthState {
  /** Current authenticated user */
  user: User | null;
  /** Whether auth state is being initialized */
  isLoading: boolean;
  /** Whether biometric authentication is enabled */
  isBiometricEnabled: boolean;
  /** Authentication error message */
  error: string | null;
}

/**
 * Authentication actions interface
 */
interface AuthActions {
  /** Set the authenticated user */
  setUser: (user: User | null) => void;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
  /** Set biometric authentication preference */
  setBiometricEnabled: (enabled: boolean) => void;
  /** Set authentication error */
  setError: (error: string | null) => void;
  /** Clear any error state */
  clearError: () => void;
  /** Log out the current user */
  logout: () => void;
  /** Login with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Login with Google OAuth */
  loginWithGoogle: () => Promise<void>;
  /** Login with Apple OAuth */
  loginWithApple: () => Promise<void>;
  /** Register a new user */
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  /** Reset password */
  resetPassword: (email: string) => Promise<void>;
}

/**
 * Combined auth store type
 */
type AuthStore = AuthState & AuthActions;

/**
 * Initial state for auth store
 */
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isBiometricEnabled: false,
  error: null,
};

/**
 * Auth Store - Manages authentication state with persistence
 *
 * Uses Zustand with persistence middleware to maintain auth state across app restarts.
 * Provides selectors to prevent unnecessary re-renders.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { user, isLoading } = useAuthStore();
 *
 * // With selectors for performance
 * const user = useAuthStore(selectUser);
 * const isAuthenticated = useAuthStore(selectIsAuthenticated);
 *
 * // Actions
 * const { login, logout } = useAuthStore();
 * ```
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ user, isLoading: false, error: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      setBiometricEnabled: (enabled) => set({ isBiometricEnabled: enabled }),

      setError: (error) => set({ error, isLoading: false }),

      clearError: () => set({ error: null }),

      logout: () => {
        // TODO: Implement Firebase sign out
        set({ user: null, error: null, isLoading: false });
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Firebase email/password login
          console.log('Login attempt:', email);
          // Placeholder - will be implemented with Firebase
          throw new Error('Login not yet implemented');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Google Sign-In
          console.log('Google login attempt');
          throw new Error('Google login not yet implemented');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Google login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      loginWithApple: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Apple Sign-In
          console.log('Apple login attempt');
          throw new Error('Apple login not yet implemented');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Apple login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      register: async (email, password, displayName) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Firebase registration
          console.log('Register attempt:', email, displayName);
          throw new Error('Registration not yet implemented');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Registration failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      resetPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Firebase password reset
          console.log('Password reset:', email);
          throw new Error('Password reset not yet implemented');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Password reset failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isBiometricEnabled: state.isBiometricEnabled,
      }),
    }
  )
);

/**
 * Selector: Get current user
 * Prevents re-renders when other auth state changes
 */
export const selectUser = (state: AuthStore) => state.user;

/**
 * Selector: Check if user is authenticated
 */
export const selectIsAuthenticated = (state: AuthStore) => state.user !== null;

/**
 * Selector: Check if auth is loading
 */
export const selectIsLoading = (state: AuthStore) => state.isLoading;

/**
 * Selector: Get auth error
 */
export const selectAuthError = (state: AuthStore) => state.error;

/**
 * Selector: Check if biometric is enabled
 */
export const selectIsBiometricEnabled = (state: AuthStore) => state.isBiometricEnabled;

/**
 * Selector: Get user ID (useful for comparisons)
 */
export const selectUserId = (state: AuthStore) => state.user?.id;

export default useAuthStore;
