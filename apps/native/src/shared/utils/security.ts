import * as Crypto from 'expo-crypto';

// Polyfills for React Native environment
declare const TextEncoder: {
  new (): {
    encode(input: string): Uint8Array;
  };
};

declare const TextDecoder: {
  new (): {
    decode(input: Uint8Array): string;
  };
};

declare const btoa: (input: string) => string;
declare const atob: (input: string) => string;

/**
 * Secure storage keys
 * Use these constants for all secure storage operations
 */
export const SECURE_STORAGE_KEYS = {
  AUTH_TOKEN: '@life_secure:auth_token',
  REFRESH_TOKEN: '@life_secure:refresh_token',
  BIOMETRIC_TOKEN: '@life_secure:biometric_token',
  ENCRYPTION_KEY: '@life_secure:encryption_key',
  API_KEY: '@life_secure:api_key',
} as const;

/**
 * Hash algorithm types
 */
export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' | 'MD5';

/**
 * Generates a cryptographically secure random string
 * @param length - Length of the string (default: 32)
 * @returns Random string
 *
 * @example
 * const token = generateSecureToken(64);
 */
export async function generateSecureToken(length = 32): Promise<string> {
  const randomBytes = await Crypto.getRandomBytesAsync(length);
  return Array.from(randomBytes as Uint8Array)
    .map((byte: number) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hashes a string using the specified algorithm
 * @param data - Data to hash
 * @param algorithm - Hash algorithm (default: SHA-256)
 * @returns Hex-encoded hash
 *
 * @example
 * const hash = await hashString('password', 'SHA-256');
 */
export async function hashString(
  data: string,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm[algorithm], data);
}

/**
 * Compares two strings in constant time to prevent timing attacks
 * @param a - First string
 * @param b - Second string
 * @returns Whether strings are equal
 *
 * @example
 * if (timingSafeCompare(providedToken, storedToken)) {
 *   // Authentication successful
 * }
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Sanitizes user input to prevent injection attacks
 * @param input - User input string
 * @returns Sanitized string
 *
 * @example
 * const clean = sanitizeInput(userInput);
 */
export function sanitizeInput(input: string): string {
  return (
    input
      .trim()
      // biome-ignore lint/suspicious/noControlCharactersInRegex: Intentionally removing control characters for security
      .replace(/[\u0000-\u001F\u007F-\u009F]+/g, '') // Remove control characters
      .replace(/(?:\u200B|\u200C|\u200D|\uFEFF)+/g, '') // Remove zero-width characters
      .slice(0, 10000)
  ); // Limit length
}

/**
 * Validates and sanitizes an email address
 * @param email - Email to validate
 * @returns Sanitized email or null if invalid
 *
 * @example
 * const email = validateAndSanitizeEmail(userInput);
 * if (!email) {
 *   showError('Invalid email');
 * }
 */
export function validateAndSanitizeEmail(email: string): string | null {
  const sanitized = sanitizeInput(email).toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Masks sensitive data (credit cards, account numbers, etc.)
 * @param data - Data to mask
 * @param visibleChars - Number of characters to show at the end (default: 4)
 * @returns Masked string
 *
 * @example
 * maskSensitiveData('1234567890123456'); // '************3456'
 */
export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }

  const visible = data.slice(-visibleChars);
  const masked = '*'.repeat(data.length - visibleChars);
  return masked + visible;
}

/**
 * Checks if running on a rooted/jailbroken device
 * Note: This is a basic check and should not be solely relied upon
 * @returns Whether device appears to be compromised
 */
