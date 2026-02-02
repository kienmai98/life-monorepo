import { useState, useCallback } from 'react';

/**
 * Error information structure
 */
interface ErrorInfo {
  /** Error message */
  message: string;
  /** Error object if available */
  error?: Error;
  /** Whether the error has been handled */
  handled: boolean;
}

/**
 * Return type for useErrorBoundary hook
 */
interface UseErrorBoundaryReturn {
  /** Current error if any */
  error: ErrorInfo | null;
  /** Whether an error has occurred */
  hasError: boolean;
  /** Set an error manually */
  setError: (message: string, error?: Error) => void;
  /** Clear the current error */
  clearError: () => void;
  /** Wrap an async function with error handling */
  withErrorHandling: <T extends (...args: any[]) => Promise<any>>(
    fn: T
  ) => (...args: Parameters<T>) => Promise<ReturnType<T> | undefined>;
}

/**
 * Hook for managing error state in components
 * Provides centralized error handling with automatic clearing
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { error, hasError, setError, clearError, withErrorHandling } = useErrorBoundary();
 *   
 *   const handleSubmit = withErrorHandling(async (data) => {
 *     await saveData(data);
 *   });
 *   
 *   if (hasError) {
 *     return <ErrorMessage message={error?.message} onDismiss={clearError} />;
 *   }
 *   
 *   return <Button onPress={() => handleSubmit(formData)} />;
 * }
 * ```
 */
export function useErrorBoundary(): UseErrorBoundaryReturn {
  const [error, setErrorState] = useState<ErrorInfo | null>(null);

  const setError = useCallback((message: string, err?: Error) => {
    setErrorState({
      message,
      error: err,
      handled: false,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const withErrorHandling = useCallback(
    <T extends (...args: any[]) => Promise<any>>(
      fn: T
    ): ((...args: Parameters<T>) => Promise<ReturnType<T> | undefined>) => {
      return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
        try {
          clearError();
          return await fn(...args);
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error.message, error);
          return undefined;
        }
      };
    },
    [clearError, setError]
  );

  return {
    error,
    hasError: error !== null,
    setError,
    clearError,
    withErrorHandling,
  };
}

export default useErrorBoundary;
