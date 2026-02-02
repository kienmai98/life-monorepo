/**
 * Base API Error class
 */
export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

/**
 * Validation Error - 400 Bad Request
 */
export class ValidationError extends ApiError {
  constructor(
    message = 'Validation failed',
    details?: Record<string, string[]>
  ) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication Error - 401 Unauthorized
 */
export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super('AUTHENTICATION_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization Error - 403 Forbidden
 */
export class AuthorizationError extends ApiError {
  constructor(message = 'Access denied') {
    super('AUTHORIZATION_ERROR', message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Not Found Error - 404 Not Found
 */
export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error - 409 Conflict
 */
export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists') {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

/**
 * Rate Limit Error - 429 Too Many Requests
 */
export class RateLimitError extends ApiError {
  constructor(message = 'Rate limit exceeded') {
    super('RATE_LIMIT', message, 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Internal Server Error - 500 Internal Server Error
 */
export class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super('INTERNAL_ERROR', message, 500);
    this.name = 'InternalServerError';
  }
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * HTTP Status codes enum
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
