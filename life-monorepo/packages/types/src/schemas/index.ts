/**
 * Zod schemas for runtime validation
 * @module @life/types/schemas
 *
 * @example
 * ```typescript
 * import { userSchema, transactionSchema } from '@life/types/schemas';
 *
 * // Validate user data
 * const result = userSchema.safeParse(unknownData);
 * if (result.success) {
 *   console.log(result.data);
 * }
 * ```
 */

import { z } from 'zod';

// =============================================================================
// COMMON SCHEMAS
// =============================================================================

/** ISO date string schema */
export const isoDateSchema = z.string().datetime();

/** Email schema with validation */
export const emailSchema = z.string().email();

/** URL schema */
export const urlSchema = z.string().url();

/** Non-empty string schema */
export const nonEmptyStringSchema = z.string().min(1);

/** Positive number schema */
export const positiveNumberSchema = z.number().positive();

/** Non-negative number schema */
export const nonNegativeNumberSchema = z.number().min(0);

/** UUID schema */
export const uuidSchema = z.string().uuid();

/** Hex color schema */
export const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

// =============================================================================
// USER SCHEMAS
// =============================================================================

/** Auth provider enum schema */
export const authProviderSchema = z.enum(['email', 'google', 'apple', 'facebook']);

/** User role enum schema */
export const userRoleSchema = z.enum(['admin', 'user', 'guest']);

/** User status enum schema */
export const userStatusSchema = z.enum(['active', 'inactive', 'suspended', 'pending']);

/** Device info schema */
export const deviceInfoSchema = z.object({
  deviceId: nonEmptyStringSchema,
  platform: z.enum(['ios', 'android', 'web']),
  osVersion: nonEmptyStringSchema,
  appVersion: nonEmptyStringSchema,
  model: z.string().nullable(),
  brand: z.string().nullable(),
});

/** User preferences schema */
export const userPreferencesSchema = z.object({
  notifications: z.object({
    enabled: z.boolean(),
    push: z.object({
      enabled: z.boolean(),
      transactions: z.boolean(),
      calendar: z.boolean(),
      reminders: z.boolean(),
      marketing: z.boolean(),
    }),
    email: z.object({
      enabled: z.boolean(),
      weeklyReport: z.boolean(),
      monthlyReport: z.boolean(),
      marketing: z.boolean(),
    }),
  }),
  privacy: z.object({
    shareAnalytics: z.boolean(),
    biometricEnabled: z.boolean(),
    autoLockTimeout: z.number().min(0),
    maskSensitiveData: z.boolean(),
  }),
  display: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    currency: nonEmptyStringSchema,
    dateFormat: nonEmptyStringSchema,
    timeFormat: z.enum(['12h', '24h']),
    numberFormat: nonEmptyStringSchema,
    compactNumbers: z.boolean(),
  }),
});

/** User profile schema */
export const userProfileSchema = z.object({
  id: nonEmptyStringSchema,
  email: emailSchema,
  displayName: z.string().nullable(),
  photoURL: urlSchema.nullable(),
  provider: authProviderSchema,
  role: userRoleSchema,
  status: userStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().nullable(),
});

/** Full user schema */
export const userSchema = userProfileSchema.extend({
  phoneNumber: z.string().nullable(),
  language: nonEmptyStringSchema,
  timezone: nonEmptyStringSchema,
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  preferences: userPreferencesSchema,
});

/** Login credentials schema */
export const loginCredentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});

/** Register input schema */
export const registerInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  }),
  confirmPassword: z.string(),
  displayName: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/** Auth session schema */
export const authSessionSchema = z.object({
  id: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  token: nonEmptyStringSchema,
  refreshToken: nonEmptyStringSchema,
  expiresAt: z.date(),
  createdAt: z.date(),
  deviceInfo: deviceInfoSchema,
});

// =============================================================================
// TRANSACTION SCHEMAS
// =============================================================================

/** Transaction type enum schema */
export const transactionTypeSchema = z.enum(['income', 'expense']);

/** Transaction category enum schema */
export const transactionCategorySchema = z.enum([
  'food', 'transport', 'shopping', 'entertainment', 'utilities',
  'health', 'travel', 'education', 'salary', 'investment', 'gift', 'other'
]);

