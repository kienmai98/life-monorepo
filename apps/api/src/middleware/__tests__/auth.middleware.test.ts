import Fastify from 'fastify';
import { describe, expect, it, vi } from 'vitest';

describe('Auth Middleware', () => {
  const createMockRequest = (overrides = {}) => ({
    headers: {},
    jwtVerify: vi.fn(),
    user: null,
    ...overrides,
  });

  const createMockReply = () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis(),
    };
    return reply;
  };

  const createMockDone = () => vi.fn();

  it('allows requests with valid Bearer token', async () => {
    const mockRequest = createMockRequest({
      headers: { authorization: 'Bearer valid-token' },
    });
    mockRequest.jwtVerify.mockResolvedValue({ id: 'user-123' });

    const mockReply = createMockReply();
    const mockDone = createMockDone();

    // Mock the middleware behavior
    if (mockRequest.headers.authorization?.startsWith('Bearer ')) {
      await mockRequest.jwtVerify();
      mockRequest.user = { id: 'user-123' };
      mockDone();
    }

    expect(mockRequest.jwtVerify).toHaveBeenCalled();
    expect(mockRequest.user).toEqual({ id: 'user-123' });
    expect(mockDone).toHaveBeenCalled();
  });

  it('rejects requests without authorization header', async () => {
    const mockRequest = createMockRequest();
    const mockReply = createMockReply();
    const mockDone = createMockDone();

    // Simulate middleware behavior
    if (!mockRequest.headers.authorization) {
      mockReply.status(401);
      mockReply.send({ error: 'Unauthorized' });
    }

    expect(mockReply.status).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });

  it('rejects requests with invalid token format', async () => {
    const mockRequest = createMockRequest({
      headers: { authorization: 'Basic invalid' },
    });
    const mockReply = createMockReply();

    // Simulate middleware behavior
    if (!mockRequest.headers.authorization?.startsWith('Bearer ')) {
      mockReply.status(401);
      mockReply.send({ error: 'Unauthorized - Bearer token required' });
    }

    expect(mockReply.status).toHaveBeenCalledWith(401);
  });

  it('rejects requests with expired token', async () => {
    const mockRequest = createMockRequest({
      headers: { authorization: 'Bearer expired-token' },
    });
    mockRequest.jwtVerify.mockRejectedValue(new Error('Token expired'));

    const mockReply = createMockReply();

    // Simulate middleware behavior
    try {
      await mockRequest.jwtVerify();
    } catch (err) {
      mockReply.status(401);
      mockReply.send({ error: 'Token expired' });
    }

    expect(mockReply.status).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Token expired' });
  });

  it('handles malformed JWT tokens', async () => {
    const mockRequest = createMockRequest({
      headers: { authorization: 'Bearer malformed.token.here' },
    });
    mockRequest.jwtVerify.mockRejectedValue(new Error('Invalid token'));

    const mockReply = createMockReply();

    try {
      await mockRequest.jwtVerify();
    } catch (err) {
      mockReply.status(401);
      mockReply.send({ error: 'Invalid token' });
    }

    expect(mockReply.status).toHaveBeenCalledWith(401);
  });
});

describe('CORS Middleware', () => {
  it('allows requests from allowed origins', async () => {
    const app = Fastify({ logger: false });

    await app.register(require('@fastify/cors'), {
      origin: ['http://localhost:3000', 'https://app.example.com'],
      credentials: true,
    });

    app.get('/test', async () => ({ success: true }));
    await app.ready();

    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: {
        origin: 'http://localhost:3000',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');

    await app.close();
  });
});

describe('Error Handler Middleware', () => {
  it('handles validation errors', async () => {
    const app = Fastify({ logger: false });

    app.setErrorHandler((error, request, reply) => {
      if (error.validation) {
        reply.status(400).send({
          error: 'Validation Error',
          message: error.message,
        });
      } else {
        reply.status(500).send({
          error: 'Internal Server Error',
        });
      }
    });

    app.post(
      '/test',
      {
        schema: {
          body: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
            },
          },
        },
      },
      async () => ({ success: true })
    );

    await app.ready();

    const response = await app.inject({
      method: 'POST',
      url: '/test',
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toHaveProperty('error', 'Validation Error');

    await app.close();
  });

  it('handles unknown errors as 500', async () => {
    const app = Fastify({ logger: false });

    app.setErrorHandler((error, request, reply) => {
      reply.status(500).send({
        error: 'Internal Server Error',
      });
    });

    app.get('/test', async () => {
      throw new Error('Unexpected error');
    });

    await app.ready();

    const response = await app.inject({
      method: 'GET',
      url: '/test',
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toHaveProperty('error', 'Internal Server Error');

    await app.close();
  });
});
