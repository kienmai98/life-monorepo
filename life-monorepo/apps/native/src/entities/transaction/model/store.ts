/**
 * @module entities/transaction/model/store
 * @description Transaction entity state types
 */

import type { Transaction, TransactionFilter } from './types';

/**
 * Transaction state interface
 * Used as reference for stores that manage transactions
 */
export interface TransactionState {
  /** List of transactions */
  transactions: Transaction[];
  /** Current filter settings */
  filter: TransactionFilter;
  /** Loading state */
  isLoading: boolean;
  /** Error message or null */
  error: string | null;
  /** Whether more transactions can be loaded */
  hasMore: boolean;
  /** Current page for pagination */
  page: number;
}

/**
 * Default filter settings
 */
export const defaultFilter: TransactionFilter = {
  type: 'all',
  category: 'all',
};

/**
 * Initial transaction state
 */
export const initialTransactionState: TransactionState = {
  transactions: [],
  filter: defaultFilter,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};
