/**
 * @module features/auth/model/types
 * @description Authentication state types
 */

import type { User } from '@/entities/user';

/**
 * Authentication state interface
 */
export interface AuthState {
  /** Current authenticated user or null if not authenticated */
  user: User | null;
  /** Loading state for async operations */
  isLoading: boolean;
  /** Whether biometric authentication is enabled */
  isBiometricEnabled: boolean;
  /** Current error message or null */
  error: string | null;
}

/**
 * Initial authentication state
 */
export const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
  isBiometricEnabled: false,
  error: null,
};
