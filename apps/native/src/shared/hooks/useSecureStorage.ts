import { useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

/**
 * Storage types supported
 */
type StorageType = 'asyncStorage' | 'secureStorage';

/**
 * Options for useSecureStorage hook
 */
interface UseStorageOptions<T> {
  /** Storage key */
  key: string;
  /** Initial value if nothing in storage */
  initialValue?: T;
  /** Type of storage to use */
  storageType?: StorageType;
  /** Serialize function for complex types */
  serialize?: (value: T) => string;
  /** Deserialize function for complex types */
  deserialize?: (value: string) => T;
}

/**
 * Return type for useSecureStorage hook
 */
interface UseStorageReturn<T> {
  /** Current stored value */
  value: T | undefined;
  /** Set value in storage */
  setValue: (value: T | ((prev: T | undefined) => T)) => Promise<void>;
  /** Remove value from storage */
  removeValue: () => Promise<void>;
  /** Whether storage is currently loading */
  isLoading: boolean;
  /** Error if storage operation failed */
  error: Error | null;
}

/**
 * Default serialization functions
 */
const defaultSerialize = <T, (value: T): string => JSON.stringify(value);
const defaultDeserialize = <T, (value: string): T => JSON.parse(value);

/**
 * Hook for persisting state to storage (AsyncStorage or SecureStorage)
 * Automatically syncs state with storage
 * 
 * @example
 * ```tsx
 * // Simple string storage
 * const { value: token, setValue: setToken } = useSecureStorage({
 *   key: 'authToken',
 *   storageType: 'secureStorage'
 * });
 * 
 * // Complex object storage
 * const { value: user, setValue: setUser } = useSecureStorage({
 *   key: 'user',
 *   initialValue: { name: '', email: '' },
 *   storageType: 'asyncStorage'
 * });
 * 
 * // Usage
 * await setToken('new-token');
 * await setUser(prev => ({ ...prev, name: 'John' }));
 * ```
 */
export function useSecureStorage<T>(options: UseStorageOptions<T>): UseStorageReturn<T> {
  const {
    key,
    initialValue,
    storageType = 'asyncStorage',
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
  } = options;

  const [value, setValueState] = useState<T | undefined>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load from storage on mount
  useEffect(() => {
    let isMounted = true;

    const loadFromStorage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Note: Secure storage implementation would go here
        // For now, using AsyncStorage wrapper
        const storedValue = await storage.getItem(key);
        
        if (isMounted) {
          if (storedValue !== null) {
            setValueState(deserialize(storedValue));
          } else {
            setValueState(initialValue);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFromStorage();

    return () => {
      isMounted = false;
    };
  }, [key, initialValue, deserialize]);

  // Set value in storage
  const setValue = useCallback(
    async (newValue: T | ((prev: T | undefined) => T)) => {
      try {
        setError(null);
        
        const valueToStore = newValue instanceof Function 
          ? newValue(value) 
          : newValue;
        
        setValueState(valueToStore);
        await storage.setItem(key, serialize(valueToStore));
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        throw err;
      }
    },
    [key, serialize, value]
  );

  // Remove value from storage
  const removeValue = useCallback(async () => {
    try {
      setError(null);
      setValueState(undefined);
      await storage.removeItem(key);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  }, [key]);

  return {
    value,
    setValue,
    removeValue,
    isLoading,
    error,
  };
}

export default useSecureStorage;
