import type { Transaction, TransactionFilter } from './types';

export interface TransactionState {
  transactions: Transaction[];
  filter: TransactionFilter;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export const defaultFilter: TransactionFilter = {
  type: 'all',
  category: 'all',
};

export const initialTransactionState: TransactionState = {
  transactions: [],
  filter: defaultFilter,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};
