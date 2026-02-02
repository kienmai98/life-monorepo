/**
 * @module features/auth
 * @description Authentication feature exports
 */

// Hooks
export { useAuth } from './lib';

// UI Components
export { LoginForm } from './ui';

// Store
export { useAuthStore } from './model';

// Types
export type { AuthState } from './model';
export type { LoginFormProps } from './ui/login-form/LoginForm';
export type { UseAuthReturn } from './lib/useAuth';
