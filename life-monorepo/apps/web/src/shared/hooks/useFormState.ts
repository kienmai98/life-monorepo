import { useState, useCallback } from 'react';

interface UseFormStateReturn<T> {
  values: T;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  reset: () => void;
}

/**
 * Hook for managing form state with type safety
 * @param initialValues - Initial form values
 * @returns Form state and control functions
 * 
 * @example
 * ```tsx
 * interface FormData {
 *   name: string;
 *   email: string;
 * }
 * 
 * const { values, setValue, reset } = useFormState<FormData>({
 *   name: '',
 *   email: ''
 * });
 * 
 * // Set single value
 * setValue('name', 'John');
 * 
 * // Reset to initial
 * reset();
 * ```
 */
export function useFormState<T extends Record<string, unknown>>(
  initialValues: T
): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setMultipleValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    setValue,
    setValues: setMultipleValues,
    reset,
  };
}
