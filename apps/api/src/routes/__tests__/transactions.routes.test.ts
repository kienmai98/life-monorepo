import Fastify from 'fastify';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { jwtPlugin } from '../plugins/jwt';
import { transactionRoutes } from '../routes/transactions.routes';

// Create a test app with auth
const buildApp = () => {
  const app = Fastify({ logger: false });

  app.register(jwtPlugin);

  // Mock auth middleware for testing
  app.decorate('authenticate', async (request: any, reply: any) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token || token === 'invalid-token') {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
      }
      request.user = { id: 'user-123', email: 'test@example.com' };
    } catch (_err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  app.register(transactionRoutes, { prefix: '/api/transactions' });

  return app;
};

describe('Transaction Routes', () => {
  const app = buildApp();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/transactions', () => {
    it('returns 401 without authorization header', async () => {
      const response = await request(app.server).get('/api/transactions');

      expect(response.status).toBe(401);
    });

    it('returns 401 with invalid token', async () => {
      const response = await request(app.server)
        .get('/api/transactions')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });

    it('returns transactions with valid token', async () => {
      const response = await request(app.server)
        .get('/api/transactions')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('transactions');
      expect(Array.isArray(response.body.transactions)).toBe(true);
    });

    it('supports pagination query params', async () => {
      const response = await request(app.server)
        .get('/api/transactions?page=1&limit=10')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
    });

    it('supports date range filter', async () => {
      const response = await request(app.server)
        .get('/api/transactions?startDate=2024-01-01&endDate=2024-01-31')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
    });

    it('supports category filter', async () => {
      const response = await request(app.server)
        .get('/api/transactions?category=food')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/transactions', () => {
    it('returns 401 without authorization', async () => {
      const response = await request(app.server).post('/api/transactions').send({
        amount: 50,
        category: 'food',
        description: 'Lunch',
      });

      expect(response.status).toBe(401);
    });

    it('returns 400 when amount is missing', async () => {
      const response = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          category: 'food',
          description: 'Lunch',
        });

      expect(response.status).toBe(400);
    });

    it('returns 400 when category is missing', async () => {
      const response = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          amount: 50,
          description: 'Lunch',
        });

      expect(response.status).toBe(400);
    });

    it('returns 201 with valid transaction data', async () => {
      const response = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          amount: 50,
          category: 'food',
          description: 'Lunch at cafe',
          type: 'expense',
          date: new Date().toISOString(),
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.amount).toBe(50);
    });

    it('returns 400 for negative amount', async () => {
      const response = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          amount: -50,
          category: 'food',
          description: 'Lunch',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /api/transactions/:id', () => {
    it('returns 401 without authorization', async () => {
      const response = await request(app.server)
        .patch('/api/transactions/txn-123')
        .send({ amount: 100 });

      expect(response.status).toBe(401);
    });

    it('returns 404 for non-existent transaction', async () => {
      const response = await request(app.server)
        .patch('/api/transactions/non-existent')
        .set('Authorization', 'Bearer valid-token')
        .send({ amount: 100 });

      expect(response.status).toBe(404);
    });

    it('returns 200 with valid update data', async () => {
      // First create a transaction
      const createResponse = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          amount: 50,
          category: 'food',
          description: 'Original',
        });

      const transactionId = createResponse.body.id;

      const response = await request(app.server)
        .patch(`/api/transactions/${transactionId}`)
        .set('Authorization', 'Bearer valid-token')
        .send({ description: 'Updated' });

      expect(response.status).toBe(200);
      expect(response.body.description).toBe('Updated');
    });
  });

  describe('DELETE /api/transactions/:id', () => {
    it('returns 401 without authorization', async () => {
      const response = await request(app.server).delete('/api/transactions/txn-123');

      expect(response.status).toBe(401);
    });

    it('returns 404 for non-existent transaction', async () => {
      const response = await request(app.server)
        .delete('/api/transactions/non-existent')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(404);
    });

    it('returns 200 on successful deletion', async () => {
      // First create a transaction
      const createResponse = await request(app.server)
        .post('/api/transactions')
        .set('Authorization', 'Bearer valid-token')
        .send({
          amount: 50,
          category: 'food',
          description: 'To delete',
        });

      const transactionId = createResponse.body.id;

      const response = await request(app.server)
        .delete(`/api/transactions/${transactionId}`)
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });
});
