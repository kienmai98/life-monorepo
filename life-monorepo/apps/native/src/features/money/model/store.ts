import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Transaction, TransactionFilter, TransactionStats } from '@/entities/transaction';

interface MoneyStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  addTransaction: (t: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'synced'>) => void;
  deleteTransaction: (id: string) => void;
  fetchTransactions: (userId: string) => Promise<void>;
  getStats: () => TransactionStats;
}

export const useMoneyStore = create<MoneyStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: false,
      error: null,

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          synced: false,
        };
        set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
      },

      deleteTransaction: (id) => {
        set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) }));
      },

      fetchTransactions: async (userId) => {
        set({ isLoading: true });
        console.log('Fetch for:', userId);
        set({ isLoading: false });
      },

      getStats: () => {
        const { transactions } = get();
        const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return {
          totalIncome: income,
          totalExpenses: expenses,
          netBalance: income - expenses,
          spendingByCategory: {},
          transactionCount: transactions.length,
        };
      },
    }),
    {
      name: 'money-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);

export const useTransactions = () => {
  const store = useMoneyStore();
  return {
    transactions: store.transactions,
    isLoading: store.isLoading,
    error: store.error,
    addTransaction: store.addTransaction,
    deleteTransaction: store.deleteTransaction,
    fetchTransactions: store.fetchTransactions,
    getStats: store.getStats,
  };
};
