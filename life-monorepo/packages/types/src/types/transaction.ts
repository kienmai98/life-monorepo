/**
 * Transaction-related type definitions
 * @module @life/types/types
 */

import type { Branded, Nullable, Optional, Result } from '../index.js';
import type { UserId } from './user.js';

// =============================================================================
// TRANSACTION IDENTIFIERS
// =============================================================================

/** Unique identifier for transactions */
export type TransactionId = Branded<string, 'TransactionId'>;

/** Unique identifier for transaction categories */
export type CategoryId = Branded<string, 'CategoryId'>;

// =============================================================================
// TRANSACTION TYPES
// =============================================================================

/**
 * Transaction type - income or expense
 */
export type TransactionType = 'income' | 'expense';

/**
 * Standard transaction categories
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
  | 'salary'
  | 'investment'
  | 'gift'
  | 'other';

/**
 * Income-specific categories
 */
export type IncomeCategory = Extract<TransactionCategory, 'salary' | 'investment' | 'gift' | 'other'>;

/**
 * Expense-specific categories
 */
export type ExpenseCategory = Exclude<TransactionCategory, IncomeCategory>;

/**
 * Transaction status
 */
export type TransactionStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

/**
 * Payment method used for transaction
 */
export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'digital_wallet'
  | 'check'
  | 'cryptocurrency'
  | 'other';

// =============================================================================
// TRANSACTION ENTITY
// =============================================================================

/**
 * Base transaction properties shared across all transaction types
 */
export interface TransactionBase {
  /** Unique transaction identifier */
  readonly id: TransactionId;
  /** User who owns this transaction */
  readonly userId: UserId;
  /** Transaction amount (always positive) */
  readonly amount: number;
  /** Transaction type - income or expense */
  readonly type: TransactionType;
  /** Transaction category */
  readonly category: TransactionCategory;
  /** Description of the transaction */
  readonly description: string;
  /** When the transaction occurred */
  readonly date: Date;
  /** Transaction status */
  readonly status: TransactionStatus;
  /** Payment method used */
  readonly paymentMethod: PaymentMethod;
  /** When the transaction was created in the system */
  readonly createdAt: Date;
  /** When the transaction was last updated */
  readonly updatedAt: Date;
}

/**
 * Transaction with all fields
 * Includes optional receipt and location information
 */
export interface Transaction extends TransactionBase {
  /** URL to receipt image (if uploaded) */
  readonly receiptImage: Nullable<string>;
  /** Location where transaction occurred */
  readonly location: Nullable<LocationInfo>;
  /** Tags for organization */
  readonly tags: readonly string[];
  /** Additional metadata */
  readonly metadata: Record<string, unknown>;
  /** Whether transaction is recurring */
  readonly isRecurring: boolean;
  /** Recurrence rule (if applicable) */
  readonly recurrenceRule: Nullable<RecurrenceRule>;
  /** Original currency (if different from user's) */
  readonly originalCurrency: Nullable<string>;
  /** Exchange rate at time of transaction */
  readonly exchangeRate: Nullable<number>;
}

/**
 * Location information for transactions
 */
export interface LocationInfo {
  readonly name: string;
  readonly address: Nullable<string>;
  readonly latitude: Nullable<number>;
  readonly longitude: Nullable<number>;
}

/**
 * Recurrence rule for recurring transactions
 */
export interface RecurrenceRule {
  /** How often the transaction repeats */
  readonly frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Interval (e.g., every 2 weeks) */
  readonly interval: number;
  /** Day of week (0-6, Sunday=0) for weekly recurrence */
  readonly dayOfWeek?: number;
  /** Day of month (1-31) for monthly/yearly recurrence */
  readonly dayOfMonth?: number;
  /** Month (0-11) for yearly recurrence */
  readonly month?: number;
  /** End date for recurrence (undefined = forever) */
  readonly endDate?: Date;
  /** Maximum number of occurrences */
  readonly count?: number;
}

// =============================================================================
// TRANSACTION INPUTS
// =============================================================================

/**
 * Input for creating a new transaction
 */
export interface CreateTransactionInput {
  readonly amount: number;
  readonly type: TransactionType;
  readonly category: TransactionCategory;
  readonly description: string;
  readonly date: Date;
  readonly paymentMethod: PaymentMethod;
  readonly receiptImage?: string;
  readonly location?: LocationInfo;
  readonly tags?: readonly string[];
  readonly metadata?: Record<string, unknown>;
  readonly isRecurring?: boolean;
  readonly recurrenceRule?: RecurrenceRule;
  readonly originalCurrency?: string;
  readonly exchangeRate?: number;
}

/**
 * Input for updating an existing transaction
 * All fields are optional for partial updates
 */
export interface UpdateTransactionInput {
  readonly amount?: number;
  readonly category?: TransactionCategory;
  readonly description?: string;
  readonly date?: Date;
  readonly status?: TransactionStatus;
  readonly paymentMethod?: PaymentMethod;
  readonly receiptImage?: Nullable<string>;
  readonly location?: Nullable<LocationInfo>;
  readonly tags?: readonly string[];
  readonly metadata?: Record<string, unknown>;
}

// =============================================================================
// TRANSACTION SUMMARIES & STATISTICS
// =============================================================================

