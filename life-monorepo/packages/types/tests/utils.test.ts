/**
 * Tests for utility functions
 */

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCompactNumber,
  parseCurrency,
  formatDate,
  formatTime,
  isSameDay,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  calculateTotal,
  calculateNet,
  groupByCategory,
  groupByDate,
  filterByDateRange,
  getCurrentMonthTransactions,
  calculateMonthlySummaries,
  filterEventsByDateRange,
  getEventsForDay,
  groupEventsByType,
  sortEventsByDate,
  getDefaultPreferences,
  mergeWithDefaultPreferences,
  isValidEmail,
  isValidUrl,
  isPositiveNumber,
} from '../src/utils/index.js';
import type { Transaction, CalendarEvent, EventType } from '../src/types/index.js';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
      expect(formatCurrency(-50, 'USD')).toBe('-$50.00');
    });

    it('should format EUR correctly', () => {
      expect(formatCurrency(1234.56, 'EUR', 'de-DE')).toMatch(/1\.234,56/);
    });

    it('should format JPY correctly (no decimals)', () => {
      expect(formatCurrency(1234, 'JPY')).toBe('¥1,234');
    });
  });

  describe('formatCompactNumber', () => {
    it('should format thousands correctly', () => {
      expect(formatCompactNumber(1234)).toBe('1.2K');
      expect(formatCompactNumber(12345)).toBe('12K');
    });

    it('should format millions correctly', () => {
      expect(formatCompactNumber(1234567)).toBe('1.2M');
      expect(formatCompactNumber(1234567890)).toBe('1.2B');
    });

    it('should handle small numbers', () => {
      expect(formatCompactNumber(999)).toBe('999');
      expect(formatCompactNumber(0)).toBe('0');
    });
  });

  describe('parseCurrency', () => {
    it('should parse currency strings', () => {
      expect(parseCurrency('$1,234.56')).toBe(1234.56);
      expect(parseCurrency('€ 1.234,56')).toBe(1234.56);
      expect(parseCurrency('¥1,234')).toBe(1234);
    });

    it('should handle invalid strings', () => {
      expect(parseCurrency('')).toBeNaN();
      expect(parseCurrency('abc')).toBeNaN();
    });
  });
});