/** Transaction status enum schema */
export const transactionStatusSchema = z.enum(['pending', 'completed', 'cancelled', 'refunded']);

/** Payment method enum schema */
export const paymentMethodSchema = z.enum([
  'cash', 'credit_card', 'debit_card', 'bank_transfer',
  'digital_wallet', 'check', 'cryptocurrency', 'other'
]);

/** Location info schema */
export const locationInfoSchema = z.object({
  name: nonEmptyStringSchema,
  address: z.string().nullable(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
});

/** Recurrence rule schema */
export const recurrenceRuleSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  interval: z.number().min(1).default(1),
  dayOfWeek: z.number().min(0).max(6).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  month: z.number().min(0).max(11).optional(),
  endDate: z.date().optional(),
  count: z.number().min(1).optional(),
});

/** Transaction schema */
export const transactionSchema = z.object({
  id: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  amount: positiveNumberSchema,
  type: transactionTypeSchema,
  category: transactionCategorySchema,
  description: nonEmptyStringSchema,
  date: z.date(),
  status: transactionStatusSchema,
  paymentMethod: paymentMethodSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  receiptImage: urlSchema.nullable(),
  location: locationInfoSchema.nullable(),
  tags: z.array(nonEmptyStringSchema),
  metadata: z.record(z.unknown()),
  isRecurring: z.boolean(),
  recurrenceRule: recurrenceRuleSchema.nullable(),
  originalCurrency: nonEmptyStringSchema.nullable(),
  exchangeRate: z.number().positive().nullable(),
});

