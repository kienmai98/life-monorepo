/**
 * @module entities/transaction/model/selectors
 * @description Transaction entity selectors
 */

import type { TransactionState } from './store';

/**
 * Select all transactions
 */
export const selectTransactions = (state: TransactionState): TransactionState['transactions'] =>
  state.transactions;

/**
 * Select loading state
 */
export const selectIsLoading = (state: TransactionState): boolean => state.isLoading;

/**
 * Select current error
 */
export const selectError = (state: TransactionState): TransactionState['error'] =>
  state.error;

/**
 * Select current filter
 */
export const selectFilter = (state: TransactionState): TransactionState['filter'] =>
  state.filter;

/**
 * Select hasMore flag for pagination
 */
export const selectHasMore = (state: TransactionState): boolean => state.hasMore;

/**
 * Select total transaction count
 */
export const selectTransactionCount = (state: TransactionState): number => state.transactions.length;