describe('Date Utilities', () => {
  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date1 = new Date('2024-01-15T10:00:00');
      const date2 = new Date('2024-01-15T18:00:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-16');
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for different months', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-02-15');
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('startOfDay', () => {
    it('should set time to 00:00:00', () => {
      const date = new Date('2024-01-15T14:30:45');
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    it('should set time to 23:59:59.999', () => {
      const date = new Date('2024-01-15T14:30:45');
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('startOfMonth', () => {
    it('should return first day of month', () => {
      const date = new Date('2024-01-15');
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(0);
    });
  });

  describe('endOfMonth', () => {
    it('should return last day of month', () => {
      const date = new Date('2024-01-15');
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(31);
      expect(result.getMonth()).toBe(0);
    });

    it('should handle February in leap year', () => {
      const date = new Date('2024-02-15');
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(29);
    });

    it('should handle February in non-leap year', () => {
      const date = new Date('2023-02-15');
      const result = endOfMonth(date);
      expect(result.getDate()).toBe(28);
    });
  });
});

describe('Transaction Utilities', () => {
  const mockTransactions: Transaction[] = [
    {
      id: 'txn_1' as import('../src/types/index.js').TransactionId,
      userId: 'user_1' as import('../src/types/index.js').UserId,
      amount: 100,
      type: 'income',
      category: 'salary',
      description: 'Salary',
      date: new Date('2024-01-15'),
      status: 'completed',
      paymentMethod: 'bank_transfer',
      createdAt: new Date(),
      updatedAt: new Date(),
      receiptImage: null,
      location: null,
      tags: [],
      metadata: {},
      isRecurring: false,
      recurrenceRule: null,
      originalCurrency: null,
      exchangeRate: null,
    },
    {
      id: 'txn_2' as import('../src/types/index.js').TransactionId,
      userId: 'user_1' as import('../src/types/index.js').UserId,
      amount: 50,
      type: 'expense',
      category: 'food',
      description: 'Groceries',
      date: new Date('2024-01-16'),
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: new Date(),
      updatedAt: new Date(),
      receiptImage: null,
      location: null,
      tags: [],
      metadata: {},
      isRecurring: false,
      recurrenceRule: null,
      originalCurrency: null,
      exchangeRate: null,
    },
    {
      id: 'txn_3' as import('../src/types/index.js').TransactionId,
      userId: 'user_1' as import('../src/types/index.js').UserId,
      amount: 30,
      type: 'expense',
      category: 'transport',
      description: 'Gas',
      date: new Date('2024-01-17'),
      status: 'completed',
      paymentMethod: 'debit_card',
      createdAt: new Date(),
      updatedAt: new Date(),
      receiptImage: null,
      location: null,
      tags: [],
      metadata: {},
      isRecurring: false,
      recurrenceRule: null,
      originalCurrency: null,
      exchangeRate: null,
    },
  ];

  describe('calculateTotal', () => {
    it('should calculate total of all transactions', () => {
      expect(calculateTotal(mockTransactions)).toBe(180);
    });

    it('should calculate total income', () => {
      expect(calculateTotal(mockTransactions, 'income')).toBe(100);
    });

    it('should calculate total expenses', () => {
      expect(calculateTotal(mockTransactions, 'expense')).toBe(80);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });
  });

  describe('calculateNet', () => {
    it('should calculate net amount', () => {
      expect(calculateNet(mockTransactions)).toBe(20);
    });

    it('should return 0 for empty array', () => {
      expect(calculateNet([])).toBe(0);
    });
  });

  describe('groupByCategory', () => {
    it('should group transactions by category', () => {
      const grouped = groupByCategory(mockTransactions);
      expect(grouped.salary).toHaveLength(1);
      expect(grouped.food).toHaveLength(1);
      expect(grouped.transport).toHaveLength(1);
    });
  });

  describe('groupByDate', () => {
    it('should group transactions by date', () => {
      const grouped = groupByDate(mockTransactions);
      expect(Object.keys(grouped)).toHaveLength(3);
    });
  });

  describe('filterByDateRange', () => {
    it('should filter transactions within date range', () => {
      const filtered = filterByDateRange(
        mockTransactions,
        new Date('2024-01-15'),
        new Date('2024-01-16')
      );
      expect(filtered).toHaveLength(2);
    });
  });
});

describe('Event Utilities', () => {
  const mockEvents: CalendarEvent[] = [
    {
      id: 'evt_1' as import('../src/types/index.js').EventId,
      title: 'Meeting',
      type: 'meeting' as EventType,
      status: 'confirmed',
      isAllDay: false,
      startDate: new Date('2024-01-15T10:00:00'),
      endDate: new Date('2024-01-15T11:00:00'),
      description: null,
      location: null,
      priority: 'medium',
      visibility: 'private',
      isRecurring: false,
      recurrenceRule: null,
      calendarId: 'cal_1' as import('../src/types/index.js').CalendarId,
      userId: 'user_1' as import('../src/types/index.js').UserId,
      createdAt: new Date(),
      updatedAt: new Date(),
      attendees: [],
      reminders: [],
      meetingUrl: null,
      color: null,
      tags: [],
      transactionId: null,
      metadata: {},
    },
    {
      id: 'evt_2' as import('../src/types/index.js').EventId,
      title: 'Lunch',
      type: 'appointment' as EventType,
      status: 'confirmed',
      isAllDay: false,
      startDate: new Date('2024-01-15T12:00:00'),
      endDate: new Date('2024-01-15T13:00:00'),
      description: null,
      location: null,
      priority: 'low',
      visibility: 'private',
      isRecurring: false,
      recurrenceRule: null,
      calendarId: 'cal_1' as import('../src/types/index.js').CalendarId,
      userId: 'user_1' as import('../src/types/index.js').UserId,
      createdAt: new Date(),
      updatedAt: new Date(),
      attendees: [],
      reminders: [],
      meetingUrl: null,
      color: null,
      tags: [],
      transactionId: null,
      metadata: {},
    },
  ];

  describe('filterEventsByDateRange', () => {
    it('should filter events within date range', () => {
      const filtered = filterEventsByDateRange(
        mockEvents,
        new Date('2024-01-15'),
        new Date('2024-01-15')
      );
      expect(filtered).toHaveLength(2);
    });
  });

  describe('getEventsForDay', () => {
    it('should return events for specific day', () => {
      const events = getEventsForDay(mockEvents, new Date('2024-01-15'));
      expect(events).toHaveLength(2);
    });
  });

  describe('groupEventsByType', () => {
    it('should group events by type', () => {
      const grouped = groupEventsByType(mockEvents);
      expect(grouped.meeting).toHaveLength(1);
      expect(grouped.appointment).toHaveLength(1);
    });
  });

  describe('sortEventsByDate', () => {
    it('should sort events by start date ascending', () => {
      const sorted = sortEventsByDate(mockEvents);
      expect(sorted[0].startDate.getTime()).toBeLessThanOrEqual(
        sorted[1].startDate.getTime()
      );
    });

    it('should sort events by start date descending', () => {
      const sorted = sortEventsByDate(mockEvents, false);
      expect(sorted[0].startDate.getTime()).toBeGreaterThanOrEqual(
        sorted[1].startDate.getTime()
      );
    });
  });
});

describe('Preference Utilities', () => {
  describe('getDefaultPreferences', () => {
    it('should return default preferences', () => {
      const prefs = getDefaultPreferences();
      expect(prefs.notifications.enabled).toBe(true);
      expect(prefs.privacy.shareAnalytics).toBe(false);
      expect(prefs.display.theme).toBe('system');
    });
  });

  describe('mergeWithDefaultPreferences', () => {
    it('should merge with defaults', () => {
      const merged = mergeWithDefaultPreferences({
        display: { theme: 'dark' as const },
      });
      expect(merged.display.theme).toBe('dark');
      expect(merged.notifications.enabled).toBe(true); // from defaults
    });

    it('should handle empty partial', () => {
      const merged = mergeWithDefaultPreferences({});
      expect(merged).toEqual(getDefaultPreferences());
    });
  });
});

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('/path/to/something')).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should validate positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true);
      expect(isPositiveNumber(0.5)).toBe(true);
    });

    it('should reject non-positive numbers', () => {
      expect(isPositiveNumber(0)).toBe(false);
      expect(isPositiveNumber(-1)).toBe(false);
      expect(isPositiveNumber('1')).toBe(false);
    });
  });
});