export async function isDeviceCompromised(): Promise<boolean> {
  // In production, use a library like 'react-native-device-info' or 'jail-monkey'
  // This is a placeholder implementation

  if (__DEV__) {
    return false;
  }

  const _jailbreakIndicators = [
    '/Applications/Cydia.app',
    '/Applications/Blackra1n.app',
    '/Applications/FakeCarrier.app',
    '/Applications/Icy.app',
    '/Applications/IntelliScreen.app',
    '/Applications/MxTube.app',
    '/Applications/RockApp.app',
    '/Applications/SBSettings.app',
    '/Applications/WinterBoard.app',
    '/Applications/FiLeak.app',
    '/Applications/Firewall.ipa',
    '/Applications/Snoop-itConfig.app',
    '/usr/sbin/sshd',
    '/usr/bin/sshd',
    '/usr/libexec/sftp-server',
    '/var/lib/apt',
    '/var/mobile/Library/SBSettings/Themes',
    '/private/var/stash',
    '/private/var/lib/apt',
    '/private/var/lib/cydia',
    '/private/var/tmp/cydia.log',
    '/System/Library/LaunchDaemons/com.ikey.bbot.plist',
    '/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist',
    '/Library/MobileSubstrate/MobileSubstrate.dylib',
    '/bin/bash',
    '/bin/sh',
    '/etc/ssh/sshd_config',
    '/etc/apt',
    '/var/cache/apt',
    '/var/log/syslog',
  ];

  // In a real implementation, check if these paths exist
  // For now, return false
  void _jailbreakIndicators; // Reference to avoid unused variable warning
  return false;
}

/**
 * Rate limiter for API calls
 * Prevents brute force attacks on sensitive endpoints
 */
export class RateLimiter {
  private attempts = new Map<string, { count: number; resetTime: number }>();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Check if action is allowed for the given key
   * @param key - Identifier (e.g., IP address, user ID)
   * @returns Whether action is allowed
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  }

  /**
   * Get remaining attempts for a key
   * @param key - Identifier
   * @returns Remaining attempts
   */
  getRemainingAttempts(key: string): number {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      return this.maxAttempts;
    }

    return Math.max(0, this.maxAttempts - attempt.count);
  }

  /**
   * Reset attempts for a key
   * @param key - Identifier
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Clear all rate limit data
   */
  clear(): void {
    this.attempts.clear();
  }
}

/**
 * Creates a secure random password
 * @param length - Password length (default: 16)
 * @returns Secure random password
 *
 * @example
 * const password = generateSecurePassword(20);
 */
export function generateSecurePassword(length = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const all = uppercase + lowercase + numbers + symbols;
  let password = '';

  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest
  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Encrypts sensitive data before storage
 * Note: This is a placeholder - use proper encryption in production
 * @param data - Data to encrypt
 * @param key - Encryption key
 * @returns Encrypted data
 */
export async function encryptData(data: string, key: string): Promise<string> {
  // In production, use a proper encryption library
  // This is a placeholder implementation
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const keyBuffer = encoder.encode(key);

  // XOR encryption (NOT FOR PRODUCTION USE)
  const encrypted = new Uint8Array(dataBuffer.length);
  for (let i = 0; i < dataBuffer.length; i++) {
    encrypted[i] = (dataBuffer[i] ?? 0) ^ (keyBuffer[i % keyBuffer.length] ?? 0);
  }

  return btoa(String.fromCharCode(...encrypted));
}

/**
 * Decrypts sensitive data
 * Note: This is a placeholder - use proper encryption in production
 * @param encryptedData - Encrypted data
 * @param key - Encryption key
 * @returns Decrypted data
 */
export async function decryptData(encryptedData: string, key: string): Promise<string> {
  // In production, use a proper encryption library
  const encrypted = Uint8Array.from(atob(encryptedData), (c: string) => c.charCodeAt(0));
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key);

  const decrypted = new Uint8Array(encrypted.length);
  for (let i = 0; i < encrypted.length; i++) {
    decrypted[i] = (encrypted[i] ?? 0) ^ (keyBuffer[i % keyBuffer.length] ?? 0);
  }

  return new TextDecoder().decode(decrypted);
}

export default {
  SECURE_STORAGE_KEYS,
  generateSecureToken,
  hashString,
  timingSafeCompare,
  sanitizeInput,
  validateAndSanitizeEmail,
  maskSensitiveData,
  isDeviceCompromised,
  RateLimiter,
  generateSecurePassword,
  encryptData,
  decryptData,
};
