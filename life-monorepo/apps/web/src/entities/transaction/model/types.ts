import type { TransactionCategory } from './store';

/**
 * Get emoji icon for a transaction category
 * @param category - Transaction category
 * @returns Emoji icon
 */
export function getCategoryIcon(category: TransactionCategory): string {
  const icons: Record<TransactionCategory, string> = {
    food: '🍔',
    transport: '🚗',
    shopping: '🛍️',
    entertainment: '🎬',
    utilities: '💡',
    health: '🏥',
    travel: '✈️',
    education: '📚',
    income: '💰',
    investment: '📈',
    other: '📝',
  };
  return icons[category] || '📝';
}

/**
 * Get color for a transaction category
 * @param category - Transaction category
 * @returns Hex color code
 */
export function getCategoryColor(category: TransactionCategory): string {
  const colors: Record<TransactionCategory, string> = {
    food: '#EF4444',
    transport: '#3B82F6',
    shopping: '#8B5CF6',
    entertainment: '#F59E0B',
    utilities: '#6B7280',
    health: '#10B981',
    travel: '#06B6D4',
    education: '#84CC16',
    income: '#10B981',
    investment: '#6366F1',
    other: '#9CA3AF',
  };
  return colors[category] || '#9CA3AF';
}

/**
 * All available transaction categories
 */
export const ALL_CATEGORIES: TransactionCategory[] = [
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

/**
 * Common categories (for quick filters)
 */
export const COMMON_CATEGORIES: TransactionCategory[] = [
  'food',
  'transport',
  'shopping',
  'entertainment',
  'utilities',
  'health',
];

export * from './store';
