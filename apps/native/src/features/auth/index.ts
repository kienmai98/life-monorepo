/**
 * Authentication feature exports
 * @module features/auth
 */

// Screens
export { default as LoginScreen } from './screens/LoginScreen';
export { default as RegisterScreen } from './screens/RegisterScreen';
export { default as BiometricSetupScreen } from './screens/BiometricSetupScreen';

// Store and selectors
export {
  useAuthStore,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectIsBiometricEnabled,
  selectUserId,
} from './stores/authStore';

// Types
export type { User, AuthStore } from './stores/authStore';
