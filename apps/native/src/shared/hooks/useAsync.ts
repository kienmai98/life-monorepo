import { useCallback, useEffect, useState } from 'react';

/**
 * Async operation state and utilities
 * @template T - Type of the data returned by the async operation
 * @template E - Type of the error (defaults to Error)
 */
interface AsyncState<T, E = Error> {
  /** Current data value */
  data: T | null;
  /** Error if the operation failed */
  error: E | null;
  /** Whether the operation is currently running */
  isLoading: boolean;
  /** Whether the operation has completed successfully at least once */
  isSuccess: boolean;
}

/**
 * Options for useAsync hook
 */
interface UseAsyncOptions<T> {
  /** Initial data value */
  initialData?: T | null;
  /** Whether to execute the async function immediately */
  immediate?: boolean;
  /** Callback called on successful completion */
  onSuccess?: (data: T) => void;
  /** Callback called on error */
  onError?: (error: Error) => void;
}

/**
 * Return type for useAsync hook
 */
interface UseAsyncReturn<T, E = Error> extends AsyncState<T, E> {
  /** Execute the async function manually */
  execute: (...args: unknown[]) => Promise<T | null>;
  /** Reset the state to initial values */
  reset: () => void;
  /** Set data manually */
  setData: (data: T | null) => void;
}

/**
 * Hook for managing async operations with loading, error, and success states
 *
 * @example
 * ```tsx
 * // Basic usage with immediate execution
 * const { data, isLoading, error, execute } = useAsync(
 *   () => fetchUser(userId),
 *   { immediate: true }
 * );
 *
 * // Manual execution with arguments
 * const { execute } = useAsync(searchUsers);
 * const handleSearch = (query: string) => execute(query);
 *
 * // With callbacks
 * const { data } = useAsync(
 *   () => saveData(formData),
 *   {
 *     onSuccess: () => showToast('Saved!'),
 *     onError: (err) => showError(err.message)
 *   }
 * );
 * ```
 */
export function useAsync<T, E = Error>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, E> {
  const { initialData = null, immediate = false, onSuccess, onError } = options;

  const [state, setState] = useState<AsyncState<T, E>>({
    data: initialData,
    error: null,
    isLoading: false,
    isSuccess: false,
  });

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await asyncFunction(...args);
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
        });
        onSuccess?.(data);
        return data;
      } catch (error) {
        const err = error as E;
        setState({
          data: null,
          error: err,
          isLoading: false,
          isSuccess: false,
        });
        onError?.(error as Error);
        return null;
      }
    },
    [asyncFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      error: null,
      isLoading: false,
      isSuccess: false,
    });
  }, [initialData]);

  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

export default useAsync;
