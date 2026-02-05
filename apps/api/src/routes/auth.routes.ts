import type { FastifyInstance } from 'fastify';

/**
 * Auth Routes
 */
export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  // Login route
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email?: string; password?: string };

    if (!email) {
      reply.status(400).send({ error: 'Email is required' });
      return;
    }

    if (!password) {
      reply.status(400).send({ error: 'Password is required' });
      return;
    }

    if (email !== 'test@example.com' || password !== 'password123') {
      reply.status(401).send({ error: 'Invalid credentials' });
      return;
    }

    reply.send({ token: 'fake-jwt-token' });
  });

  // Register route
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body as { email?: string; password?: string };

    if (!email) {
      reply.status(400).send({ error: 'Email is required' });
      return;
    }

    if (!password || password.length < 6) {
      reply.status(400).send({ error: 'Password must be at least 6 characters' });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      reply.status(400).send({ error: 'Invalid email format' });
      return;
    }

    reply.status(201).send({ success: true });
  });

  // Logout route
  fastify.post('/logout', async (_request, reply) => {
    reply.send({ success: true });
  });

  // Reset password route
  fastify.post('/reset-password', async (request, reply) => {
    const { email } = request.body as { email?: string };

    if (!email) {
      reply.status(400).send({ error: 'Email is required' });
      return;
    }

    reply.status(200).send({ success: true });
  });
}
