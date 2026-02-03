/**
 * @module entities/user/model/types
 * @description User entity types
 */

/**
 * Core user entity
 * Represents an authenticated user in the system
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's email address */
  email: string;
  /** Display name (optional) */
  displayName: string | null;
  /** Profile photo URL (optional) */
  photoURL: string | null;
  /** Whether email has been verified */
  emailVerified?: boolean;
  /** ISO timestamp when user was created */
  createdAt?: string;
}

/**
 * User notification preferences
 */
export interface NotificationPreferences {
  /** Whether push notifications are enabled */
  pushEnabled: boolean;
  /** Whether email notifications are enabled */
  emailEnabled: boolean;
  /** Whether to send daily summary */
  dailySummary: boolean;
  /** Whether to send weekly report */
  weeklyReport: boolean;
  /** Whether to send bill reminders */
  billReminders: boolean;
}

/**
 * User preferences/settings
 */
export interface UserPreferences {
  /** App theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Default currency code (e.g., 'USD', 'EUR') */
  currency: string;
  /** Notification settings */
  notifications: NotificationPreferences;
  /** Whether biometric authentication is enabled */
  biometricEnabled: boolean;
}
