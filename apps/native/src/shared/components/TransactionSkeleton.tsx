import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from './Skeleton';

/**
 * Props for TransactionSkeleton component
 */
interface TransactionSkeletonProps {
  /** Number of skeleton items to render */
  count?: number;
}

/**
 * Skeleton placeholder for transaction list items
 *
 * @example
 * ```tsx
 * if (loading) {
 *   return <TransactionSkeleton count={5} />;
 * }
 * ```
 */
export const TransactionSkeleton: React.FC<TransactionSkeletonProps> = ({ count = 3 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton items are static and order never changes
        <View key={index} style={styles.item}>
          <View style={styles.row}>
            <Skeleton width={48} height={48} borderRadius={24} />
            <View style={styles.content}>
              <Skeleton width="60%" height={18} />
              <Skeleton width="40%" height={14} style={{ marginTop: 8 }} />
            </View>
            <Skeleton width={80} height={20} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
});

export default TransactionSkeleton;
