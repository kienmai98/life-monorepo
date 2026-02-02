import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Authenticated user information from JWT token
 */
export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
}

/**
 * User roles for authorization
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * API Response wrapper for consistent responses
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

/**
 * API Error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

/**
 * Response metadata for pagination
 */
export interface ResponseMeta {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page: number;
  limit: number;
}

/**
 * Date range filter
 */
export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}
