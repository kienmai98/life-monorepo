/**
 * Utility functions for working with Life app types
 * @module @life/types/utils
 *
 * @example
 * ```typescript
 * import { formatCurrency, calculateTotal } from '@life/types/utils';
 *
 * const total = calculateTotal(transactions);
 * const formatted = formatCurrency(total, 'USD');
 * ```
 */

import type {
  Transaction,
  TransactionType,
  TransactionCategory,
  TransactionSummary,
  MonthlySummary,
  CalendarEvent,
  EventType,
  User,
  UserPreferences,
} from '../types/index.js';

// =============================================================================
// CURRENCY UTILITIES
// =============================================================================

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (ISO 4217)
 * @param locale - The locale to use for formatting
 * @returns Formatted currency string
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56, 'USD'); // "$1,234.56"
 * formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"
 * ```
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number in compact notation (1.2K, 1.2M, etc.)
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting
 * @returns Formatted compact number string
 *
 * @example
 * ```typescript
 * formatCompactNumber(1234); // "1.2K"
 * formatCompactNumber(1234567); // "1.2M"
 * ```
 */
export function formatCompactNumber(amount: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(amount);
}

/**
 * Parse a currency string to a number
 * @param value - The currency string to parse
 * @returns The parsed number or NaN if invalid
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols and whitespace, then parse
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned);
}

// =============================================================================
// DATE UTILITIES
// =============================================================================

/**
 * Format a date according to user preferences
 * @param date - The date to format
 * @param format - The date format string
 * @param locale - The locale to use
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  format: string = 'yyyy-MM-dd',
  locale: string = 'en-US'
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Format a time according to user preferences
 * @param date - The date to format
 * @param use24Hour - Whether to use 24-hour format
 * @param locale - The locale to use
 * @returns Formatted time string
 */
export function formatTime(
  date: Date,
  use24Hour: boolean = false,
  locale: string = 'en-US'
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(date);
}

/**
 * Check if two dates are on the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Get the start of the day for a given date
 * @param date - The date
 * @returns Date at start of day (00:00:00)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of the day for a given date
 * @param date - The date
 * @returns Date at end of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get the start of the month for a given date
 * @param date - The date
 * @returns Date at start of month
 */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get the end of the month for a given date
 * @param date - The date
 * @returns Date at end of month
 */
export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

// =============================================================================
// TRANSACTION UTILITIES
// =============================================================================

/**
 * Calculate the total amount of transactions
 * @param transactions - Array of transactions
 * @param type - Filter by transaction type (optional)
 * @returns Total amount
 */
export function calculateTotal(
  transactions: readonly Transaction[],
  type?: TransactionType
): number {
  return transactions
    .filter((t) => (type ? t.type === type : true))
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate the net amount (income - expenses)
 * @param transactions - Array of transactions
 * @returns Net amount (positive = more income, negative = more expenses)
 */
export function calculateNet(transactions: readonly Transaction[]): number {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  return income - expenses;
}

/**
 * Group transactions by category
 * @param transactions - Array of transactions
 * @returns Record of category to transactions array
 */
export function groupByCategory(
  transactions: readonly Transaction[]
): Record<TransactionCategory, Transaction[]> {
  const result = {} as Record<TransactionCategory, Transaction[]>;
  
  for (const transaction of transactions) {
    if (!result[transaction.category]) {
      result[transaction.category] = [];
    }
    result[transaction.category].push(transaction);
  }
  
  return result;
}

/**
 * Group transactions by date
 * @param transactions - Array of transactions
 * @returns Record of date string (YYYY-MM-DD) to transactions array
 */
export function groupByDate(
  transactions: readonly Transaction[]
): Record<string, Transaction[]> {
  const result: Record<string, Transaction[]> = {};
  
  for (const transaction of transactions) {
    const dateKey = formatDate(transaction.date);
    if (!result[dateKey]) {
      result[dateKey] = [];
    }
    result[dateKey].push(transaction);
  }
  
  return result;
}

/**
 * Filter transactions by date range
 * @param transactions - Array of transactions
 * @param startDate - Start of date range (inclusive)
 * @param endDate - End of date range (inclusive)
 * @returns Filtered transactions
 */
export function filterByDateRange(
  transactions: readonly Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] {
  return transactions.filter(
    (t) => t.date >= startOfDay(startDate) && t.date <= endOfDay(endDate)
  );
}

/**
 * Get transactions for the current month
 * @param transactions - Array of transactions
 * @param referenceDate - Date to determine current month (defaults to now)
 * @returns Transactions for the current month
 */
export function getCurrentMonthTransactions(
  transactions: readonly Transaction[],
  referenceDate: Date = new Date()
): Transaction[] {
  return filterByDateRange(
    transactions,
    startOfMonth(referenceDate),
    endOfMonth(referenceDate)
  );
}

/**
 * Calculate monthly summaries from transactions
 * @param transactions - Array of transactions
 * @returns Array of monthly summaries sorted by date
 */
export function calculateMonthlySummaries(
  transactions: readonly Transaction[]
): MonthlySummary[] {
  const grouped = new Map<string, { income: number; expenses: number; count: number }>();
  
  for (const transaction of transactions) {
    const key = `${transaction.date.getFullYear()}-${String(transaction.date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!grouped.has(key)) {
      grouped.set(key, { income: 0, expenses: 0, count: 0 });
    }
    
    const summary = grouped.get(key)!;
    if (transaction.type === 'income') {
      summary.income += transaction.amount;
    } else {
      summary.expenses += transaction.amount;
    }
    summary.count++;
  }
  
  return Array.from(grouped.entries())
    .map(([key, data]) => {
      const [year, month] = key.split('-').map(Number);
      return {
        year,
        month,
        income: data.income,
        expenses: data.expenses,
        net: data.income - data.expenses,
        count: data.count,
      };
    })
    .sort((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year));
}

