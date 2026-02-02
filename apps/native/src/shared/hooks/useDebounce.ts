import { useCallback, useRef } from 'react';

/**
 * Hook for debouncing function calls
 * Delays invoking the function until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @template T - Function type to debounce
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```tsx
 * const debouncedSearch = useDebounce((query: string) => {
 *   searchAPI(query);
 * }, 300);
 *
 * // In render
 * <TextInput
 *   onChangeText={debouncedSearch}
 *   placeholder="Search..."
 * />
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );
}

export default useDebounce;
