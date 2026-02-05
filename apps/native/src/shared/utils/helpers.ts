/**
 * Utility helper functions for the Life app
 * @module shared/utils
 */

/**
 * Formats a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale string (default: en-US)
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'EUR') // '€1,234.56'
 * formatCurrency(1234.56, 'JPY', 'ja-JP') // '¥1,235'
 */
export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(amount);
};

/**
 * Formats a date string or Date object
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (default: en-US)
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15') // 'Jan 15, 2024'
 * formatDate(new Date(), { weekday: 'long' }) // 'Monday'
 */
export const formatDate = (
  date: string | Date | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
  locale = 'en-US'
): string => {
  const d =
    typeof date === 'string' ? new Date(date) : typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleDateString(locale, options);
};

/**
 * Formats a time string
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string
 * @returns Formatted time string
 */
export const formatTime = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  },
  locale = 'en-US'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString(locale, options);
};

/**
 * Debounces a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   searchAPI(query);
 * }, 300);
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Checks if a date is today
 * @param date - Date string or Date object
 * @returns Whether the date is today
 *
 * @example
 * isEventToday('2024-01-15T10:00:00Z') // true if today is 2024-01-15
 */
export const isEventToday = (date: string | Date): boolean => {
  const eventDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Throttles a function
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 *
 * @example
 * capitalizeFirst('hello') // 'Hello'
 * capitalizeFirst('hello world') // 'Hello world'
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes each word in a string
 * @param str - String to capitalize
 * @returns Title-cased string
 *
 * @example
 * toTitleCase('hello world') // 'Hello World'
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalizeFirst(word))
    .join(' ');
};

/**
 * Gets an icon for a transaction category
 * @param category - Transaction category
 * @returns Emoji icon
 */
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    food: '🍽️',
    transport: '🚗',
    shopping: '🛍️',
    entertainment: '🎬',
    utilities: '💡',
    health: '⚕️',
    travel: '✈️',
    education: '📚',
    income: '💰',
    investment: '📈',
    other: '📦',
  };
  return icons[category.toLowerCase()] || '📦';
};

/**
 * Gets a color for a transaction category
 * @param category - Transaction category
 * @returns Hex color code
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    food: '#FF6B6B',
    transport: '#4ECDC4',
    shopping: '#45B7D1',
    entertainment: '#96CEB4',
    utilities: '#FFEAA7',
    health: '#DDA0DD',
    travel: '#98D8C8',
    education: '#F7DC6F',
    income: '#2ECC71',
    investment: '#9B59B6',
    other: '#BDC3C7',
  };
  return colors[category.toLowerCase()] || '#BDC3C7';
};

/**
 * Formats a number with commas
 * @param num - Number to format
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567) // '1,234,567'
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Calculates percentage
 * @param value - Current value
 * @param total - Total value
 * @param decimals - Decimal places (default: 1)
 * @returns Percentage string
 *
 * @example
 * calculatePercentage(25, 100) // '25.0'
 * calculatePercentage(25, 100, 0) // '25'
 */
export const calculatePercentage = (value: number, total: number, decimals = 1): string => {
  if (total === 0) return '0';
  return ((value / total) * 100).toFixed(decimals);
};

/**
 * Truncates a string to a maximum length
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 *
 * @example
 * truncate('Hello World', 8) // 'Hello...'
 * truncate('Hello World', 8, '→') // 'Hello W→'
 */
export const truncate = (str: string, maxLength: number, suffix = '...'): string => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Generates a unique ID
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validates an email address
 * @param email - Email to validate
 * @returns Whether email is valid
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Validation result
 */
export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain an uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain a lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain a number' };
  }
  return { valid: true };
};

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Deep clone of object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Checks if value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns Whether value is empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Groups array items by a key
 * @param array - Array to group
 * @param key - Key function
 * @returns Grouped object
 *
 * @example
 * groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}], x => x.type)
 * // { a: [{type: 'a', val: 1}], b: [{type: 'b', val: 2}] }
 */
export const groupBy = <T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce(
    (acc, item) => {
      const keyValue = key(item);
      if (!acc[keyValue]) {
        acc[keyValue] = [];
      }
      acc[keyValue].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
};

/**
 * Sorts array by a key
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param order - Sort order (asc or desc)
 * @returns Sorted array
 */
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Gets relative time string (e.g., "2 hours ago")
 * @param date - Date to format
 * @param locale - Locale string
 * @returns Relative time string
 */
export const getRelativeTime = (date: string | Date | number, locale = 'en-US'): string => {
  const d =
    typeof date === 'string' ? new Date(date) : typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
};
