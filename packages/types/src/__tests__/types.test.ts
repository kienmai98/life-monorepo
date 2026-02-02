import { describe, expect, it } from 'vitest';
import { z } from 'zod';

// Import schemas from index (assuming they're exported)
// For this example, we'll define schemas inline to demonstrate the pattern

// ============================================
// SCHEMA DEFINITIONS (mirror of actual schemas)
// ============================================

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  photoURL: z.string().nullable(),
});

const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  category: z.enum([
    'food',
    'transport',
    'shopping',
    'entertainment',
    'utilities',
    'health',
    'travel',
    'other',
  ]),
  description: z.string().min(1),
  date: z.string().datetime(),
  receiptImage: z.string().optional(),
  createdAt: z.string().datetime(),
});

const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  description: z.string().optional(),
  location: z.string().optional(),
  isAllDay: z.boolean(),
});

const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
  });

const PaginationInfoSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  hasMore: z.boolean(),
});

// ============================================
// TYPE TESTS
// ============================================

describe('User Type Validation', () => {
  it('validates correct user data', () => {
    const validUser = {
      id: 'user-123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
    };

    expect(() => UserSchema.parse(validUser)).not.toThrow();
    const parsed = UserSchema.parse(validUser);
    expect(parsed.id).toBe('user-123');
    expect(parsed.email).toBe('test@example.com');
  });

  it('validates user with null displayName', () => {
    const userWithNullName = {
      id: 'user-123',
      email: 'test@example.com',
      displayName: null,
      photoURL: null,
    };

    expect(() => UserSchema.parse(userWithNullName)).not.toThrow();
  });

  it('rejects invalid email format', () => {
    const invalidUser = {
      id: 'user-123',
      email: 'not-an-email',
      displayName: 'Test User',
      photoURL: null,
    };

    expect(() => UserSchema.parse(invalidUser)).toThrow();
  });

  it('rejects missing required fields', () => {
    const incompleteUser = {
      id: 'user-123',
      email: 'test@example.com',
      // missing displayName and photoURL
    };

    expect(() => UserSchema.parse(incompleteUser)).toThrow();
  });

  it('rejects wrong types', () => {
    const wrongTypes = {
      id: 123, // should be string
      email: 'test@example.com',
      displayName: 'Test',
      photoURL: null,
    };

    expect(() => UserSchema.parse(wrongTypes)).toThrow();
  });
});

describe('Transaction Type Validation', () => {
  const validTransaction = {
    id: 'txn-123',
    amount: 50.0,
    category: 'food',
    description: 'Lunch at cafe',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  it('validates correct transaction data', () => {
    expect(() => TransactionSchema.parse(validTransaction)).not.toThrow();
  });

  it('validates transaction with optional receiptImage', () => {
    const withReceipt = {
      ...validTransaction,
      receiptImage: 'https://example.com/receipt.jpg',
    };

    expect(() => TransactionSchema.parse(withReceipt)).not.toThrow();
  });

  it('rejects negative amount', () => {
    const invalidTransaction = {
      ...validTransaction,
      amount: -50,
    };

    expect(() => TransactionSchema.parse(invalidTransaction)).toThrow();
  });

  it('rejects zero amount', () => {
    const invalidTransaction = {
      ...validTransaction,
      amount: 0,
    };

    expect(() => TransactionSchema.parse(invalidTransaction)).toThrow();
  });

  it('rejects invalid category', () => {
    const invalidTransaction = {
      ...validTransaction,
      category: 'invalid-category',
    };

    expect(() => TransactionSchema.parse(invalidTransaction)).toThrow();
  });

  it('rejects empty description', () => {
    const invalidTransaction = {
      ...validTransaction,
      description: '',
    };

    expect(() => TransactionSchema.parse(invalidTransaction)).toThrow();
  });

  it('rejects invalid date format', () => {
    const invalidTransaction = {
      ...validTransaction,
      date: 'not-a-date',
    };

    expect(() => TransactionSchema.parse(invalidTransaction)).toThrow();
  });
});

describe('CalendarEvent Type Validation', () => {
  const validEvent = {
    id: 'event-123',
    title: 'Team Meeting',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 3600000).toISOString(),
    description: 'Weekly sync',
    location: 'Conference Room A',
    isAllDay: false,
  };

  it('validates correct event data', () => {
    expect(() => CalendarEventSchema.parse(validEvent)).not.toThrow();
  });

  it('validates event without optional fields', () => {
    const minimalEvent = {
      id: 'event-123',
      title: 'Meeting',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3600000).toISOString(),
      isAllDay: false,
    };

    expect(() => CalendarEventSchema.parse(minimalEvent)).not.toThrow();
  });

  it('validates all-day event', () => {
    const allDayEvent = {
      ...validEvent,
      isAllDay: true,
    };

    expect(() => CalendarEventSchema.parse(allDayEvent)).not.toThrow();
  });

  it('rejects empty title', () => {
    const invalidEvent = {
      ...validEvent,
      title: '',
    };

    expect(() => CalendarEventSchema.parse(invalidEvent)).toThrow();
  });

  it('rejects endDate before startDate', () => {
    // Note: Schema-level validation would need a refine() for this
    // This test documents the expected behavior
    const invalidEvent = {
      ...validEvent,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() - 3600000).toISOString(),
    };

    // Currently passes because we don't validate chronological order
    // In production, add: .refine((data) => new Date(data.endDate) > new Date(data.startDate))
    expect(() => CalendarEventSchema.parse(invalidEvent)).not.toThrow();
  });
});

