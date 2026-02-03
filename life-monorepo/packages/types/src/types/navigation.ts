/**
 * Navigation-related type definitions
 * @module @life/types/types
 */

import type { ParamListBase } from '@react-navigation/native';

// =============================================================================
// NAVIGATION PARAM LISTS
// =============================================================================

/**
 * Root stack navigator parameters
 * This is the top-level navigator that handles authentication flow
 */
export interface RootStackParamList extends ParamListBase {
  /** Authentication flow (login, register, etc.) */
  Auth: undefined;
  /** Main app flow (tabs, drawers, etc.) */
  Main: undefined;
  /** Onboarding for new users */
  Onboarding: undefined;
  /** Splash/loading screen */
  Splash: undefined;
}

/**
 * Authentication stack navigator parameters
 * Handles all authentication-related screens
 */
export interface AuthStackParamList extends ParamListBase {
  /** Login screen */
  Login: undefined;
  /** Registration screen */
  Register: undefined;
  /** Forgot password screen */
  ForgotPassword: undefined;
  /** Password reset confirmation */
  ResetPassword: { token: string };
  /** Email verification screen */
  VerifyEmail: { email: string };
  /** Biometric authentication prompt */
  BiometricAuth: undefined;
}

/**
 * Main tab navigator parameters
 * Primary navigation for authenticated users
 */
export interface MainTabParamList extends ParamListBase {
  /** Dashboard/Home screen */
  Dashboard: undefined;
  /** Calendar screen */
  Calendar: undefined;
  /** Transactions screen */
  Transactions: { filter?: string };
  /** Analytics/Reports screen */
  Analytics: { period?: string };
  /** User profile screen */
  Profile: undefined;
}

/**
 * Main stack navigator parameters
 * Handles screens that aren't in tabs
 */
export interface MainStackParamList extends ParamListBase {
  /** Main tabs container */
  MainTabs: undefined;
  /** Add new transaction */
  AddTransaction: { 
    /** Pre-selected transaction type */
    type?: 'income' | 'expense';
    /** Pre-selected date */
    date?: string;
  };
  /** Transaction details */
  TransactionDetails: { 
    /** Transaction ID to display */
    transactionId: string;
  };
  /** Edit existing transaction */
  EditTransaction: { 
    /** Transaction ID to edit */
    transactionId: string;
  };
  /** Add calendar event */
  AddEvent: {
    /** Pre-selected date */
    date?: string;
    /** Pre-selected time */
    time?: string;
  };
  /** Event details */
  EventDetails: {
    /** Event ID to display */
    eventId: string;
  };
  /** Edit calendar event */
  EditEvent: {
    /** Event ID to edit */
    eventId: string;
  };
  /** Budget management */
  Budget: undefined;
  /** Settings screen */
  Settings: undefined;
  /** Notification preferences */
  NotificationSettings: undefined;
  /** Privacy settings */
  PrivacySettings: undefined;
  /** Display preferences */
  DisplaySettings: undefined;
  /** Category management */
  Categories: undefined;
  /** Help & support */
  Help: undefined;
  /** About screen */
  About: undefined;
}

// =============================================================================
// NAVIGATION STATE
// =============================================================================

/**
 * Navigation state for the app
 */
export interface NavigationState {
  /** Whether the app is initializing (splash screen) */
  readonly isInitializing: boolean;
  /** Whether user has completed onboarding */
  readonly hasCompletedOnboarding: boolean;
  /** Current route name */
  readonly currentRoute: string | null;
  /** Previous route name */
  readonly previousRoute: string | null;
  /** Navigation history stack */
  readonly history: readonly string[];
}

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================

/**
 * Route configuration options
 */
export interface RouteConfig {
  /** Whether route requires authentication */
  readonly requiresAuth: boolean;
  /** Whether to hide tab bar on this screen */
  readonly hideTabBar?: boolean;
  /** Whether to hide header on this screen */
  readonly hideHeader?: boolean;
  /** Custom header title */
  readonly headerTitle?: string;
  /** Whether to show back button */
  readonly showBackButton?: boolean;
  /** Animation type for screen transition */
  readonly animation?: 'slide' | 'fade' | 'modal';
  /** Gesture enabled for going back */
  readonly gestureEnabled?: boolean;
}

/**
 * Deep link configuration
 */
export interface DeepLinkConfig {
  /** URL prefix (e.g., 'myapp://') */
  readonly prefix: string;
  /** Route mappings for deep links */
  readonly routes: Record<string, string>;
}

// =============================================================================
// NAVIGATION UTILITIES
// =============================================================================

/**
 * Extract route parameters type from a param list
 */
export type RouteParams<T extends ParamListBase, K extends keyof T> = T[K];

/**
 * Get all route names from a param list
 */
export type RouteNames<T extends ParamListBase> = keyof T & string;

/**
 * Navigation prop type helper
 * For use with React Navigation's useNavigation hook
 */
export type NavigationProp<T extends ParamListBase> = {
  navigate: <RouteName extends keyof T>(
    ...args: undefined extends T[RouteName]
      ? [RouteName] | [RouteName, T[RouteName]]
      : [RouteName, T[RouteName]]
  ) => void;
  goBack: () => void;
  reset: (state: { routes: Array<{ name: keyof T; params?: T[keyof T] }> }) => void;
  setParams: (params: Partial<T[keyof T]>) => void;
};

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a route name exists in RootStackParamList
 */
export function isRootStackRoute(name: string): name is keyof RootStackParamList {
  return ['Auth', 'Main', 'Onboarding', 'Splash'].includes(name);
}

/**
 * Type guard to check if a route name exists in AuthStackParamList
 */
export function isAuthStackRoute(name: string): name is keyof AuthStackParamList {
  return [
    'Login', 'Register', 'ForgotPassword', 
    'ResetPassword', 'VerifyEmail', 'BiometricAuth'
  ].includes(name);
}

/**
 * Type guard to check if a route name exists in MainTabParamList
 */
export function isMainTabRoute(name: string): name is keyof MainTabParamList {
  return ['Dashboard', 'Calendar', 'Transactions', 'Analytics', 'Profile'].includes(name);
}

/**
 * Type guard to check if a route name exists in MainStackParamList
 */
export function isMainStackRoute(name: string): name is keyof MainStackParamList {
  return [
    'MainTabs', 'AddTransaction', 'TransactionDetails', 'EditTransaction',
    'AddEvent', 'EventDetails', 'EditEvent', 'Budget', 'Settings',
    'NotificationSettings', 'PrivacySettings', 'DisplaySettings',
    'Categories', 'Help', 'About'
  ].includes(name);
}
