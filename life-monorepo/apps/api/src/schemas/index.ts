import { z } from 'zod';

/**
 * Common validation schemas
 */
export const CommonSchemas = {
  id: z.string().uuid(),
  email: z.string().email().min(5).max(255).toLowerCase().trim(),
  password: z.string().min(8).max(128).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  displayName: z.string().min(2).max(100).trim().optional(),
  pagination: {
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  },
  dateRange: {
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  },
} as const;

/**
 * Auth validation schemas
 */
export const AuthSchemas = {
  login: z.object({
    email: CommonSchemas.email,
    password: z.string().min(1),
  }),

  register: z.object({
    email: CommonSchemas.email,
    password: CommonSchemas.password,
    displayName: CommonSchemas.displayName,
  }),

  resetPassword: z.object({
    email: CommonSchemas.email,
  }),
} as const;

/**
 * Transaction validation schemas
 */
export const TransactionTypeEnum = z.enum(['income', 'expense']);

export const TransactionSchemas = {
  create: z.object({
    amount: z.number().positive().safe(),
    category: z.string().min(1).max(50).trim(),
    description: z.string().min(1).max(500).trim(),
    type: TransactionTypeEnum.default('expense'),
    date: z.string().datetime().default(() => new Date().toISOString()),
  }),

  update: z.object({
    amount: z.number().positive().safe().optional(),
    category: z.string().min(1).max(50).trim().optional(),
    description: z.string().min(1).max(500).trim().optional(),
    type: TransactionTypeEnum.optional(),
    date: z.string().datetime().optional(),
  }),

  query: z.object({
    page: CommonSchemas.pagination.page,
    limit: CommonSchemas.pagination.limit,
    category: z.string().optional(),
    type: TransactionTypeEnum.optional(),
    startDate: CommonSchemas.dateRange.startDate,
    endDate: CommonSchemas.dateRange.endDate,
  }),

  params: z.object({
    id: CommonSchemas.id,
  }),
} as const;

// Export types
export type LoginInput = z.infer<typeof AuthSchemas.login>;
export type RegisterInput = z.infer<typeof AuthSchemas.register>;
export type ResetPasswordInput = z.infer<typeof AuthSchemas.resetPassword>;
export type CreateTransactionInput = z.infer<typeof TransactionSchemas.create>;
export type UpdateTransactionInput = z.infer<typeof TransactionSchemas.update>;
export type TransactionQueryInput = z.infer<typeof TransactionSchemas.query>;
export type TransactionParamsInput = z.infer<typeof TransactionSchemas.params>;
