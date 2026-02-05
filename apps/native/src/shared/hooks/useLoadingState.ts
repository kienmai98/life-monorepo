import { useCallback, useMemo, useState } from 'react';

/**
 * Loading state and control utilities
 */
interface LoadingStateOptions {
  /** Initial loading state */
  initialLoading?: boolean;
  /** Minimum time to show loading state in milliseconds */
  minDuration?: number;
}

/**
 * Return type for useLoadingState hook
 */
interface UseLoadingStateReturn {
  /** Whether currently loading */
  isLoading: boolean;
  /** Start loading state */
  startLoading: () => void;
  /** Stop loading state */
  stopLoading: () => void;
  /** Execute function with automatic loading state management */
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
  /** Execute a function with loading state */
  executeWithLoading: <T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T
  ) => (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

/**
 * Hook for managing loading states with optional minimum duration
 * Prevents flickering of loading indicators
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isLoading, executeWithLoading } = useLoadingState({ minDuration: 500 });
 *
 *   const handleSave = executeWithLoading(async (data) => {
 *     await saveToServer(data);
 *   });
 *
 *   return (
 *     <Button loading={isLoading} onPress={() => handleSave(formData)}>
 *       Save
 *     </Button>
 *   );
 * }
 * ```
 */
export function useLoadingState(options: LoadingStateOptions = {}): UseLoadingStateReturn {
  const { initialLoading = false, minDuration = 0 } = options;

  const [isLoading, setIsLoading] = useState(initialLoading);
  const startTimeRef = React.useRef<number>(0);

  const startLoading = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minDuration - elapsed);

    if (remaining > 0) {
      setTimeout(() => setIsLoading(false), remaining);
    } else {
      setIsLoading(false);
    }
  }, [minDuration]);

  const withLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      startLoading();
      try {
        const result = await promise;
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const executeWithLoading = useCallback(
    <T extends (...args: unknown[]) => Promise<unknown>>(fn: T) => {
      return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        startLoading();
        try {
          const result = await fn(...args);
          return result as ReturnType<T>;
        } finally {
          stopLoading();
        }
      };
    },
    [startLoading, stopLoading]
  );

  return useMemo(
    () => ({
      isLoading,
      startLoading,
      stopLoading,
      withLoading,
      executeWithLoading,
    }),
    [isLoading, startLoading, stopLoading, withLoading, executeWithLoading]
  );
}

import React from 'react';

export default useLoadingState;
