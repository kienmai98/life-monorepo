/**
 * Transaction entity types
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
  | 'income'
  | 'investment'
  | 'other';

export type TransactionType = 'income' | 'expense';

export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'mobile_payment'
  | 'check'
  | 'other';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  category: TransactionCategory;
  description: string;
  date: string;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  receiptUrl?: string;
  location?: GeoLocation;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  category?: TransactionCategory | 'all';
  type?: TransactionType | 'all';
  searchQuery?: string;
  tags?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  spendingByCategory: Record<TransactionCategory, number>;
  transactionCount: number;
}
