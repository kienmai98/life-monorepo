import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from './Skeleton';

/**
 * Props for CardSkeleton component
 */
interface CardSkeletonProps {
  /** Number of skeleton cards to render */
  count?: number;
  /** Whether to show header skeleton */
  showHeader?: boolean;
}

/**
 * Skeleton placeholder for card components
 *
 * @example
 * ```tsx
 * if (loading) {
 *   return <CardSkeleton count={3} showHeader={true} />;
 * }
 * ```
 */
export const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 1, showHeader = true }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.card}>
          {showHeader && (
            <View style={styles.header}>
              <Skeleton width={40} height={40} borderRadius={20} />
              <View style={styles.headerContent}>
                <Skeleton width="50%" height={16} />
                <Skeleton width="30%" height={12} style={{ marginTop: 8 }} />
              </View>
            </View>
          )}
          <View style={styles.body}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="100%" height={14} style={{ marginTop: 12 }} />
            <Skeleton width="90%" height={14} style={{ marginTop: 8 }} />
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  body: {
    paddingTop: 8,
  },
});

export default CardSkeleton;
