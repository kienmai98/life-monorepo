import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

/**
 * Props for Skeleton component
 */
interface SkeletonProps {
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number;
  /** Border radius */
  borderRadius?: number;
  /** Custom styles */
  style?: ViewStyle;
  /** Whether to show shimmer animation */
  animated?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Shimmer highlight color */
  highlightColor?: string;
}

/**
 * Skeleton component for loading states
 * Provides a shimmering placeholder while content loads
 * 
 * @example
 * ```tsx
 * // Basic usage
 * if (loading) {
 *   return <Skeleton width={200} height={20} />;
 * }
 * 
 * // Card skeleton
 * <View>
 *   <Skeleton width="100%" height={200} borderRadius={12} />
 *   <Skeleton width="60%" height={20} style={{ marginTop: 12 }} />
 *   <Skeleton width="40%" height={16} style={{ marginTop: 8 }} />
 * </View>
 * 
 * // Avatar skeleton
 * <Skeleton width={48} height={48} borderRadius={24} />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
  style,
  animated = true,
  backgroundColor = '#E0E0E0',
  highlightColor = '#F5F5F5',
}) => {
  const shimmerProgress = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      shimmerProgress.value = withRepeat(
        withTiming(1, { duration: 1500 }),
        -1,
        true
      );
    }
  }, [animated, shimmerProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerProgress.value,
      [0, 1],
      [-width as number, width as number]
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      {animated && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              backgroundColor: highlightColor,
              width: '40%',
              height: '100%',
            },
            animatedStyle,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    opacity: 0.5,
  },
});

export default Skeleton;
