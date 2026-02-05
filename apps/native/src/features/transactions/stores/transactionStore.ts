import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Transaction entity type
 */
export interface Transaction {
  /** Unique transaction identifier */
  id: string;
  /** Transaction amount */
  amount: number;
  /** Transaction currency code */
  currency: string;
  /** Transaction category */
  category: TransactionCategory;
  /** Transaction description */
  description: string;
  /** Transaction date (ISO string) */
  date: string;
  /** Transaction type - income or expense */
  type: 'income' | 'expense';
  /** Payment method used */
  paymentMethod: PaymentMethod;
  /** Optional receipt image URL */
  receiptUrl?: string;
  /** Optional location data */
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  /** Optional tags for categorization */
  tags: string[];
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
  /** Whether transaction is synced with server */
  synced: boolean;
}

/**
 * Transaction categories
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

/**
 * Payment methods
 */
export type PaymentMethod =
  | 'cash'
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'mobile_payment'
  | 'check'
  | 'other';

/**
 * Filter options for transactions
 */
export interface TransactionFilter {
  /** Start date for date range filter */
  startDate?: string;
  /** End date for date range filter */
  endDate?: string;
  /** Category filter */
  category?: TransactionCategory | 'all';
  /** Type filter */
  type?: 'income' | 'expense' | 'all';
  /** Search query for description */
  searchQuery?: string;
  /** Tag filter */
  tags?: string[];
  /** Minimum amount */
  minAmount?: number;
  /** Maximum amount */
  maxAmount?: number;
}

/**
 * Transaction statistics
 */
export interface TransactionStats {
  /** Total income in period */
  totalIncome: number;
  /** Total expenses in period */
  totalExpenses: number;
  /** Net balance (income - expenses) */
  netBalance: number;
  /** Spending by category */
  spendingByCategory: Record<TransactionCategory, number>;
  /** Transaction count */
  transactionCount: number;
}

/**
 * Transaction state interface
 */
interface TransactionState {
  /** All transactions */
  transactions: Transaction[];
  /** Current filter settings */
  filter: TransactionFilter;
  /** Whether transactions are being fetched */
  isLoading: boolean;
  /** Error message if fetch failed */
  error: string | null;
  /** Whether more data is available for pagination */
  hasMore: boolean;
  /** Current page for pagination */
  page: number;
}

/**
 * Transaction actions interface
 */
interface TransactionActions {
  /** Add a new transaction */
  addTransaction: (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'synced'>
  ) => void;
  /** Update an existing transaction */
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  /** Delete a transaction */
  deleteTransaction: (id: string) => void;
  /** Set filter options */
  setFilter: (filter: Partial<TransactionFilter>) => void;
  /** Clear all filters */
  clearFilter: () => void;
  /** Fetch transactions from server */
  fetchTransactions: (userId: string, filter?: TransactionFilter) => Promise<void>;
  /** Refresh transactions */
  refreshTransactions: (userId: string) => Promise<void>;
  /** Load more transactions (pagination) */
  loadMore: (userId: string) => Promise<void>;
  /** Clear error state */
  clearError: () => void;
  /** Get filtered transactions */
  getFilteredTransactions: () => Transaction[];
  /** Get transaction statistics */
  getStats: () => TransactionStats;
}

/**
 * Combined transaction store type
 */
type TransactionStore = TransactionState & TransactionActions;

/** Default transaction categories */
export const DEFAULT_CATEGORIES: TransactionCategory[] = [
  'food',
  'transport',
  'shopping',
  'entertainment',
  'utilities',
  'health',
  'travel',
  'education',
  'income',
  'investment',
  'other',
];

/** Default payment methods */
export const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  'cash',
  'credit_card',
  'debit_card',
  'bank_transfer',
  'mobile_payment',
  'check',
  'other',
];

/** Default filter state */
const defaultFilter: TransactionFilter = {
  type: 'all',
  category: 'all',
};

