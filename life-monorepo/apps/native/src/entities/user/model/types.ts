/**
 * User entity types
 */

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  notifications: NotificationPreferences;
  biometricEnabled: boolean;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  emailEnabled: boolean;
  dailySummary: boolean;
  weeklyReport: boolean;
  billReminders: boolean;
}
