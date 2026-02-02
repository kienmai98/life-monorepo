/**
 * Transactions feature exports
 * @module features/transactions
 */

// Screens
export { default as TransactionsScreen } from './screens/TransactionsScreen';
export { default as AddTransactionScreen } from './screens/AddTransactionScreen';

// Store and selectors
export {
  useTransactionStore,
  selectTransactions,
  selectIsLoading,
  selectError,
  selectFilter,
  selectFilteredTransactions,
  selectStats,
  selectTransactionCount,
  selectTotalIncome,
  selectTotalExpenses,
  selectHasMore,
} from './stores/transactionStore';

// Types
export type {
  Transaction,
  TransactionCategory,
  TransactionFilter,
  TransactionStats,
  PaymentMethod,
  TransactionStore,
} from './stores/transactionStore';

// Constants
export { DEFAULT_CATEGORIES, DEFAULT_PAYMENT_METHODS } from './stores/transactionStore';