/** Create transaction input schema */
export const createTransactionInputSchema = z.object({
  amount: positiveNumberSchema,
  type: transactionTypeSchema,
  category: transactionCategorySchema,
  description: nonEmptyStringSchema.max(500),
  date: z.date(),
  paymentMethod: paymentMethodSchema,
  receiptImage: urlSchema.optional(),
  location: locationInfoSchema.optional(),
  tags: z.array(nonEmptyStringSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: recurrenceRuleSchema.optional(),
  originalCurrency: nonEmptyStringSchema.optional(),
  exchangeRate: z.number().positive().optional(),
});

/** Update transaction input schema */
export const updateTransactionInputSchema = z.object({
  amount: positiveNumberSchema.optional(),
  category: transactionCategorySchema.optional(),
  description: nonEmptyStringSchema.max(500).optional(),
  date: z.date().optional(),
  status: transactionStatusSchema.optional(),
  paymentMethod: paymentMethodSchema.optional(),
  receiptImage: urlSchema.nullable().optional(),
  location: locationInfoSchema.nullable().optional(),
  tags: z.array(nonEmptyStringSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
});

/** Budget schema */
export const budgetSchema = z.object({
  id: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  name: nonEmptyStringSchema,
  period: z.enum(['weekly', 'monthly', 'yearly']),
  totalAmount: positiveNumberSchema,
  categoryBudgets: z.record(positiveNumberSchema),
  startDate: z.date(),
  endDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// =============================================================================
// CALENDAR SCHEMAS
// =============================================================================

/** Event type enum schema */
export const eventTypeSchema = z.enum([
  'appointment', 'meeting', 'reminder', 'task',
  'birthday', 'holiday', 'transaction', 'other'
]);

/** Event priority enum schema */
export const eventPrioritySchema = z.enum(['low', 'medium', 'high']);

/** Event visibility enum schema */
export const eventVisibilitySchema = z.enum(['public', 'private', 'confidential']);

/** Event status enum schema */
export const eventStatusSchema = z.enum(['confirmed', 'tentative', 'cancelled']);

/** Attendee schema */
export const attendeeSchema = z.object({
  email: emailSchema,
  displayName: z.string().nullable(),
  status: z.enum(['pending', 'accepted', 'declined', 'tentative']),
  isRequired: z.boolean(),
});

/** Reminder schema */
export const reminderSchema = z.object({
  id: nonEmptyStringSchema,
  minutesBefore: z.number().min(0),
  type: z.enum(['notification', 'email', 'sms']),
  enabled: z.boolean(),
});

/** Calendar event recurrence rule schema */
export const eventRecurrenceRuleSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  interval: z.number().min(1).default(1),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  month: z.number().min(0).max(11).optional(),
  endDate: z.date().optional(),
  count: z.number().min(1).optional(),
  exceptions: z.array(z.date()).optional(),
});

/** Calendar event schema */
export const calendarEventSchema = z.object({
  id: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  type: eventTypeSchema,
  status: eventStatusSchema,
  isAllDay: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().nullable(),
  location: locationInfoSchema.nullable(),
  priority: eventPrioritySchema,
  visibility: eventVisibilitySchema,
  isRecurring: z.boolean(),
  recurrenceRule: eventRecurrenceRuleSchema.nullable(),
  calendarId: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  attendees: z.array(attendeeSchema),
  reminders: z.array(reminderSchema),
  meetingUrl: urlSchema.nullable(),
  color: hexColorSchema.nullable(),
  tags: z.array(nonEmptyStringSchema),
  transactionId: nonEmptyStringSchema.nullable(),
  metadata: z.record(z.unknown()),
});

/** Create event input schema */
export const createEventInputSchema = z.object({
  title: nonEmptyStringSchema,
  type: eventTypeSchema,
  startDate: z.date(),
  endDate: z.date(),
  isAllDay: z.boolean().optional(),
  description: z.string().optional(),
  location: locationInfoSchema.optional(),
  priority: eventPrioritySchema.optional(),
  visibility: eventVisibilitySchema.optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: eventRecurrenceRuleSchema.optional(),
  calendarId: nonEmptyStringSchema,
  attendees: z.array(attendeeSchema).optional(),
  reminders: z.array(reminderSchema).optional(),
  meetingUrl: urlSchema.optional(),
  color: hexColorSchema.optional(),
  tags: z.array(nonEmptyStringSchema).optional(),
  transactionId: nonEmptyStringSchema.optional(),
});

/** Update event input schema */
export const updateEventInputSchema = z.object({
  title: nonEmptyStringSchema.optional(),
  type: eventTypeSchema.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isAllDay: z.boolean().optional(),
  description: z.string().nullable().optional(),
  location: locationInfoSchema.nullable().optional(),
  priority: eventPrioritySchema.optional(),
  visibility: eventVisibilitySchema.optional(),
  status: eventStatusSchema.optional(),
  attendees: z.array(attendeeSchema).optional(),
  reminders: z.array(reminderSchema).optional(),
  meetingUrl: urlSchema.nullable().optional(),
  color: hexColorSchema.nullable().optional(),
  tags: z.array(nonEmptyStringSchema).optional(),
});

/** Calendar schema */
export const calendarSchema = z.object({
  id: nonEmptyStringSchema,
  userId: nonEmptyStringSchema,
  name: nonEmptyStringSchema,
  description: z.string().nullable(),
  color: hexColorSchema,
  timezone: nonEmptyStringSchema,
  isDefault: z.boolean(),
  isVisible: z.boolean(),
  isReadOnly: z.boolean(),
  syncEnabled: z.boolean(),
  externalSource: z.object({
    provider: z.enum(['google', 'apple', 'outlook', 'other']),
    externalId: nonEmptyStringSchema,
    lastSyncedAt: z.date().nullable(),
    syncToken: z.string().nullable(),
  }).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// =============================================================================
// API RESPONSE SCHEMAS
// =============================================================================

/** API error schema */
export const apiErrorSchema = z.object({
  code: nonEmptyStringSchema,
  message: nonEmptyStringSchema,
  details: z.record(z.unknown()).optional(),
  requestId: z.string().optional(),
});

/** Pagination info schema */
export const paginationInfoSchema = z.object({
  total: z.number().min(0),
  hasMore: z.boolean(),
  nextCursor: z.string().optional(),
  currentPage: z.number().min(1).optional(),
  totalPages: z.number().min(1).optional(),
});

/** API success response schema (generic) */
export function createApiSuccessSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: z.object({
      pagination: paginationInfoSchema.optional(),
      timestamp: isoDateSchema,
    }).optional(),
  });
}

/** API failure response schema */
export const apiFailureSchema = z.object({
  success: z.literal(false),
  error: apiErrorSchema,
  meta: z.object({
    timestamp: isoDateSchema,
  }).optional(),
});

/** API response schema (generic) */
export function createApiResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.union([createApiSuccessSchema(dataSchema), apiFailureSchema]);
}
