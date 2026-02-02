import { useCallback, useRef } from 'react';

/**
 * Hook for throttling function calls
 * Ensures the function is called at most once per wait period
 *
 * @template T - Function type to throttle
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```tsx
 * const throttledScroll = useThrottle((scrollPosition: number) => {
 *   updateScrollIndicator(scrollPosition);
 * }, 100);
 *
 * // In scroll handler
 * <ScrollView onScroll={(e) => throttledScroll(e.nativeEvent.contentOffset.y)} />
 * ```
 */
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  const inThrottle = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        fn(...args);
        inThrottle.current = true;

        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    },
    [fn, limit]
  );
}

export default useThrottle;
