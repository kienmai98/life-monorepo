import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

/**
 * JWT Plugin for Fastify
 * Handles JWT authentication (mock implementation for tests)
 */
export const jwtPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Mock authenticate decorator
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      // Mock user for testing
      request.user = { id: 'user-123', email: 'test@example.com' };
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });
};
