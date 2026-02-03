import type { Transaction, } from '@life/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_PAYMENT_METHODS,
  selectError,
  selectFilter,
  selectHasMore,
  selectIsLoading,
  selectTransactionCount,
  selectTransactions,
  useTransactionStore,
} from '../transactionStore';

describe('TransactionStore', () => {
  const mockTransaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'synced'> = {
    amount: 50.00,
    currency: 'USD',
    category: 'food',
    description: 'Lunch at cafe',
    date: new Date().toISOString(),
    type: 'expense',
    paymentMethod: 'credit_card',
    tags: ['dining'],
  };

  const createMockTransaction = (overrides: Partial<typeof mockTransaction> = {}): Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'synced'> => ({
    ...mockTransaction,
    ...overrides,
  });

  beforeEach(() => {
    // Reset store to initial state
    useTransactionStore.setState({
      transactions: [],
      filter: {
        type: 'all',
        category: 'all',
      },
      isLoading: false,
      error: null,
      hasMore: true,
      page: 1,
    });
    jest.clearAllMocks();
  });

  describe('State Management', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useTransactionStore());

      expect(result.current.transactions).toEqual([]);
      expect(result.current.filter).toEqual({ type: 'all', category: 'all' });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.hasMore).toBe(true);
      expect(result.current.page).toBe(1);
    });

    it('should clear error', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        // Simulate an error by directly setting state
        useTransactionStore.setState({ error: 'Some error' });
      });

      expect(result.current.error).toBe('Some error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('Transaction CRUD', () => {
    describe('addTransaction', () => {
      it('should add a new transaction', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction());
        });

        expect(result.current.transactions).toHaveLength(1);
        expect(result.current.transactions[0]).toMatchObject({
          amount: 50.00,
          category: 'food',
          description: 'Lunch at cafe',
          type: 'expense',
          paymentMethod: 'credit_card',
          tags: ['dining'],
          synced: false,
        });
        expect(result.current.transactions[0].id).toBeDefined();
        expect(result.current.transactions[0].createdAt).toBeDefined();
        expect(result.current.transactions[0].updatedAt).toBeDefined();
      });

      it('should add multiple transactions', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction({ amount: 50, category: 'food' }));
          result.current.addTransaction(createMockTransaction({ amount: 30, category: 'transport' }));
        });

        expect(result.current.transactions).toHaveLength(2);
        expect(result.current.transactions[0].amount).toBe(30);
        expect(result.current.transactions[1].amount).toBe(50);
      });

      it('should add income transactions', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction({
            amount: 5000,
            type: 'income',
            category: 'income',
            description: 'Salary',
          }));
        });

        expect(result.current.transactions[0].type).toBe('income');
        expect(result.current.transactions[0].amount).toBe(5000);
      });

      it('should handle transactions with location', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction({
            location: {
              latitude: 40.7128,
              longitude: -74.0060,
              address: 'New York, NY',
            },
          }));
        });

        expect(result.current.transactions[0].location).toEqual({
          latitude: 40.7128,
          longitude: -74.0060,
          address: 'New York, NY',
        });
      });
    });

    describe('updateTransaction', () => {
      it('should update an existing transaction', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction({ amount: 50 }));
        });

        const transactionId = result.current.transactions[0].id;

        act(() => {
          result.current.updateTransaction(transactionId, { amount: 75, description: 'Updated description' });
        });

        const updated = result.current.transactions[0];
        expect(updated.amount).toBe(75);
        expect(updated.description).toBe('Updated description');
        expect(updated.category).toBe('food'); // Unchanged
        expect(updated.synced).toBe(false);
        expect(updated.updatedAt).not.toBe(updated.createdAt);
      });

      it('should not modify other transactions', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction({ description: 'First' }));
          result.current.addTransaction(createMockTransaction({ description: 'Second' }));
        });

        const firstId = result.current.transactions[0].id;
        const secondId = result.current.transactions[1].id;

        act(() => {
          result.current.updateTransaction(firstId, { description: 'Updated First' });
        });

        expect(result.current.transactions.find(t => t.id === secondId)?.description).toBe('Second');
      });
    });

    describe('deleteTransaction', () => {
      it('should delete a transaction', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction());
          result.current.addTransaction(createMockTransaction({ description: 'To delete' }));
        });

        const idToDelete = result.current.transactions[1].id;

        act(() => {
          result.current.deleteTransaction(idToDelete);
        });

        expect(result.current.transactions).toHaveLength(1);
        expect(result.current.transactions.find(t => t.id === idToDelete)).toBeUndefined();
      });

      it('should handle deleting non-existent transaction gracefully', () => {
        const { result } = renderHook(() => useTransactionStore());

        act(() => {
          result.current.addTransaction(createMockTransaction());
        });

        act(() => {
          result.current.deleteTransaction('non-existent-id');
        });

        expect(result.current.transactions).toHaveLength(1);
      });
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.addTransaction(createMockTransaction({ type: 'expense', category: 'food', amount: 50 }));
        result.current.addTransaction(createMockTransaction({ type: 'expense', category: 'transport', amount: 30 }));
        result.current.addTransaction(createMockTransaction({ type: 'income', category: 'income', amount: 5000 }));
      });
    });

    it('should filter by type', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.setFilter({ type: 'expense' });
      });

      const filtered = result.current.getFilteredTransactions();
      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => t.type === 'expense')).toBe(true);
    });

    it('should filter by category', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.setFilter({ category: 'food' });
      });

      const filtered = result.current.getFilteredTransactions();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe('food');
    });

    it('should reset page when setting filter', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        useTransactionStore.setState({ page: 5 });
      });

      act(() => {
        result.current.setFilter({ type: 'expense' });
      });

      expect(result.current.page).toBe(1);
      expect(result.current.hasMore).toBe(true);
    });

    it('should clear all filters', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.setFilter({ type: 'expense', category: 'food' });
      });

      act(() => {
        result.current.clearFilter();
      });

      expect(result.current.filter).toEqual({ type: 'all', category: 'all' });
      expect(result.current.page).toBe(1);
    });

    it('should filter by search query in description', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.setFilter({ searchQuery: 'lunch' });
      });

      const filtered = result.current.getFilteredTransactions();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].description).toContain('Lunch');
    });

    it('should filter by amount range', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.setFilter({ minAmount: 40, maxAmount: 100 });
      });

      const filtered = result.current.getFilteredTransactions();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].amount).toBe(50);
    });
  });

  describe('Statistics', () => {
    it('should calculate correct statistics', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.addTransaction(createMockTransaction({ type: 'income', category: 'income', amount: 5000 }));
        result.current.addTransaction(createMockTransaction({ type: 'expense', category: 'food', amount: 100 }));
        result.current.addTransaction(createMockTransaction({ type: 'expense', category: 'food', amount: 50 }));
        result.current.addTransaction(createMockTransaction({ type: 'expense', category: 'transport', amount: 30 }));
      });

      const stats = result.current.getStats();

      expect(stats.totalIncome).toBe(5000);
      expect(stats.totalExpenses).toBe(180);
      expect(stats.netBalance).toBe(4820);
      expect(stats.transactionCount).toBe(4);
      expect(stats.spendingByCategory.food).toBe(150);
      expect(stats.spendingByCategory.transport).toBe(30);
    });

    it('should handle empty transactions', () => {
      const { result } = renderHook(() => useTransactionStore());

      const stats = result.current.getStats();

      expect(stats.totalIncome).toBe(0);
      expect(stats.totalExpenses).toBe(0);
      expect(stats.netBalance).toBe(0);
      expect(stats.transactionCount).toBe(0);
    });
  });

  describe('Async Operations', () => {
    it('should set loading during fetch', async () => {
      const { result } = renderHook(() => useTransactionStore());

      // Note: This tests the current placeholder implementation
      await act(async () => {
        await result.current.fetchTransactions('user-123');
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should refresh transactions and reset pagination', async () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        useTransactionStore.setState({ page: 3, hasMore: false });
      });

      await act(async () => {
        await result.current.refreshTransactions('user-123');
      });

      expect(result.current.page).toBe(1);
      expect(result.current.hasMore).toBe(true);
    });

    it('should increment page on loadMore', async () => {
      const { result } = renderHook(() => useTransactionStore());

      await act(async () => {
        await result.current.loadMore('user-123');
      });

      expect(result.current.page).toBe(2);
    });

    it('should not load more if already loading', async () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        useTransactionStore.setState({ isLoading: true, page: 1 });
      });

      await act(async () => {
        await result.current.loadMore('user-123');
      });

      expect(result.current.page).toBe(1);
    });

    it('should not load more if no more data', async () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        useTransactionStore.setState({ hasMore: false, page: 1 });
      });

      await act(async () => {
        await result.current.loadMore('user-123');
      });

      expect(result.current.page).toBe(1);
    });
  });

  describe('Selectors', () => {
    it('selectTransactions should return all transactions', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.addTransaction(createMockTransaction());
      });

      expect(selectTransactions(result.current)).toHaveLength(1);
    });

    it('selectIsLoading should return loading state', () => {
      const state = { isLoading: true } as any;
      expect(selectIsLoading(state)).toBe(true);
    });

    it('selectError should return error', () => {
      const state = { error: 'Test error' } as any;
      expect(selectError(state)).toBe('Test error');
    });

    it('selectFilter should return current filter', () => {
      const state = { filter: { type: 'expense' } } as any;
      expect(selectFilter(state)).toEqual({ type: 'expense' });
    });

    it('selectTransactionCount should return count', () => {
      const state = { transactions: [{ id: '1' }, { id: '2' }] } as any;
      expect(selectTransactionCount(state)).toBe(2);
    });

    it('selectHasMore should return pagination state', () => {
      const state = { hasMore: false } as any;
      expect(selectHasMore(state)).toBe(false);
    });
  });

  describe('Constants', () => {
    it('should have all default categories', () => {
      expect(DEFAULT_CATEGORIES).toContain('food');
      expect(DEFAULT_CATEGORIES).toContain('transport');
      expect(DEFAULT_CATEGORIES).toContain('shopping');
      expect(DEFAULT_CATEGORIES).toContain('entertainment');
      expect(DEFAULT_CATEGORIES).toContain('utilities');
      expect(DEFAULT_CATEGORIES).toContain('health');
      expect(DEFAULT_CATEGORIES).toContain('travel');
      expect(DEFAULT_CATEGORIES).toContain('education');
      expect(DEFAULT_CATEGORIES).toContain('income');
      expect(DEFAULT_CATEGORIES).toContain('investment');
      expect(DEFAULT_CATEGORIES).toContain('other');
    });

    it('should have all default payment methods', () => {
      expect(DEFAULT_PAYMENT_METHODS).toContain('cash');
      expect(DEFAULT_PAYMENT_METHODS).toContain('credit_card');
      expect(DEFAULT_PAYMENT_METHODS).toContain('debit_card');
      expect(DEFAULT_PAYMENT_METHODS).toContain('bank_transfer');
      expect(DEFAULT_PAYMENT_METHODS).toContain('mobile_payment');
      expect(DEFAULT_PAYMENT_METHODS).toContain('check');
      expect(DEFAULT_PAYMENT_METHODS).toContain('other');
    });
  });

  describe('Persistence', () => {
    it('should persist transactions', () => {
      const { result } = renderHook(() => useTransactionStore());

      act(() => {
        result.current.addTransaction(createMockTransaction());
      });

      // Verify AsyncStorage was called for persistence
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
