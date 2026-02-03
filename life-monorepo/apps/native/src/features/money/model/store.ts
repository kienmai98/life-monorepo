/**
 * @module features/money/model/store
 * @description Money/Transactions store using Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Transaction, TransactionFilter, TransactionStats } from '@/entities/transaction';

/**
 * Money store state interface
 */
export interface MoneyState {
  /** List of transactions */
  transactions: Transaction[];
  /** Current filter settings */
  filter: TransactionFilter;
  /** Loading state for async operations */
  isLoading: boolean;
  /** Error message or null */
  error: string | null;
  /** Whether more transactions can be fetched */
  hasMore: boolean;
  /** Current page for pagination */
  page: number;
}

/**
 * Initial state for money store
 */
export const initialMoneyState: MoneyState = {
  transactions: [],
  filter: { type: 'all', category: 'all' },
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

/**
 * Money store interface with actions
 */
export interface MoneyStore extends MoneyState {
  /** Add a new transaction */
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'synced'>) => void;
  /** Update an existing transaction */
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  /** Delete a transaction by ID */
  deleteTransaction: (id: string) => void;
  /** Fetch transactions for a user */
  fetchTransactions: (userId: string) => Promise<void>;
  /** Load more transactions (pagination) */
  loadMore: (userId: string) => Promise<void>;
  /** Set filter and refetch */
  setFilter: (filter: TransactionFilter) => void;
  /** Calculate stats from current transactions */
  getStats: () => TransactionStats;
  /** Clear all errors */
  clearError: () => void;
}

/**
 * Helper to calculate transaction stats
 */
const calculateStats = (transactions: Transaction[]): TransactionStats => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const spendingByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netBalance: income - expenses,
    spendingByCategory: spendingByCategory as Record<Transaction['category'], number>,
    transactionCount: transactions.length,
  };
};

/**
 * Generate unique transaction ID
 */
const generateId = (): string => {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Money store hook
 * @example
 * ```tsx
 * const { transactions, addTransaction, getStats } = useMoneyStore();
 * const stats = getStats();
 * ```
 */
export const useMoneyStore = create<MoneyStore>()(
  persist(
    (set, get) => ({
      ...initialMoneyState,

      addTransaction: (transaction): void => {
        const newTransaction: Transaction = {
          ...transaction,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          synced: false,
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      updateTransaction: (id, updates): void => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString(), synced: false }
              : t
          ),
        }));
      },

      deleteTransaction: (id): void => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      fetchTransactions: async (userId): Promise<void> => {
        set({ isLoading: true, error: null, page: 1 });
        try {
          // TODO: Implement actual API call
          console.log('Fetch transactions for:', userId);
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch transactions',
            isLoading: false,
          });
        }
      },

      loadMore: async (userId): Promise<void> => {
        const { isLoading, hasMore, page } = get();
        if (isLoading || !hasMore) return;

        set({ isLoading: true });
        try {
          // TODO: Implement pagination
          console.log('Load more for:', userId, 'page:', page + 1);
          set((state) => ({ page: state.page + 1, isLoading: false }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load more transactions',
            isLoading: false,
          });
        }
      },

      setFilter: (filter): void => {
        set({ filter, transactions: [], page: 1, hasMore: true });
      },

      getStats: (): TransactionStats => {
        return calculateStats(get().transactions);
      },

      clearError: (): void => {
        set({ error: null });
      },
    }),
    {
      name: 'money-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): Pick<MoneyState, 'transactions'> => ({
        transactions: state.transactions,
      }),
    }
  )
);

/**
 * Hook for accessing transactions with derived state
 * @deprecated Use useMoneyStore directly with selectors for better performance
 */
export const useTransactions = () => {
  const store = useMoneyStore();
  return {
    transactions: store.transactions,
    filter: store.filter,
    isLoading: store.isLoading,
    error: store.error,
    hasMore: store.hasMore,
    addTransaction: store.addTransaction,
    updateTransaction: store.updateTransaction,
    deleteTransaction: store.deleteTransaction,
    fetchTransactions: store.fetchTransactions,
    loadMore: store.loadMore,
    setFilter: store.setFilter,
    getStats: store.getStats,
    clearError: store.clearError,
  };
};
