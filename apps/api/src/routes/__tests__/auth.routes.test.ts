import Fastify from 'fastify';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { jwtPlugin } from '../plugins/jwt';
import { authRoutes } from '../routes/auth.routes';

// Create a test app
const buildApp = () => {
  const app = Fastify({ logger: false });

  app.register(jwtPlugin);
  app.register(authRoutes, { prefix: '/api/auth' });

  return app;
};

describe('Auth Routes', () => {
  const app = buildApp();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/login', () => {
    it('returns 400 when email is missing', async () => {
      const response = await request(app.server)
        .post('/api/auth/login')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('returns 400 when password is missing', async () => {
      const response = await request(app.server)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('returns 401 with invalid credentials', async () => {
      const response = await request(app.server).post('/api/auth/login').send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/register', () => {
    it('returns 400 when email is missing', async () => {
      const response = await request(app.server)
        .post('/api/auth/register')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
    });

    it('returns 400 when password is too short', async () => {
      const response = await request(app.server).post('/api/auth/register').send({
        email: 'test@example.com',
        password: '123',
      });

      expect(response.status).toBe(400);
    });

    it('returns 400 for invalid email format', async () => {
      const response = await request(app.server).post('/api/auth/register').send({
        email: 'not-an-email',
        password: 'password123',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('returns 200 with success message', async () => {
      const response = await request(app.server).post('/api/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('POST /api/auth/reset-password', () => {
    it('returns 400 when email is missing', async () => {
      const response = await request(app.server).post('/api/auth/reset-password').send({});

      expect(response.status).toBe(400);
    });

    it('accepts valid email for password reset', async () => {
      const response = await request(app.server)
        .post('/api/auth/reset-password')
        .send({ email: 'test@example.com' });

      // Should return success even if user doesn't exist (security)
      expect([200, 202]).toContain(response.status);
    });
  });
});