/**
 * Transaction summary for a specific period
 */
export interface TransactionSummary {
  /** Total income for the period */
  readonly totalIncome: number;
  /** Total expenses for the period */
  readonly totalExpenses: number;
  /** Net amount (income - expenses) */
  readonly netAmount: number;
  /** Number of transactions */
  readonly transactionCount: number;
  /** Breakdown by category */
  readonly byCategory: Record<TransactionCategory, CategorySummary>;
  /** Start date of the period */
  readonly startDate: Date;
  /** End date of the period */
  readonly endDate: Date;
}

/**
 * Summary for a specific category
 */
export interface CategorySummary {
  readonly category: TransactionCategory;
  readonly total: number;
  readonly count: number;
  readonly percentage: number;
}

/**
 * Monthly transaction summary
 */
export interface MonthlySummary {
  readonly year: number;
  readonly month: number;
  readonly income: number;
  readonly expenses: number;
  readonly net: number;
  readonly count: number;
}

/**
 * Transaction trend data
 */
export interface TransactionTrend {
  readonly period: string;
  readonly income: number;
  readonly expenses: number;
  readonly net: number;
}

// =============================================================================
// TRANSACTION FILTERS
// =============================================================================

/**
 * Transaction search filters
 */
export interface TransactionFilters {
  /** Filter by transaction type */
  readonly type?: TransactionType;
  /** Filter by category (can be multiple) */
  readonly categories?: readonly TransactionCategory[];
  /** Filter by status */
  readonly status?: TransactionStatus;
  /** Filter by payment method */
  readonly paymentMethod?: PaymentMethod;
  /** Start date for date range */
  readonly startDate?: Date;
  /** End date for date range */
  readonly endDate?: Date;
  /** Minimum amount */
  readonly minAmount?: number;
  /** Maximum amount */
  readonly maxAmount?: number;
  /** Search query for description */
  readonly searchQuery?: string;
  /** Filter by tags (must have all) */
  readonly tags?: readonly string[];
  /** Include recurring transactions */
  readonly includeRecurring?: boolean;
}

/**
 * Transaction sort options
 */
export type TransactionSortField = 'date' | 'amount' | 'description' | 'category' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

/**
 * Transaction sort configuration
 */
export interface TransactionSort {
  readonly field: TransactionSortField;
  readonly order: SortOrder;
}

// =============================================================================
// BUDGET TYPES
// =============================================================================

/**
 * Budget period type
 */
export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

/**
 * Budget configuration
 */
export interface Budget {
  readonly id: Branded<string, 'BudgetId'>;
  readonly userId: UserId;
  readonly name: string;
  readonly period: BudgetPeriod;
  /** Total budget amount for the period */
  readonly totalAmount: number;
  /** Category-specific budgets (optional) */
  readonly categoryBudgets: Record<ExpenseCategory, number>;
  /** When the budget starts */
  readonly startDate: Date;
  /** When the budget ends (undefined = ongoing) */
  readonly endDate: Nullable<Date>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * Budget progress for current period
 */
export interface BudgetProgress {
  readonly budget: Budget;
  /** Amount spent so far */
  readonly spent: number;
  /** Amount remaining */
  readonly remaining: number;
  /** Percentage spent (0-100) */
  readonly percentageSpent: number;
  /** Whether budget is exceeded */
  readonly isOverBudget: boolean;
  /** Progress by category */
  readonly categoryProgress: Record<ExpenseCategory, CategoryProgress>;
}

/**
 * Progress for a specific category
 */
export interface CategoryProgress {
  readonly category: ExpenseCategory;
  readonly budgeted: number;
  readonly spent: number;
  readonly remaining: number;
  readonly percentageSpent: number;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a value is a valid TransactionType
 */
export function isTransactionType(value: unknown): value is TransactionType {
  return value === 'income' || value === 'expense';
}

/**
 * Type guard to check if a value is a valid TransactionCategory
 */
export function isTransactionCategory(value: unknown): value is TransactionCategory {
  const categories: readonly string[] = [
    'food', 'transport', 'shopping', 'entertainment', 'utilities',
    'health', 'travel', 'education', 'salary', 'investment', 'gift', 'other'
  ];
  return typeof value === 'string' && categories.includes(value);
}

/**
 * Type guard to check if a value is a valid TransactionStatus
 */
export function isTransactionStatus(value: unknown): value is TransactionStatus {
  return value === 'pending' || value === 'completed' || value === 'cancelled' || value === 'refunded';
}

/**
 * Type guard to check if a value is a valid PaymentMethod
 */
export function isPaymentMethod(value: unknown): value is PaymentMethod {
  const methods: readonly string[] = [
    'cash', 'credit_card', 'debit_card', 'bank_transfer',
    'digital_wallet', 'check', 'cryptocurrency', 'other'
  ];
  return typeof value === 'string' && methods.includes(value);
}

/**
 * Type guard to check if a category is for income
 */
export function isIncomeCategory(category: TransactionCategory): category is IncomeCategory {
  return category === 'salary' || category === 'investment' || category === 'gift' || category === 'other';
}

/**
 * Type guard to check if a category is for expenses
 */
export function isExpenseCategory(category: TransactionCategory): category is ExpenseCategory {
  return !isIncomeCategory(category);
}
