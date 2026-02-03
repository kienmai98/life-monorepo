/**
 * Type tests for @life/types
 * These tests verify TypeScript type safety and runtime validation
 */

import { describe, it, expect } from 'vitest';
import type {
  User,
  UserId,
  Transaction,
  TransactionId,
  CalendarEvent,
  EventId,
  Result,
  ApiResponse,
  ThemeMode,
  PaginationParams,
} from '../src/index.js';
import {
  userSchema,
  transactionSchema,
  calendarEventSchema,
  loginCredentialsSchema,
  createTransactionInputSchema,
} from '../src/schemas/index.js';

// =============================================================================
// TYPE SAFETY TESTS
// =============================================================================

describe('Type Safety', () => {
  it('should enforce branded types', () => {
    // This test ensures branded types work correctly at compile time
    const userId = 'user_123' as UserId;
    const transactionId = 'txn_456' as TransactionId;
    
    // Type assertion - these should not be assignable to each other
    expect(typeof userId).toBe('string');
    expect(typeof transactionId).toBe('string');
  });

  it('should enforce Result type discriminant', () => {
    const successResult: Result<number, Error> = { ok: true, value: 42 };
    const errorResult: Result<number, Error> = { 
      ok: false, 
      error: new Error('test') 
    };

    if (successResult.ok) {
      // TypeScript should know value is number here
      expect(successResult.value).toBe(42);
    }

    if (!errorResult.ok) {
      // TypeScript should know error is Error here
      expect(errorResult.error.message).toBe('test');
    }
  });

  it('should enforce ApiResponse discriminant', () => {
    const successResponse: ApiResponse<{ name: string }> = {
      success: true,
      data: { name: 'test' },
    };

    const errorResponse: ApiResponse<{ name: string }> = {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Not found',
      },
    };

    if (successResponse.success) {
      expect(successResponse.data.name).toBe('test');
    }

    if (!errorResponse.success) {
      expect(errorResponse.error.code).toBe('NOT_FOUND');
    }
  });

  it('should enforce strict null checks', () => {
    const nullable: string | null | undefined = null;
    const optional: string | undefined = undefined;

    expect(nullable).toBeNull();
    expect(optional).toBeUndefined();
  });
});

// =============================================================================
// SCHEMA VALIDATION TESTS
// =============================================================================

