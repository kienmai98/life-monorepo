import type { FastifyInstance } from 'fastify';

// In-memory store for transactions
const transactions: Map<string, any> = new Map();

/**
 * Transaction Routes
 */
export async function transactionRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all transactions
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { page = '1', limit = '10', category, startDate, endDate } = request.query as {
      page?: string;
      limit?: string;
      category?: string;
      startDate?: string;
      endDate?: string;
    };

    let result = Array.from(transactions.values());

    // Apply filters
    if (category) {
      result = result.filter((t) => t.category === category);
    }
    if (startDate) {
      result = result.filter((t) => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter((t) => new Date(t.date) <= new Date(endDate));
    }

    reply.send({
      transactions: result,
      total: result.length,
    });
  });

  // Create transaction
  fastify.post('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const body = request.body as {
      amount?: number;
      category?: string;
      description?: string;
      type?: string;
      date?: string;
    };

    if (body.amount === undefined || body.amount === null) {
      reply.status(400).send({ error: 'Amount is required' });
      return;
    }

    if (body.amount <= 0) {
      reply.status(400).send({ error: 'Amount must be positive' });
      return;
    }

    if (!body.category) {
      reply.status(400).send({ error: 'Category is required' });
      return;
    }

    const id = `txn-${Date.now()}`;
    const transaction = {
      id,
      amount: body.amount,
      category: body.category,
      description: body.description || '',
      type: body.type || 'expense',
      date: body.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    transactions.set(id, transaction);
    reply.status(201).send(transaction);
  });

  // Update transaction
  fastify.patch('/:id', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as Partial<{
      amount: number;
      category: string;
      description: string;
    }>;

    const existing = transactions.get(id);
    if (!existing) {
      reply.status(404).send({ error: 'Transaction not found' });
      return;
    }

    const updated = { ...existing, ...body };
    transactions.set(id, updated);
    reply.send(updated);
  });

  // Delete transaction
  fastify.delete('/:id', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const existing = transactions.get(id);
    if (!existing) {
      reply.status(404).send({ error: 'Transaction not found' });
      return;
    }

    transactions.delete(id);
    reply.send({ success: true });
  });
}
