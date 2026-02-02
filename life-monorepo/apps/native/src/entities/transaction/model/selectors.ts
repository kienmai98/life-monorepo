import type { TransactionState } from './store';

export const selectTransactions = (state: TransactionState) => state.transactions;
export const selectIsLoading = (state: TransactionState) => state.isLoading;
export const selectError = (state: TransactionState) => state.error;
export const selectFilter = (state: TransactionState) => state.filter;
export const selectHasMore = (state: TransactionState) => state.hasMore;
export const selectTransactionCount = (state: TransactionState) => state.transactions.length;
