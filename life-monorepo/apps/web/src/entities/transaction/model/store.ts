import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

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

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  category: TransactionCategory;
  description: string;
  date: string;
  type: TransactionType;
  paymentMethod: string;
  tags: string[];
}

export interface TransactionStats {
  income: number;
  expenses: number;
  total: number;
  byCategory: Record<TransactionCategory, number>;
  // Aliases for UI compatibility
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  spendingByCategory: Record<string, number>;
  transactionCount: number;
}

export interface TransactionFilter {
  type?: TransactionType;
  category?: TransactionCategory;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}

interface TransactionState {
  // State
  transactions: Transaction[];
  filter: TransactionFilter | null;
  isLoading: boolean;
  error: string | null;

  // Computed (selectors)
  getFilteredTransactions: () => Transaction[];
  getStats: () => TransactionStats;
  getStatsForMonth: (month: number, year: number) => TransactionStats;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilter: (filter: TransactionFilter | null) => void;
  clearFilter: () => void;
  clearError: () => void;
}

/**
 * Transaction store using Zustand with persistence
 * Features:
 * - Type-safe state management
 * - Persisted storage
 * - Computed selectors
 * - DevTools integration
 */
export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        transactions: [],
        filter: null,
        isLoading: false,
        error: null,

        // Computed selectors
        getFilteredTransactions: () => {
          const { transactions, filter } = get();
          
          if (!filter) return transactions;

          return transactions.filter((t) => {
            const date = new Date(t.date);
            
            if (filter.type && t.type !== filter.type) return false;
            if (filter.category && t.category !== filter.category) return false;
            if (filter.startDate && date < filter.startDate) return false;
            if (filter.endDate && date > filter.endDate) return false;
            if (filter.minAmount && t.amount < filter.minAmount) return false;
            if (filter.maxAmount && t.amount > filter.maxAmount) return false;
            
            return true;
          });
        },

        getStats: () => {
          const { transactions } = get();
          
          const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
          
          const expenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

          const byCategory = transactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {} as Record<TransactionCategory, number>);

          // Build spendingByCategory (expenses only)
          const spendingByCategory: Record<string, number> = {};
          transactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
              spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + t.amount;
            });

          return {
            income,
            expenses,
            total: income - expenses,
            byCategory,
            // Aliases for UI compatibility
            totalIncome: income,
            totalExpenses: expenses,
            netBalance: income - expenses,
            spendingByCategory,
            transactionCount: transactions.length,
          };
        },

        getStatsForMonth: (month: number, year: number) => {
          const { transactions } = get();
          
          const monthTransactions = transactions.filter((t) => {
            const date = new Date(t.date);
            return date.getMonth() === month && date.getFullYear() === year;
          });

          const income = monthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
          
          const expenses = monthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

          const byCategory = monthTransactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {} as Record<TransactionCategory, number>);

          // Build spendingByCategory (expenses only)
          const spendingByCategory: Record<string, number> = {};
          monthTransactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
              spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + t.amount;
            });

          return {
            income,
            expenses,
            total: income - expenses,
            byCategory,
            // Aliases for UI compatibility
            totalIncome: income,
            totalExpenses: expenses,
            netBalance: income - expenses,
            spendingByCategory,
            transactionCount: monthTransactions.length,
          };
        },

        // Actions
        addTransaction: (transactionData) => {
          const newTransaction: Transaction = {
            ...transactionData,
            id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          set((state) => ({
            transactions: [newTransaction, ...state.transactions],
          }));
        },

        updateTransaction: (id, updates) => {
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          }));
        },

        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
        },

        setFilter: (filter) => {
          set({ filter });
        },

        clearFilter: () => {
          set({ filter: null });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'transaction-storage',
        partialize: (state) => ({
          transactions: state.transactions,
        }),
      }
    ),
    { name: 'TransactionStore' }
  )
);

export default useTransactionStore;
