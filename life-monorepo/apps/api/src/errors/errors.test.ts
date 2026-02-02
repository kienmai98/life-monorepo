import { describe, it, expect } from 'vitest';
import {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalServerError,
  isApiError,
  HttpStatus,
} from '../errors/index.js';

describe('Error Classes', () => {
  describe('ApiError', () => {
    it('should create an ApiError with correct properties', () => {
      const error = new ApiError('TEST_ERROR', 'Test message', 400, { field: ['error'] });
      
      expect(error.code).toBe('TEST_ERROR');
      expect(error.message).toBe('Test message');
      expect(error.statusCode).toBe(400);
      expect(error.details).toEqual({ field: ['error'] });
    });

    it('should convert to JSON correctly', () => {
      const error = new ApiError('TEST_ERROR', 'Test message', 400);
      
      expect(error.toJSON()).toEqual({
        code: 'TEST_ERROR',
        message: 'Test message',
        details: undefined,
      });
    });
  });

  describe('Specific Error Classes', () => {
    it('ValidationError should have correct defaults', () => {
      const error = new ValidationError();
      
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('AuthenticationError should have correct defaults', () => {
      const error = new AuthenticationError();
      
      expect(error.code).toBe('AUTHENTICATION_ERROR');
      expect(error.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('AuthorizationError should have correct defaults', () => {
      const error = new AuthorizationError();
      
      expect(error.code).toBe('AUTHORIZATION_ERROR');
      expect(error.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('NotFoundError should have correct defaults', () => {
      const error = new NotFoundError('User');
      
      expect(error.code).toBe('NOT_FOUND');
      expect(error.message).toBe('User not found');
      expect(error.statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('ConflictError should have correct defaults', () => {
      const error = new ConflictError();
      
      expect(error.code).toBe('CONFLICT');
      expect(error.statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('RateLimitError should have correct defaults', () => {
      const error = new RateLimitError();
      
      expect(error.code).toBe('RATE_LIMIT');
      expect(error.statusCode).toBe(HttpStatus.TOO_MANY_REQUESTS);
    });

    it('InternalServerError should have correct defaults', () => {
      const error = new InternalServerError();
      
      expect(error.code).toBe('INTERNAL_ERROR');
      expect(error.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('isApiError', () => {
    it('should return true for ApiError instances', () => {
      const error = new ValidationError();
      expect(isApiError(error)).toBe(true);
    });

    it('should return false for regular Error', () => {
      const error = new Error('Regular error');
      expect(isApiError(error)).toBe(false);
    });

    it('should return false for non-error values', () => {
      expect(isApiError(null)).toBe(false);
      expect(isApiError(undefined)).toBe(false);
      expect(isApiError('string')).toBe(false);
    });
  });
});
