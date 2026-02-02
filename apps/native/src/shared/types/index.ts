/**
 * Global TypeScript type definitions for the Life app
 * @module shared/types
 */

// ============================================
// NAVIGATION TYPES
// ============================================

/**
 * Root stack navigator param list
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

/**
 * Auth stack navigator param list
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  BiometricSetup: { userId: string } | undefined;
  ForgotPassword: undefined;
};

/**
 * Main tab navigator param list
 */
export type MainTabParamList = {
  Dashboard: undefined;
  Calendar: undefined;
  Transactions: undefined;
  Profile: undefined;
};

/**
 * Main stack navigator param list
 */
export type MainStackParamList = {
  MainTabs: undefined;
  AddTransaction: { transactionId?: string } | undefined;
  TransactionDetail: { transactionId: string };
  EditTransaction: { transactionId: string };
  Settings: undefined;
  Notifications: undefined;
};

/**
 * Combined navigation param list
 */
export type AppNavigationParamList = RootStackParamList & 
  AuthStackParamList & 
  MainTabParamList & 
  MainStackParamList;

// ============================================
// USER TYPES
// ============================================

/**
 * User entity
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Email address */
  email: string;
  /** Display name */
  displayName: string | null;
  /** Profile photo URL */
  photoURL: string | null;
  /** Email verified status */
  emailVerified?: boolean;
  /** Account creation date */
  createdAt?: string;
  /** Last login timestamp */
  lastLoginAt?: string;
  /** User preferences */
  preferences?: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  /** Theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Default currency */
  currency: string;
  /** Notification settings */
  notifications: NotificationPreferences;
  /** Biometric authentication enabled */
  biometricEnabled: boolean;
}

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  /** Enable push notifications */
  pushEnabled: boolean;
  /** Enable email notifications */
  emailEnabled: boolean;
  /** Daily summary notification */
  dailySummary: boolean;
  /** Weekly report notification */
  weeklyReport: boolean;
  /** Bill reminders */
  billReminders: boolean;
}

// ============================================
// TRANSACTION TYPES
// ============================================

/**
 * Transaction entity
 */
export interface Transaction {
  /** Unique identifier */
  id: string;
  /** Transaction amount */
  amount: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Transaction category */
  category: TransactionCategory;
  /** Description */
  description: string;
  /** Transaction date (ISO string) */
  date: string;
  /** Transaction type */
  type: TransactionType;
  /** Payment method */
  paymentMethod: PaymentMethod;
  /** Receipt image URL */
  receiptUrl?: string;
  /** Location data */
  location?: GeoLocation;
  /** Tags */
  tags: string[];
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
  /** Sync status */
  synced: boolean;
}

/**
 * Transaction categories
 */
export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'health'
  | 'travel'
  | 'education'
  | 'income'
  | 'investment'
  | 'other';

/**
 * Transaction types
 */
export type TransactionType = 'income' | 'expense';

/**
 * Payment methods
 */
export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'mobile_payment'
  | 'check'
  | 'other';

/**
 * Geolocation data
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  placeName?: string;
}

/**
 * Transaction filter options
 */
export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  category?: TransactionCategory | 'all';
  type?: TransactionType | 'all';
  searchQuery?: string;
  tags?: string[];
  minAmount?: number;
  maxAmount?: number;
}

/**
 * Transaction statistics
 */
export interface TransactionStats {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  spendingByCategory: Record<TransactionCategory, number>;
  transactionCount: number;
}

// ============================================
// CALENDAR TYPES
// ============================================

/**
 * Calendar event entity
 */
export interface CalendarEvent {
  /** Unique identifier */
  id: string;
  /** Event title */
  title: string;
  /** Start date/time (ISO string) */
  startDate: string;
  /** End date/time (ISO string) */
  endDate: string;
  /** Event description */
  description?: string;
  /** Event location */
  location?: string;
  /** Whether event is all-day */
  isAllDay: boolean;
  /** Calendar ID */
  calendarId?: string;
  /** Recurrence rule */
  recurrence?: string;
  /** Attendees */
  attendees?: string[];
  /** Organizer */
  organizer?: string;
  /** Creation timestamp */
  createdAt?: string;
  /** Last update timestamp */
  updatedAt?: string;
}

/**
 * Calendar filter options
 */
export interface CalendarFilter {
  startDate?: string;
  endDate?: string;
  calendarIds?: string[];
}

// ============================================
// API TYPES
// ============================================

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  /** Success status */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if failed */
  error?: string;
  /** Error code */
  errorCode?: string;
  /** Pagination info */
  pagination?: PaginationInfo;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  /** Current page */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total items */
  total: number;
  /** Total pages */
  totalPages: number;
  /** Has more pages */
  hasMore: boolean;
}

/**
 * API error
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Error code */
  code: string;
  /** HTTP status code */
  statusCode: number;
  /** Additional details */
  details?: Record<string, unknown>;
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Deep partial type helper
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Action result type for async operations
 */
export interface ActionResult<T = void> {
  /** Success status */
  success: boolean;
  /** Result data */
  data?: T;
  /** Error if failed */
  error?: string;
}

/**
 * Loading state type
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// ============================================
// THEME TYPES
// ============================================

/**
 * Theme mode
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Active theme (resolved)
 */
export type ActiveTheme = 'light' | 'dark';

// Re-export from features for convenience
export type { User as AuthUser } from '../../features/auth/stores/authStore';
export type { 
  Transaction as TransactionEntity,
  TransactionCategory,
  TransactionStats,
  TransactionFilter,
  PaymentMethod,
} from '../../features/transactions/stores/transactionStore';