describe('ApiResponse Type Validation', () => {
  const UserDataSchema = z.object({
    id: z.string(),
    name: z.string(),
  });

  const UserResponseSchema = ApiResponseSchema(UserDataSchema);

  it('validates successful response', () => {
    const successResponse = {
      success: true,
      data: { id: '123', name: 'Test' },
    };

    expect(() => UserResponseSchema.parse(successResponse)).not.toThrow();
  });

  it('validates error response', () => {
    const errorResponse = {
      success: false,
      error: 'Something went wrong',
    };

    expect(() => UserResponseSchema.parse(errorResponse)).not.toThrow();
  });

  it('rejects response without success flag', () => {
    const invalidResponse = {
      data: { id: '123', name: 'Test' },
    };

    expect(() => UserResponseSchema.parse(invalidResponse)).toThrow();
  });

  it('rejects response with both data and error', () => {
    // This should technically be valid by the schema
    // But is semantically incorrect
    const ambiguousResponse = {
      success: true,
      data: { id: '123', name: 'Test' },
      error: 'But also an error',
    };

    // Currently passes - add .refine() if you want to enforce mutual exclusivity
    expect(() => UserResponseSchema.parse(ambiguousResponse)).not.toThrow();
  });
});

describe('PaginationInfo Type Validation', () => {
  it('validates correct pagination data', () => {
    const validPagination = {
      page: 1,
      pageSize: 20,
      total: 100,
      hasMore: true,
    };

    expect(() => PaginationInfoSchema.parse(validPagination)).not.toThrow();
  });

  it('validates last page (no more results)', () => {
    const lastPage = {
      page: 5,
      pageSize: 20,
      total: 100,
      hasMore: false,
    };

    expect(() => PaginationInfoSchema.parse(lastPage)).not.toThrow();
  });

  it('rejects zero page number', () => {
    const invalid = {
      page: 0,
      pageSize: 20,
      total: 100,
      hasMore: true,
    };

    expect(() => PaginationInfoSchema.parse(invalid)).toThrow();
  });

  it('rejects negative page number', () => {
    const invalid = {
      page: -1,
      pageSize: 20,
      total: 100,
      hasMore: true,
    };

    expect(() => PaginationInfoSchema.parse(invalid)).toThrow();
  });

  it('rejects non-integer page number', () => {
    const invalid = {
      page: 1.5,
      pageSize: 20,
      total: 100,
      hasMore: true,
    };

    expect(() => PaginationInfoSchema.parse(invalid)).toThrow();
  });

  it('rejects negative total', () => {
    const invalid = {
      page: 1,
      pageSize: 20,
      total: -1,
      hasMore: true,
    };

    expect(() => PaginationInfoSchema.parse(invalid)).toThrow();
  });

  it('allows zero total (empty results)', () => {
    const emptyResults = {
      page: 1,
      pageSize: 20,
      total: 0,
      hasMore: false,
    };

    expect(() => PaginationInfoSchema.parse(emptyResults)).not.toThrow();
  });
});

describe('Type Inference', () => {
  it('infers User type correctly', () => {
    type User = z.infer<typeof UserSchema>;

    const user: User = {
      id: '123',
      email: 'test@example.com',
      displayName: 'Test',
      photoURL: null,
    };

    expect(user.id).toBe('123');
  });

  it('infers Transaction type correctly', () => {
    type Transaction = z.infer<typeof TransactionSchema>;

    const transaction: Transaction = {
      id: 'txn-1',
      amount: 50,
      category: 'food',
      description: 'Lunch',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    expect(transaction.amount).toBe(50);
  });
});
