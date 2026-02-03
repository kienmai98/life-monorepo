/**
 * @module entities/transaction/model/types
 * @description Transaction entity types
 */

/** Transaction category types */
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

/** Transaction type - income or expense */
export type TransactionType = 'income' | 'expense';

/** Payment method types */
export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'mobile_payment'
  | 'check'
  | 'other';

/** Geographic location for transaction */
export interface GeoLocation {
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
  /** Human-readable address (optional) */
  address?: string;
}

/**
 * Transaction entity
 * Represents a financial transaction (income or expense)
 */
export interface Transaction {
  /** Unique transaction ID */
  id: string;
  /** Transaction amount */
  amount: number;
  /** Currency code (e.g., 'USD') */
  currency: string;
  /** Transaction category */
  category: TransactionCategory;
  /** Description of the transaction */
  description: string;
  /** ISO date string */
  date: string;
  /** Whether it's income or expense */
  type: TransactionType;
  /** Payment method used */
  paymentMethod: PaymentMethod;
  /** URL to receipt image (optional) */
  receiptUrl?: string;
  /** Location where transaction occurred (optional) */
  location?: GeoLocation;
  /** Tags for categorization */
  tags: string[];
  /** ISO timestamp when created */
  createdAt: string;
  /** ISO timestamp when last updated */
  updatedAt: string;
  /** Whether transaction has been synced to server */
  synced: boolean;
}

/**
 * Filter options for transactions
 */
export interface TransactionFilter {
  /** Filter by start date (ISO string) */
  startDate?: string;
  /** Filter by end date (ISO string) */
  endDate?: string;
  /** Filter by category or 'all' */
  category?: TransactionCategory | 'all';
  /** Filter by type or 'all' */
  type?: TransactionType | 'all';
  /** Search query string */
  searchQuery?: string;
  /** Filter by tags */
  tags?: string[];
  /** Minimum amount filter */
  minAmount?: number;
  /** Maximum amount filter */
  maxAmount?: number;
}

/**
 * Calculated statistics for transactions
 */
export interface TransactionStats {
  /** Total income amount */
  totalIncome: number;
  /** Total expenses amount */
  totalExpenses: number;
  /** Net balance (income - expenses) */
  netBalance: number;
  /** Spending broken down by category */
  spendingByCategory: Record<TransactionCategory, number>;
  /** Total number of transactions */
  transactionCount: number;
}