// =============================================================================
// EVENT UTILITIES
// =============================================================================

/**
 * Filter events by date range
 * @param events - Array of calendar events
 * @param startDate - Start of date range
 * @param endDate - End of date range
 * @returns Filtered events
 */
export function filterEventsByDateRange(
  events: readonly CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] {
  return events.filter(
    (e) => e.startDate <= endDate && e.endDate >= startDate
  );
}

/**
 * Get events for a specific day
 * @param events - Array of calendar events
 * @param date - The date to get events for
 * @returns Events on that day
 */
export function getEventsForDay(
  events: readonly CalendarEvent[],
  date: Date
): CalendarEvent[] {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return filterEventsByDateRange(events, start, end);
}

/**
 * Group events by type
 * @param events - Array of calendar events
 * @returns Record of event type to events array
 */
export function groupEventsByType(
  events: readonly CalendarEvent[]
): Record<EventType, CalendarEvent[]> {
  const result = {} as Record<EventType, CalendarEvent[]>;
  
  for (const event of events) {
    if (!result[event.type]) {
      result[event.type] = [];
    }
    result[event.type].push(event);
  }
  
  return result;
}

/**
 * Sort events by start date
 * @param events - Array of calendar events
 * @param ascending - Whether to sort in ascending order (default: true)
 * @returns Sorted events
 */
export function sortEventsByDate(
  events: readonly CalendarEvent[],
  ascending: boolean = true
): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const diff = a.startDate.getTime() - b.startDate.getTime();
    return ascending ? diff : -diff;
  });
}

// =============================================================================
// USER PREFERENCE UTILITIES
// =============================================================================

/**
 * Get default user preferences
 * @returns Default preferences object
 */
export function getDefaultPreferences(): UserPreferences {
  return {
    notifications: {
      enabled: true,
      push: {
        enabled: true,
        transactions: true,
        calendar: true,
        reminders: true,
        marketing: false,
      },
      email: {
        enabled: true,
        weeklyReport: true,
        monthlyReport: true,
        marketing: false,
      },
    },
    privacy: {
      shareAnalytics: false,
      biometricEnabled: false,
      autoLockTimeout: 5,
      maskSensitiveData: false,
    },
    display: {
      theme: 'system',
      currency: 'USD',
      dateFormat: 'yyyy-MM-dd',
      timeFormat: '12h',
      numberFormat: 'en-US',
      compactNumbers: false,
    },
  };
}

/**
 * Merge user preferences with defaults
 * @param preferences - User's current preferences
 * @returns Merged preferences with defaults filled in
 */
export function mergeWithDefaultPreferences(
  preferences: Partial<UserPreferences>
): UserPreferences {
  const defaults = getDefaultPreferences();
  
  return {
    notifications: {
      ...defaults.notifications,
      ...preferences.notifications,
      push: {
        ...defaults.notifications.push,
        ...preferences.notifications?.push,
      },
      email: {
        ...defaults.notifications.email,
        ...preferences.notifications?.email,
      },
    },
    privacy: {
      ...defaults.privacy,
      ...preferences.privacy,
    },
    display: {
      ...defaults.display,
      ...preferences.display,
    },
  };
}

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Check if a value is a valid email address
 * @param value - The value to check
 * @returns True if valid email
 */
export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Check if a value is a valid URL
 * @param value - The value to check
 * @returns True if valid URL
 */
export function isValidUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a value is a positive number
 * @param value - The value to check
 * @returns True if positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}
