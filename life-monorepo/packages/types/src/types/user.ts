/**
 * User-related type definitions
 * @module @life/types/types
 */

import type { Branded, Nullable, Optional, Result } from '../index.js';

// =============================================================================
// USER IDENTIFIERS
// =============================================================================

/** Unique identifier for users */
export type UserId = Branded<string, 'UserId'>;

/** Unique identifier for user sessions */
export type SessionId = Branded<string, 'SessionId'>;

// =============================================================================
// USER PROFILE
// =============================================================================

/**
 * Provider types for authentication
 */
export type AuthProvider = 'email' | 'google' | 'apple' | 'facebook';

/**
 * User role for authorization
 */
export type UserRole = 'admin' | 'user' | 'guest';

/**
 * User account status
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

/**
 * Core user profile information
 * This is the minimal user data available after authentication
 */
export interface UserProfile {
  /** Unique user identifier */
  readonly id: UserId;
  /** User's email address (verified) */
  readonly email: string;
  /** Display name shown in UI */
  readonly displayName: Nullable<string>;
  /** URL to user's profile photo */
  readonly photoURL: Nullable<string>;
  /** Authentication provider used */
  readonly provider: AuthProvider;
  /** User's role for authorization */
  readonly role: UserRole;
  /** Account status */
  readonly status: UserStatus;
  /** When the user account was created */
  readonly createdAt: Date;
  /** When the user profile was last updated */
  readonly updatedAt: Date;
  /** When the user last logged in */
  readonly lastLoginAt: Nullable<Date>;
}

/**
 * Extended user information
 * Includes full profile details
 */
export interface User extends UserProfile {
  /** User's phone number (verified) */
  readonly phoneNumber: Nullable<string>;
  /** User's preferred language */
  readonly language: string;
  /** User's timezone */
  readonly timezone: string;
  /** Whether email is verified */
  readonly emailVerified: boolean;
  /** Whether phone is verified */
  readonly phoneVerified: boolean;
  /** User's preferences */
  readonly preferences: UserPreferences;
}

/**
 * User creation input
 * Required fields for creating a new user
 */
export interface CreateUserInput {
  readonly email: string;
  readonly password?: string;
  readonly displayName?: string;
  readonly photoURL?: string;
  readonly provider: AuthProvider;
}

/**
 * User update input
 * All fields are optional for partial updates
 */
export interface UpdateUserInput {
  readonly displayName?: Nullable<string>;
  readonly photoURL?: Nullable<string>;
  readonly phoneNumber?: Nullable<string>;
  readonly language?: string;
  readonly timezone?: string;
  readonly preferences?: Partial<UserPreferences>;
}

// =============================================================================
// USER PREFERENCES
// =============================================================================

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  /** Master switch for all notifications */
  readonly enabled: boolean;
  /** Push notification settings */
  readonly push: {
    readonly enabled: boolean;
    readonly transactions: boolean;
    readonly calendar: boolean;
    readonly reminders: boolean;
    readonly marketing: boolean;
  };
  /** Email notification settings */
  readonly email: {
    readonly enabled: boolean;
    readonly weeklyReport: boolean;
    readonly monthlyReport: boolean;
    readonly marketing: boolean;
  };
}

/**
 * Privacy preferences
 */
export interface PrivacyPreferences {
  /** Whether to share usage analytics */
  readonly shareAnalytics: boolean;
  /** Whether to enable biometric authentication */
  readonly biometricEnabled: boolean;
  /** Auto-lock timeout in minutes (0 = never) */
  readonly autoLockTimeout: number;
  /** Whether to mask sensitive data */
  readonly maskSensitiveData: boolean;
}

/**
 * Display preferences
 */
export interface DisplayPreferences {
  /** Theme mode preference */
  readonly theme: 'light' | 'dark' | 'system';
  /** Currency code (ISO 4217) */
  readonly currency: string;
  /** Date format string */
  readonly dateFormat: string;
  /** Time format */
  readonly timeFormat: '12h' | '24h';
  /** Number format locale */
  readonly numberFormat: string;
  /** Compact number display (1.2k instead of 1,200) */
  readonly compactNumbers: boolean;
}

/**
 * Complete user preferences
 */
export interface UserPreferences {
  readonly notifications: NotificationPreferences;
  readonly privacy: PrivacyPreferences;
  readonly display: DisplayPreferences;
}

// =============================================================================
// AUTHENTICATION
// =============================================================================

/**
 * Login credentials for email/password auth
 */
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  /** Remember the session */
  readonly rememberMe?: boolean;
}

/**
 * Registration input
 */
export interface RegisterInput {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly displayName?: string;
  readonly acceptTerms: boolean;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  readonly email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirmation {
  readonly token: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

/**
 * Authentication session
 */
export interface AuthSession {
  readonly id: SessionId;
  readonly userId: UserId;
  readonly token: string;
  readonly refreshToken: string;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly deviceInfo: DeviceInfo;
}

/**
 * Device information for session tracking
 */
export interface DeviceInfo {
  readonly deviceId: string;
  readonly platform: 'ios' | 'android' | 'web';
  readonly osVersion: string;
  readonly appVersion: string;
  readonly model?: string;
  readonly brand?: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  /** Currently authenticated user (null if not authenticated) */
  readonly user: Nullable<User>;
  /** Current session (null if not authenticated) */
  readonly session: Nullable<AuthSession>;
  /** Whether auth state is being initialized */
  readonly isInitializing: boolean;
  /** Whether an auth operation is in progress */
  readonly isLoading: boolean;
  /** Last error that occurred during auth */
  readonly error: Nullable<AuthError>;
}

/**
 * Authentication error types
 */
export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'USER_NOT_FOUND'
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'ACCOUNT_DISABLED'
  | 'SESSION_EXPIRED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Authentication error
 */
export interface AuthError {
  readonly code: AuthErrorCode;
  readonly message: string;
  readonly field?: string;
}

// =============================================================================
// USER SEARCH & FILTERING
// =============================================================================

/**
 * User search filters
 */
export interface UserFilters {
  readonly role?: UserRole;
  readonly status?: UserStatus;
  readonly provider?: AuthProvider;
  readonly searchQuery?: string;
  readonly createdAfter?: Date;
  readonly createdBefore?: Date;
}

/**
 * User sort options
 */
export type UserSortField = 'displayName' | 'email' | 'createdAt' | 'lastLoginAt';
export type SortOrder = 'asc' | 'desc';

/**
 * User sort configuration
 */
export interface UserSort {
  readonly field: UserSortField;
  readonly order: SortOrder;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a value is a valid UserId
 */
export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && value.startsWith('user_');
}

/**
 * Type guard to check if a value is a valid UserRole
 */
export function isUserRole(value: unknown): value is UserRole {
  return value === 'admin' || value === 'user' || value === 'guest';
}

/**
 * Type guard to check if a value is a valid UserStatus
 */
export function isUserStatus(value: unknown): value is UserStatus {
  return value === 'active' || value === 'inactive' || value === 'suspended' || value === 'pending';
}

/**
 * Type guard to check if a value is a valid AuthProvider
 */
export function isAuthProvider(value: unknown): value is AuthProvider {
  return value === 'email' || value === 'google' || value === 'apple' || value === 'facebook';
}