describe('User Schema Validation', () => {
  const validUser = {
    id: 'user_123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    provider: 'email' as const,
    role: 'user' as const,
    status: 'active' as const,
    phoneNumber: '+1234567890',
    language: 'en',
    timezone: 'UTC',
    emailVerified: true,
    phoneVerified: false,
    preferences: {
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
        theme: 'system' as const,
        currency: 'USD',
        dateFormat: 'yyyy-MM-dd',
        timeFormat: '12h' as const,
        numberFormat: 'en-US',
        compactNumbers: false,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
  };

  it('should validate a valid user', () => {
    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidUser = { ...validUser, email: 'invalid-email' };
    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it('should reject missing required fields', () => {
    const { id, ...incompleteUser } = validUser;
    const result = userSchema.safeParse(incompleteUser);
    expect(result.success).toBe(false);
  });
});

describe('Transaction Schema Validation', () => {
  const validTransaction = {
    id: 'txn_123',
    userId: 'user_456',
    amount: 50.99,
    type: 'expense' as const,
    category: 'food' as const,
    description: 'Grocery shopping',
    date: new Date(),
    status: 'completed' as const,
    paymentMethod: 'credit_card' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    receiptImage: null,
    location: null,
    tags: ['groceries', 'essentials'],
    metadata: {},
    isRecurring: false,
    recurrenceRule: null,
    originalCurrency: null,
    exchangeRate: null,
  };

  it('should validate a valid transaction', () => {
    const result = transactionSchema.safeParse(validTransaction);
    expect(result.success).toBe(true);
  });

  it('should reject negative amount', () => {
    const invalidTransaction = { ...validTransaction, amount: -10 };
    const result = transactionSchema.safeParse(invalidTransaction);
    expect(result.success).toBe(false);
  });

  it('should reject zero amount', () => {
    const invalidTransaction = { ...validTransaction, amount: 0 };
    const result = transactionSchema.safeParse(invalidTransaction);
    expect(result.success).toBe(false);
  });

  it('should reject invalid category', () => {
    const invalidTransaction = { 
      ...validTransaction, 
      category: 'invalid_category' 
    };
    const result = transactionSchema.safeParse(invalidTransaction);
    expect(result.success).toBe(false);
  });
});

describe('Calendar Event Schema Validation', () => {
  const validEvent = {
    id: 'evt_123',
    title: 'Team Meeting',
    type: 'meeting' as const,
    status: 'confirmed' as const,
    isAllDay: false,
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600000),
    description: 'Weekly team sync',
    location: null,
    priority: 'medium' as const,
    visibility: 'private' as const,
    isRecurring: false,
    recurrenceRule: null,
    calendarId: 'cal_456',
    userId: 'user_789',
    createdAt: new Date(),
    updatedAt: new Date(),
    attendees: [],
    reminders: [],
    meetingUrl: null,
    color: null,
    tags: ['work'],
    transactionId: null,
    metadata: {},
  };

  it('should validate a valid calendar event', () => {
    const result = calendarEventSchema.safeParse(validEvent);
    expect(result.success).toBe(true);
  });

  it('should reject empty title', () => {
    const invalidEvent = { ...validEvent, title: '' };
    const result = calendarEventSchema.safeParse(invalidEvent);
    expect(result.success).toBe(false);
  });

  it('should accept valid hex color', () => {
    const eventWithColor = { ...validEvent, color: '#FF5733' };
    const result = calendarEventSchema.safeParse(eventWithColor);
    expect(result.success).toBe(true);
  });

  it('should reject invalid hex color', () => {
    const invalidEvent = { ...validEvent, color: 'FF5733' };
    const result = calendarEventSchema.safeParse(invalidEvent);
    expect(result.success).toBe(false);
  });
});

describe('Login Credentials Schema', () => {
  it('should validate valid credentials', () => {
    const result = loginCredentialsSchema.safeParse({
      email: 'user@example.com',
      password: 'password123',
      rememberMe: true,
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = loginCredentialsSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const result = loginCredentialsSchema.safeParse({
      email: 'user@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });
});

describe('Create Transaction Input Schema', () => {
  it('should validate valid input', () => {
    const result = createTransactionInputSchema.safeParse({
      amount: 100,
      type: 'expense',
      category: 'food',
      description: 'Lunch',
      date: new Date(),
      paymentMethod: 'cash',
    });
    expect(result.success).toBe(true);
  });

  it('should reject long description', () => {
    const result = createTransactionInputSchema.safeParse({
      amount: 100,
      type: 'expense',
      category: 'food',
      description: 'a'.repeat(501),
      date: new Date(),
      paymentMethod: 'cash',
    });
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// EDGE CASE TESTS
// =============================================================================

describe('Edge Cases', () => {
  it('should handle null values correctly', () => {
    const userWithNulls = {
      id: 'user_123',
      email: 'test@example.com',
      displayName: null,
      photoURL: null,
      provider: 'email',
      role: 'user',
      status: 'active',
      phoneNumber: null,
      language: 'en',
      timezone: 'UTC',
      emailVerified: false,
      phoneVerified: false,
      preferences: {
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
            weeklyReport: false,
            monthlyReport: false,
            marketing: false,
          },
        },
        privacy: {
          shareAnalytics: false,
          biometricEnabled: false,
          autoLockTimeout: 0,
          maskSensitiveData: true,
        },
        display: {
          theme: 'dark',
          currency: 'EUR',
          dateFormat: 'dd/MM/yyyy',
          timeFormat: '24h',
          numberFormat: 'de-DE',
          compactNumbers: true,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: null,
    };

    const result = userSchema.safeParse(userWithNulls);
    expect(result.success).toBe(true);
  });

  it('should handle special characters in strings', () => {
    const event = {
      id: 'evt_123',
      title: 'Meeting with @John #important',
      type: 'meeting',
      status: 'confirmed',
      isAllDay: false,
      startDate: new Date(),
      endDate: new Date(),
      description: 'Description with <html> & "quotes"',
      location: null,
      priority: 'high',
      visibility: 'private',
      isRecurring: false,
      recurrenceRule: null,
      calendarId: 'cal_456',
      userId: 'user_789',
      createdAt: new Date(),
      updatedAt: new Date(),
      attendees: [],
      reminders: [],
      meetingUrl: null,
      color: null,
      tags: ['special-chars', 'unicode:日本語'],
      transactionId: null,
      metadata: {},
    };

    const result = calendarEventSchema.safeParse(event);
    expect(result.success).toBe(true);
  });

  it('should handle very large numbers', () => {
    const transaction = {
      id: 'txn_123',
      userId: 'user_456',
      amount: 999999999.99,
      type: 'income',
      category: 'salary',
      description: 'Annual bonus',
      date: new Date(),
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
    };

    const result = transactionSchema.safeParse(transaction);
    expect(result.success).toBe(true);
  });
});
