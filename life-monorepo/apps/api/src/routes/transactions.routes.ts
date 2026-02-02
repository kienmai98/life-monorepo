import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getTransactionsHandler,
  getTransactionHandler,
  createTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getTransactionSummaryHandler,
} from '../controllers/transaction.controller.js';
import { TransactionSchemas } from '../schemas/index.js';

/**
 * Transaction routes
 * Base path: /api/transactions
 */
export default async function transactionRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> {
  /**
   * GET /api/transactions
   * Get all transactions with pagination and filtering
   */
  app.get('/', {
    schema: {
      tags: ['Transactions'],
      description: 'Get paginated list of transactions',
      security: [{ bearerAuth: [] }],
      querystring: TransactionSchemas.query,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Transaction' },
            },
            meta: { $ref: '#/components/schemas/PaginationMeta' },
          },
        },
        401: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, getTransactionsHandler);

  /**
   * GET /api/transactions/summary
   * Get transaction summary (income, expenses, balance)
   */
  app.get('/summary', {
    schema: {
      tags: ['Transactions'],
      description: 'Get transaction summary statistics',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                totalIncome: { type: 'number' },
                totalExpense: { type: 'number' },
                balance: { type: 'number' },
              },
            },
          },
        },
        401: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, getTransactionSummaryHandler);

  /**
   * GET /api/transactions/:id
   * Get a single transaction by ID
   */
  app.get('/:id', {
    schema: {
      tags: ['Transactions'],
      description: 'Get a single transaction by ID',
      security: [{ bearerAuth: [] }],
      params: TransactionSchemas.params,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: '#/components/schemas/Transaction' },
          },
        },
        401: { $ref: '#/components/schemas/Error' },
        404: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, getTransactionHandler);

  /**
   * POST /api/transactions
   * Create a new transaction
   */
  app.post('/', {
    schema: {
      tags: ['Transactions'],
      description: 'Create a new transaction',
      security: [{ bearerAuth: [] }],
      body: TransactionSchemas.create,
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: '#/components/schemas/Transaction' },
          },
        },
        400: { $ref: '#/components/schemas/Error' },
        401: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, createTransactionHandler);

  /**
   * PATCH /api/transactions/:id
   * Update an existing transaction
   */
  app.patch('/:id', {
    schema: {
      tags: ['Transactions'],
      description: 'Update an existing transaction',
      security: [{ bearerAuth: [] }],
      params: TransactionSchemas.params,
      body: TransactionSchemas.update,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { $ref: '#/components/schemas/Transaction' },
          },
        },
        400: { $ref: '#/components/schemas/Error' },
        401: { $ref: '#/components/schemas/Error' },
        403: { $ref: '#/components/schemas/Error' },
        404: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, updateTransactionHandler);

  /**
   * DELETE /api/transactions/:id
   * Delete a transaction
   */
  app.delete('/:id', {
    schema: {
      tags: ['Transactions'],
      description: 'Delete a transaction',
      security: [{ bearerAuth: [] }],
      params: TransactionSchemas.params,
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
        401: { $ref: '#/components/schemas/Error' },
        403: { $ref: '#/components/schemas/Error' },
        404: { $ref: '#/components/schemas/Error' },
      },
    },
    onRequest: [app.authenticate],
  }, deleteTransactionHandler);
}
