import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { AuthenticationError } from '../errors/index.js';

/**
 * JWT Authentication plugin
 * 
 * Adds `authenticate` decorator to Fastify instance and `user` to request
 */
export default fp(async function authPlugin(
  fastify: FastifyInstance
): Promise<void> {
  // Authentication hook
  async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      await request.jwtVerify();
      
      // Validate user object structure
      const user = request.user as Record<string, unknown>;
      
      if (!user?.id || typeof user.id !== 'string') {
        throw new AuthenticationError('Invalid token: missing user ID');
      }
      
      if (!user?.email || typeof user.email !== 'string') {
        throw new AuthenticationError('Invalid token: missing email');
      }
    } catch (err) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  // Register authenticate decorator
  fastify.decorate('authenticate', authenticate);
});

// Declaration merging for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: {
      id: string;
      email: string;
      [key: string]: unknown;
    };
  }
}