/** Initial state */
const initialState: TransactionState = {
  transactions: [],
  filter: defaultFilter,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

/**
 * Generate unique ID
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Transaction Store - Manages transaction state with persistence
 *
 * Features:
 * - Full CRUD operations for transactions
 * - Filtering and searching
 * - Statistics calculations
 * - Pagination support
 * - Offline persistence
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { transactions, addTransaction } = useTransactionStore();
 *
 * // With selectors for performance
 * const transactions = useTransactionStore(selectTransactions);
 * const isLoading = useTransactionStore(selectIsLoading);
 *
 * // Using filtered transactions
 * const filtered = useTransactionStore(selectFilteredTransactions);
 * const stats = useTransactionStore(selectStats);
 * ```
 */
export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addTransaction: (transaction) => {
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

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString(), synced: false }
              : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      setFilter: (filter) => {
        set((state) => ({
          filter: { ...state.filter, ...filter },
          page: 1,
          hasMore: true,
        }));
      },

      clearFilter: () => {
        set({
          filter: defaultFilter,
          page: 1,
          hasMore: true,
        });
      },

      fetchTransactions: async (_userId, _filter = {}) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement Supabase fetch
          // console.log('Fetching transactions for:', userId, filter);
          // Placeholder - simulate API call
          await new Promise<void>((resolve) => setTimeout(resolve, 1000));
          set({ isLoading: false });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to fetch transactions';
          set({ error: message, isLoading: false });
        }
      },

      refreshTransactions: async (userId) => {
        set({ page: 1, hasMore: true });
        await get().fetchTransactions(userId);
      },

      loadMore: async (userId) => {
        const { page, hasMore, isLoading } = get();
        if (!hasMore || isLoading) return;

        set({ page: page + 1 });
        await get().fetchTransactions(userId);
      },

      clearError: () => set({ error: null }),

      getFilteredTransactions: () => {
        const { transactions, filter } = get();

        return transactions.filter((t) => {
          if (filter.type && filter.type !== 'all' && t.type !== filter.type) {
            return false;
          }
          if (filter.category && filter.category !== 'all' && t.category !== filter.category) {
            return false;
          }
          if (filter.startDate && t.date < filter.startDate) {
            return false;
          }
          if (filter.endDate && t.date > filter.endDate) {
            return false;
          }
          if (filter.searchQuery) {
            const query = filter.searchQuery.toLowerCase();
            const matchesDescription = t.description.toLowerCase().includes(query);
            const matchesCategory = t.category.toLowerCase().includes(query);
            if (!(matchesDescription || matchesCategory)) {
              return false;
            }
          }
          if (filter.minAmount !== undefined && t.amount < filter.minAmount) {
            return false;
          }
          if (filter.maxAmount !== undefined && t.amount > filter.maxAmount) {
            return false;
          }
          if (filter.tags?.length) {
            const hasTag = filter.tags.some((tag) => t.tags.includes(tag));
            if (!hasTag) return false;
          }
          return true;
        });
      },

      getStats: () => {
        const transactions = get().getFilteredTransactions();

        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        const spendingByCategory = transactions
          .filter((t) => t.type === 'expense')
          .reduce(
            (acc, t) => {
              acc[t.category] = (acc[t.category] || 0) + t.amount;
              return acc;
            },
            {} as Record<TransactionCategory, number>
          );

        return {
          totalIncome: income,
          totalExpenses: expenses,
          netBalance: income - expenses,
          spendingByCategory,
          transactionCount: transactions.length,
        };
      },
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    }
  )
);

// ============================================
// SELECTORS - Use these for performance optimization
// ============================================

/** Select all transactions */
export const selectTransactions = (state: TransactionStore) => state.transactions;

/** Select loading state */
export const selectIsLoading = (state: TransactionStore) => state.isLoading;

/** Select error state */
export const selectError = (state: TransactionStore) => state.error;

/** Select current filter */
export const selectFilter = (state: TransactionStore) => state.filter;

/** Select filtered transactions (memoized by Zustand) */
export const selectFilteredTransactions = (state: TransactionStore) =>
  state.getFilteredTransactions();

/** Select transaction statistics */
export const selectStats = (state: TransactionStore) => state.getStats();

/** Select transaction count */
export const selectTransactionCount = (state: TransactionStore) => state.transactions.length;

/** Select income total */
export const selectTotalIncome = (state: TransactionStore) =>
  state
    .getFilteredTransactions()
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

/** Select expense total */
export const selectTotalExpenses = (state: TransactionStore) =>
  state
    .getFilteredTransactions()
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

/** Select whether there are more pages to load */
export const selectHasMore = (state: TransactionStore) => state.hasMore;

export default useTransactionStore;
