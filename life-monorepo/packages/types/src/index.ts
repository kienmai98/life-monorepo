/**
 * Core type definitions for the Life app
 * @module @life/types
 *
 * @example
 * ```typescript
 * import type { User, Transaction, ApiResponse } from '@life/types';
 *
 * const user: User = {
 *   id: '123',
 *   email: 'user@example.com',
 *   displayName: 'John Doe',
 *   photoURL: null,
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 * };
 * ```
 */

// =============================================================================
// BRANDED TYPES - For type-safe IDs
// =============================================================================

declare const brand: unique symbol;

/**
 * Creates a branded type for type-safe identifiers
 * @template T The base type (usually string)
 * @template B The brand type (discriminator)
 *
 * @example
 * ```typescript
 * type UserId = Branded<string, 'UserId'>;
 * const userId = 'user-123' as UserId;
 * ```
 */
export type Branded<T, B> = T & { [brand]: B };

/** Unique identifier for users */
export type UserId = Branded<string, 'UserId'>;

/** Unique identifier for transactions */
export type TransactionId = Branded<string, 'TransactionId'>;

/** Unique identifier for calendar events */
export type EventId = Branded<string, 'EventId'>;

/** Unique identifier for categories */
export type CategoryId = Branded<string, 'CategoryId'>;

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Makes all properties of T required and non-nullable
 * Deep version of Required<T>
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined
    ? DeepRequired<NonNullable<T[P]>>
    : NonNullable<T[P]>;
};

/**
 * Makes all properties of T optional, including nested objects
 * Deep version of Partial<T>
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object | undefined
    ? DeepPartial<T[P]>
    : T[P];
};

/**
 * Creates a type with only the readonly properties of T
 */
export type ReadonlyFields<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Extracts the element type from an array
 * @template T Array type
 *
 * @example
 * ```typescript
 * type Num = ArrayElement<number[]>; // number
 * ```
 */
export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never;

/**
 * Strict version of Record that requires all keys
 * Unlike built-in Record, this ensures no missing keys
 */
export type StrictRecord<K extends keyof never, V> = {
  [P in K]: V;
};

/**
 * Represents a value that can be null or undefined
 */
export type Nullable<T> = T | null | undefined;

/**
 * Represents a value that can be undefined but not null
 */
export type Optional<T> = T | undefined;

/**
 * Extracts the success type from a Result type
 */
export type SuccessType<T> = T extends Result<infer S, unknown> ? S : never;

/**
 * Extracts the error type from a Result type
 */
export type ErrorType<T> = T extends Result<unknown, infer E> ? E : never;

// =============================================================================
// RESULT TYPE - For explicit error handling
// =============================================================================

/**
 * Represents a successful operation result
 * @template T The success value type
 */
export type Ok<T> = { readonly ok: true; readonly value: T };

/**
 * Represents a failed operation result
 * @template E The error type
 */
export type Err<E> = { readonly ok: false; readonly error: E };

/**
 * Result type for explicit error handling without throwing
 * @template T The success value type
 * @template E The error type
 *
 * @example
 * ```typescript
 * function parseJson(json: string): Result<object, SyntaxError> {
 *   try {
 *     return { ok: true, value: JSON.parse(json) };
 *   } catch (e) {
 *     return { ok: false, error: e as SyntaxError };
 *   }
 * }
 *
 * const result = parseJson('{"key": "value"}');
 * if (result.ok) {
 *   console.log(result.value);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export type Result<T, E = Error> = Ok<T> | Err<E>;

/**
 * Creates a successful Result
 * @param value The success value
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

/**
 * Creates a failed Result
 * @param error The error value
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

// =============================================================================
// PAGINATION TYPES
// =============================================================================

/**
 * Cursor-based pagination parameters
 * Preferred over offset-based for large datasets
 */
export interface CursorPaginationParams {
  /** Number of items to fetch */
  readonly limit: number;
  /** Cursor to start from (undefined for first page) */
  readonly cursor?: string;
}

/**
 * Offset-based pagination parameters
 * Use only for small datasets or when cursor pagination isn't feasible
 */
export interface OffsetPaginationParams {
  /** Page number (1-indexed) */
  readonly page: number;
  /** Number of items per page */
  readonly pageSize: number;
}

/**
 * Pagination parameters - discriminated union
 * @example
 * ```typescript
 * const cursorParams: PaginationParams = {
 *   type: 'cursor',
 *   limit: 20,
 *   cursor: 'abc123'
 * };
 *
 * const offsetParams: PaginationParams = {
 *   type: 'offset',
 *   page: 1,
 *   pageSize: 20
 * };
 * ```
 */
export type PaginationParams =
  | ({ readonly type: 'cursor' } & CursorPaginationParams)
  | ({ readonly type: 'offset' } & OffsetPaginationParams);

/**
 * Pagination information returned with list results
 */
export interface PaginationInfo {
  /** Total number of items available */
  readonly total: number;
  /** Whether more items are available */
  readonly hasMore: boolean;
  /** Cursor for the next page (if available) */
  readonly nextCursor?: string;
  /** Current page number (for offset pagination) */
  readonly currentPage?: number;
  /** Total number of pages (for offset pagination) */
  readonly totalPages?: number;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Standard API error response
 */
export interface ApiError {
  /** Error code for programmatic handling */
  readonly code: string;
  /** Human-readable error message */
  readonly message: string;
  /** Additional error details */
  readonly details?: Record<string, unknown>;
  /** Request ID for tracing */
  readonly requestId?: string;
}

/**
 * Successful API response
 * @template T The data type
 */
export interface ApiSuccess<T> {
  readonly success: true;
  readonly data: T;
  readonly meta?: {
    readonly pagination?: PaginationInfo;
    readonly timestamp: string;
  };
}

/**
 * Failed API response
 */
export interface ApiFailure {
  readonly success: false;
  readonly error: ApiError;
  readonly meta?: {
    readonly timestamp: string;
  };
}

/**
 * API response discriminated union
 * @template T The data type on success
 *
 * @example
 * ```typescript
 * async function fetchUser(id: string): Promise<ApiResponse<User>> {
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json();
 * }
 *
 * const result = await fetchUser('123');
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error.message);
 * }
 * ```
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

// =============================================================================
// THEME TYPES
// =============================================================================

/**
 * Available theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Active theme (resolved from system preference if needed)
 */
export type ActiveTheme = 'light' | 'dark';

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  readonly mode: ThemeMode;
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly background: string;
    readonly surface: string;
    readonly error: string;
    readonly success: string;
    readonly warning: string;
    readonly info: string;
    readonly onPrimary: string;
    readonly onSecondary: string;
    readonly onBackground: string;
    readonly onSurface: string;
    readonly onError: string;
  };
  readonly typography: {
    readonly fontFamily: string;
    readonly fontSize: {
      readonly xs: number;
      readonly sm: number;
      readonly base: number;
      readonly lg: number;
      readonly xl: number;
      readonly '2xl': number;
      readonly '3xl': number;
    };
  };
  readonly spacing: {
    readonly xs: number;
    readonly sm: number;
    readonly base: number;
    readonly lg: number;
    readonly xl: number;
    readonly '2xl': number;
    readonly '3xl': number;
  };
  readonly borderRadius: {
    readonly none: number;
    readonly sm: number;
    readonly base: number;
    readonly lg: number;
    readonly full: number;
  };
}

// =============================================================================
// RE-EXPORTS FROM SUBMODULES
// =============================================================================

export * from './types/index.js';
