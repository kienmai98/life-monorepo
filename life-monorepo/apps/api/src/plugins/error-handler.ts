import { FastifyInstance, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import { isApiError, InternalServerError, HttpStatus } from '../errors/index.js';

/**
 * Global error handler plugin
 * 
 * Centralizes error handling across the application
 */
export default fp(async function errorHandlerPlugin(
  fastify: FastifyInstance
): Promise<void> {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    // Log error details for debugging
    request.log.error({
      err: error,
      requestId: request.id,
      url: request.url,
      method: request.method,
    }, 'Request error');

    // Handle API errors (custom error classes)
    if (isApiError(error)) {
      return reply.status(error.statusCode).send({
        success: false,
        error: error.toJSON(),
      });
    }

    // Handle validation errors from Fastify
    if (error.validation) {
      const validationError = error.validation;
      return reply.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message,
          details: validationError,
        },
      });
    }

    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      return reply.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error,
        },
      });
    }

    // Handle JWT errors
    if (error.code?.startsWith('FST_JWT')) {
      return reply.status(HttpStatus.UNAUTHORIZED).send({
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid or expired token',
        },
      });
    }

    // Handle rate limit errors
    if (error.code === 'FST_ERR_RATE_LIMIT') {
      return reply.status(HttpStatus.TOO_MANY_REQUESTS).send({
        success: false,
        error: {
          code: 'RATE_LIMIT',
          message: 'Rate limit exceeded. Please try again later.',
        },
      });
    }

    // Handle all other errors as internal server errors
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: isDevelopment ? error.message : 'Internal server error',
        ...(isDevelopment && { stack: error.stack }),
      },
    });
  });

  // Handle 404 errors
  fastify.setNotFoundHandler((request, reply) => {
    request.log.warn({
      url: request.url,
      method: request.method,
    }, 'Route not found');

    reply.status(HttpStatus.NOT_FOUND).send({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Route ${request.method} ${request.url} not found`,
      },
    });
  });
});
