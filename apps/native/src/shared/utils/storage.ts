/**
 * Storage utilities for the Life app
 * Provides abstraction over AsyncStorage with error handling
 * @module shared/utils/storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage operation error
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly operation: 'get' | 'set' | 'remove' | 'clear'
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Storage item with metadata
 */
interface StorageItem<T> {
  /** Stored value */
  value: T;
  /** Timestamp when stored */
  timestamp: number;
  /** Time-to-live in milliseconds */
  ttl?: number;
}

/**
 * Retrieves a string value from storage
 * @param key - Storage key
 * @returns Stored value or null if not found
 * @throws StorageError if operation fails
 *
 * @example
 * const value = await storage.getItem('userToken');
 * if (value) {
 *   console.log('Token:', value);
 * }
 */
const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get item';
    console.error(`Storage getItem error [${key}]:`, message);
    throw new StorageError(message, key, 'get');
  }
};

/**
 * Retrieves and parses a JSON value from storage
 * @param key - Storage key
 * @returns Parsed value or null if not found
 * @throws StorageError if operation fails or JSON is invalid
 *
 * @example
 * const user = await storage.getObject<User>('currentUser');
 * if (user) {
 *   console.log('User:', user.name);
 * }
 */
const getObject = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;

    const item: StorageItem<T> = JSON.parse(value);

    // Check TTL
    if (item.ttl && Date.now() > item.timestamp + item.ttl) {
      await removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get object';
    console.error(`Storage getObject error [${key}]:`, message);
    throw new StorageError(message, key, 'get');
  }
};

/**
 * Stores a string value
 * @param key - Storage key
 * @param value - Value to store
 * @throws StorageError if operation fails
 *
 * @example
 * await storage.setItem('userToken', 'abc123');
 */
const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to set item';
    console.error(`Storage setItem error [${key}]:`, message);
    throw new StorageError(message, key, 'set');
  }
};

/**
 * Stores a JSON value with optional TTL
 * @param key - Storage key
 * @param value - Value to store
 * @param ttl - Time-to-live in milliseconds
 * @throws StorageError if operation fails
 *
 * @example
 * // Store with no expiration
 * await storage.setObject('user', { name: 'John' });
 *
 * // Store with 1 hour TTL
 * await storage.setObject('session', sessionData, 3600000);
 */
const setObject = async <T>(key: string, value: T, ttl?: number): Promise<void> => {
  try {
    const item: StorageItem<T> = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to set object';
    console.error(`Storage setObject error [${key}]:`, message);
    throw new StorageError(message, key, 'set');
  }
};

/**
 * Removes a value from storage
 * @param key - Storage key
 * @throws StorageError if operation fails
 *
 * @example
 * await storage.removeItem('userToken');
 */
const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove item';
    console.error(`Storage removeItem error [${key}]:`, message);
    throw new StorageError(message, key, 'remove');
  }
};

/**
 * Removes multiple values from storage
 * @param keys - Array of storage keys
 * @throws StorageError if operation fails
 *
 * @example
 * await storage.multiRemove(['token', 'user', 'settings']);
 */
const multiRemove = async (keys: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove items';
    console.error('Storage multiRemove error:', message);
    throw new StorageError(message, keys.join(', '), 'remove');
  }
};

/**
 * Clears all storage
 * @throws StorageError if operation fails
 *
 * @example
 * await storage.clear(); // Clear all stored data
 */
const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to clear storage';
    console.error('Storage clear error:', message);
    throw new StorageError(message, '*', 'clear');
  }
};

/**
 * Gets all storage keys
 * @returns Array of keys
 * @throws StorageError if operation fails
 *
 * @example
 * const keys = await storage.getAllKeys();
 * console.log('Stored keys:', keys);
 */
const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get keys';
    console.error('Storage getAllKeys error:', message);
    throw new StorageError(message, '*', 'get');
  }
};

/**
 * Gets storage information
 * @returns Object with key count and total size
 *
 * @example
 * const info = await storage.getInfo();
 * console.log(`Using ${info.size} bytes in ${info.keys} keys`);
 */
const getInfo = async (): Promise<{ keys: number; size: number }> => {
  const keys = await getAllKeys();

  let totalSize = 0;
  for (const key of keys) {
    const value = await getItem(key);
    if (value) {
      totalSize += value.length * 2; // Rough estimate (UTF-16)
    }
  }

  return {
    keys: keys.length,
    size: totalSize,
  };
};

/**
 * Storage keys constants
 * Use these constants instead of string literals for consistency
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@life:auth_token',
  REFRESH_TOKEN: '@life:refresh_token',
  USER: '@life:user',
  THEME: '@life:theme',
  ONBOARDING_COMPLETED: '@life:onboarding_completed',
  TRANSACTIONS: '@life:transactions',
  SETTINGS: '@life:settings',
  NOTIFICATIONS: '@life:notifications',
  LAST_SYNC: '@life:last_sync',
} as const;

/**
 * Gets the stored user
 * @returns User object or null
 */
const getUser = async <T>(): Promise<T | null> => {
  return getObject<T>(STORAGE_KEYS.USER);
};

/**
 * Stores the user
 * @param user - User object to store
 */
const setUser = async <T>(user: T): Promise<void> => {
  return setObject(STORAGE_KEYS.USER, user);
};

/**
 * Removes the stored user
 */
const removeUser = async (): Promise<void> => {
  return removeItem(STORAGE_KEYS.USER);
};

/**
 * Gets biometric enabled status
 * @returns Boolean indicating if biometric is enabled
 */
const getBiometricEnabled = async (): Promise<boolean> => {
  const enabled = await getObject<boolean>('@life:biometric_enabled');
  return enabled ?? false;
};

/**
 * Sets biometric enabled status
 * @param enabled - Boolean value
 */
const setBiometricEnabled = async (enabled: boolean): Promise<void> => {
  return setObject('@life:biometric_enabled', enabled);
};

/**
 * Storage utility object
 */
export const storage = {
  getItem,
  getObject,
  setItem,
  setObject,
  removeItem,
  multiRemove,
  clear,
  getAllKeys,
  getInfo,
  getUser,
  setUser,
  removeUser,
  getBiometricEnabled,
  setBiometricEnabled,
  keys: STORAGE_KEYS,
};

export default storage;
