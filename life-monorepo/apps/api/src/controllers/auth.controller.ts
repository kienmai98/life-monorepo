import type { FastifyRequest, FastifyReply } from 'fastify';
import { loginUser, registerUser, sendPasswordReset } from '../services/auth.service.js';
import { AuthSchemas, type LoginInput, type RegisterInput, type ResetPasswordInput } from '../schemas/index.js';
import { HttpStatus } from '../errors/index.js';

/**
 * Auth controller
 * Handles HTTP requests for authentication
 */

/**
 * Login handler
 * POST /api/auth/login
 */
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
): Promise<void> {
  const result = await loginUser(request.body);
  const token = await reply.jwtSign({
    id: result.user.id,
    email: result.user.email,
    displayName: result.user.displayName,
    role: result.user.role,
  });

  reply.status(HttpStatus.OK).send({
    success: true,
    data: {
      user: result.user,
      token,
    },
  });
}

/**
 * Register handler
 * POST /api/auth/register
 */
export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply
): Promise<void> {
  const result = await registerUser(request.body);
  const token = await reply.jwtSign({
    id: result.user.id,
    email: result.user.email,
    displayName: result.user.displayName,
    role: result.user.role,
  });

  reply.status(HttpStatus.CREATED).send({
    success: true,
    data: {
      user: result.user,
      token,
    },
  });
}

/**
 * Logout handler
 * POST /api/auth/logout
 */
export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // In a stateless JWT setup, logout is handled client-side
  // For token blacklisting, implement a token store
  reply.status(HttpStatus.OK).send({
    success: true,
    data: { message: 'Logged out successfully' },
  });
}

/**
 * Reset password handler
 * POST /api/auth/reset-password
 */
export async function resetPasswordHandler(
  request: FastifyRequest<{ Body: ResetPasswordInput }>,
  reply: FastifyReply
): Promise<void> {
  await sendPasswordReset(request.body.email);

  // Always return success to prevent email enumeration
  reply.status(HttpStatus.OK).send({
    success: true,
    data: { message: 'If an account exists, a reset email has been sent' },
  });
}

/**
 * Get profile handler
 * GET /api/auth/profile
 */
export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply.status(HttpStatus.OK).send({
    success: true,
    data: { user: request.user },
  });
}
