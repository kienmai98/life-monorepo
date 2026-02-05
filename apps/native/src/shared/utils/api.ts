/**
 * API utility functions for the Life app
 * @module shared/utils/api
 */

import type { ApiError, ApiResponse, PaginationInfo } from '@/shared/types';

/**
 * API configuration
 */
const API_CONFIG = {
  baseURL: 'https://api.life-app.example.com',
  timeout: 30000,
  retries: 3,
};

/**
 * Request options interface
 */
interface RequestOptions extends RequestInit {
  /** Whether to require authentication */
  requiresAuth?: boolean;
  /** Custom timeout in milliseconds */
  timeout?: number;
  /** Number of retries on failure */
  retries?: number;
}

/**
 * Request state for tracking
 */
interface RequestState {
  /** Abort controller for cancellation */
  controller: AbortController;
  /** Timestamp when request started */
  startTime: number;
}

// Track active requests for cancellation
const activeRequests = new Map<string, RequestState>();

/**
 * Generates a unique request ID
 */
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates API error from response
 */
const createApiError = async (response: Response): Promise<ApiError> => {
  let message = 'An error occurred';
  let details: Record<string, unknown> | undefined;

  try {
    const data = await response.json();
    message = data.message || data.error || message;
    details = data.details;
  } catch {
    message = response.statusText || message;
  }

  return {
    message,
    code: `HTTP_${response.status}`,
    statusCode: response.status,
    details,
  };
};

/**
 * Makes an HTTP request with automatic retries and error handling
 * @param endpoint - API endpoint (relative to baseURL)
 * @param options - Request options
 * @returns Promise with typed response
 *
 * @example
 * // GET request
 * const { data } = await apiRequest<User>('/users/me');
 *
 * // POST request
 * const { data } = await apiRequest<Transaction>('/transactions', {
 *   method: 'POST',
 *   body: JSON.stringify(newTransaction),
 * });
 *
 * // With auth and custom timeout
 * const { data } = await apiRequest<User>('/users/me', {
 *   requiresAuth: true,
 *   timeout: 10000,
 * });
 */
export const apiRequest = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const {
    requiresAuth = true,
    timeout = API_CONFIG.timeout,
    retries = API_CONFIG.retries,
    ...fetchOptions
  } = options;

  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const requestId = generateRequestId();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  activeRequests.set(requestId, {
    controller,
    startTime: Date.now(),
  });

  // Add auth header if required
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  if (requiresAuth) {
    // TODO: Get token from secure storage
    const token = ''; // await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      activeRequests.delete(requestId);

      if (!response.ok) {
        const error = await createApiError(response);

        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          return {
            success: false,
            error: error.message,
            errorCode: error.code,
          };
        }

        throw new Error(error.message);
      }

      const data = await response.json();

      // Check for pagination headers
      const pagination: PaginationInfo | undefined = response.headers.get('X-Total-Count')
        ? {
            page: Number.parseInt(response.headers.get('X-Page') || '1', 10),
            pageSize: Number.parseInt(response.headers.get('X-Page-Size') || '20', 10),
            total: Number.parseInt(response.headers.get('X-Total-Count') || '0', 10),
            totalPages: Number.parseInt(response.headers.get('X-Total-Pages') || '0', 10),
            hasMore: response.headers.get('X-Has-More') === 'true',
          }
        : undefined;

      return {
        success: true,
        data,
        pagination,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on abort
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request was cancelled',
          errorCode: 'REQUEST_CANCELLED',
        };
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries - 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
      }
    }
  }

  activeRequests.delete(requestId);

  return {
    success: false,
    error: lastError?.message || 'Request failed after retries',
    errorCode: 'REQUEST_FAILED',
  };
};

/**
 * Cancels an active request
 * @param requestId - ID of the request to cancel
 */
export const cancelRequest = (requestId: string): void => {
  const request = activeRequests.get(requestId);
  if (request) {
    request.controller.abort();
    activeRequests.delete(requestId);
  }
};

/**
 * Cancels all active requests
 */
export const cancelAllRequests = (): void => {
  for (const request of activeRequests.values()) {
    request.controller.abort();
  }
  activeRequests.clear();
};

/**
 * Convenience method for GET requests
 */
export const get = <T = unknown>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
};

/**
 * Convenience method for POST requests
 */
export const post = <T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * Convenience method for PUT requests
 */
export const put = <T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

/**
 * Convenience method for PATCH requests
 */
export const patch = <T = unknown>(
  endpoint: string,
  body: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

/**
 * Convenience method for DELETE requests
 */
export const del = <T = unknown>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
};

// Default export
export default {
  request: apiRequest,
  get,
  post,
  put,
  patch,
  delete: del,
  cancelRequest,
  cancelAllRequests,
};
