import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  loginHandler,
  registerHandler,
  logoutHandler,
  resetPasswordHandler,
  getProfileHandler,
} from '../controllers/auth.controller.js';
import { AuthSchemas } from '../schemas/index.js';

/**
 * Authentication routes
 * Base path: /api/auth
 */
export default async function authRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> {
  /**
   * POST /api/auth/login
   * Authenticate user and return JWT token
   */
  app.post('/login', {
    schema: {
      tags: ['Auth'],
      description: 'Authenticate user with email and password',
      body: AuthSchemas.login,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: { type: 'string' },
              },
            },
          },
        },
        401: { $ref: '#/components/schemas/Error' },
      },
    },
    // Apply rate limiting for auth endpoints
    preHandler: async (request) => {
      await app.rateLimit.check(request, 'auth');
    },
  }, loginHandler);

  /**
   * POST /api/auth/register
   * Register a new user
   */
  app.post('/register', {
    schema: {
      tags: ['Auth'],
      description: 'Register a new user account',
      body: AuthSchemas.register,
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: { type: 'string' },
              },
            },
          },
        },
        409: { $ref: '#/components/schemas/Error' },
      },
    },
    preHandler: async (request) => {
      await app.rateLimit.check(request, 'auth');
    },
  }, registerHandler);

  /**
   * POST /api/auth/logout
   * Logout user (client should discard token)
   */
  app.post('/logout', {
    schema: {
      tags: ['Auth'],
      description: 'Logout current user',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    onRequest: [app.authenticate],
  }, logoutHandler);

  /**
   * POST /api/auth/reset-password
   * Request password reset email
   */
  app.post('/reset-password', {
    schema: {
      tags: ['Auth'],
      description: 'Request password reset email',
      body: AuthSchemas.resetPassword,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    preHandler: async (request) => {
      await app.rateLimit.check(request, 'auth');
    },
  }, resetPasswordHandler);

  /**
   * GET /api/auth/profile
   * Get current user profile
   */
  app.get('/profile', {
    schema: {
      tags: ['Auth'],
      description: 'Get current authenticated user profile',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
        401: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, getProfileHandler);
}
