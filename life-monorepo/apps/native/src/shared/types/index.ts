/**
 * @module shared/types
 * @description Shared types used across the application
 */

// Entity types
export type {
  User,
  UserPreferences,
  NotificationPreferences,
} from '@/entities/user';

export type {
  Transaction,
  TransactionCategory,
  TransactionType,
  PaymentMethod,
  GeoLocation,
  TransactionFilter,
  TransactionStats,
} from '@/entities/transaction';

export type {
  CalendarEvent,
  CalendarFilter,
} from '@/entities/event';

/**
 * Standard API response wrapper
 * @template T - Type of the response data
 */
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data (if successful) */
  data?: T;
  /** Error message (if failed) */
  error?: string;
  /** Error code for programmatic handling */
  errorCode?: string;
}

/**
 * API error structure
 */
export interface ApiError {
  /** Human-readable error message */
  message: string;
  /** Error code */
  code: string;
  /** HTTP status code */
  statusCode: number;
}

/** Theme mode preference */
export type ThemeMode = 'light' | 'dark' | 'system';

/** Active theme (resolved from system preference) */
export type ActiveTheme = 'light' | 'dark';
