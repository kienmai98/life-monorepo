/**
 * Global TypeScript type definitions for the Life app
 * @module @life/types
 */

// ============================================
// NAVIGATION TYPES
// ============================================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Calendar: undefined;
  Transactions: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  AddTransaction: undefined;
};

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  biometricEnabled: boolean;
}

// ============================================
// TRANSACTION TYPES
// ============================================

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptImage?: string;
  createdAt: string;
}

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'health'
  | 'travel'
  | 'other';

export type TransactionType = 'income' | 'expense';

// ============================================
// CALENDAR TYPES
// ============================================

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  isAllDay: boolean;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';
