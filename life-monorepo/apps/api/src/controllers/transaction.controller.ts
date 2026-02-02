import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
} from '../services/transaction.service.js';
import {
  TransactionSchemas,
  type CreateTransactionInput,
  type UpdateTransactionInput,
  type TransactionQueryInput,
  type TransactionParamsInput,
} from '../schemas/index.js';
import { HttpStatus, NotFoundError, ValidationError } from '../errors/index.js';
import type { AuthenticatedUser } from '../types/index.js';

/**
 * Transaction controller
 * Handles HTTP requests for transaction management
 */

/**
 * Get all transactions handler
 * GET /api/transactions
 */
export async function getTransactionsHandler(
  request: FastifyRequest<{ Querystring: TransactionQueryInput }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  const result = await getTransactions(user.id, request.query);

  reply.status(HttpStatus.OK).send({
    success: true,
    data: result.transactions,
    meta: result.meta,
  });
}

/**
 * Get single transaction handler
 * GET /api/transactions/:id
 */
export async function getTransactionHandler(
  request: FastifyRequest<{ Params: TransactionParamsInput }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  const transaction = await getTransactionById(request.params.id, user.id);

  reply.status(HttpStatus.OK).send({
    success: true,
    data: transaction,
  });
}

/**
 * Create transaction handler
 * POST /api/transactions
 */
export async function createTransactionHandler(
  request: FastifyRequest<{ Body: CreateTransactionInput }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  const transaction = await createTransaction(user.id, request.body);

  reply.status(HttpStatus.CREATED).send({
    success: true,
    data: transaction,
  });
}

/**
 * Update transaction handler
 * PATCH /api/transactions/:id
 */
export async function updateTransactionHandler(
  request: FastifyRequest<{
    Params: TransactionParamsInput;
    Body: UpdateTransactionInput;
  }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  const transaction = await updateTransaction(
    request.params.id,
    user.id,
    request.body
  );

  reply.status(HttpStatus.OK).send({
    success: true,
    data: transaction,
  });
}

/**
 * Delete transaction handler
 * DELETE /api/transactions/:id
 */
export async function deleteTransactionHandler(
  request: FastifyRequest<{ Params: TransactionParamsInput }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  await deleteTransaction(request.params.id, user.id);

  reply.status(HttpStatus.OK).send({
    success: true,
    data: { message: 'Transaction deleted successfully' },
  });
}

/**
 * Get transaction summary handler
 * GET /api/transactions/summary
 */
export async function getTransactionSummaryHandler(
  request: FastifyRequest<{
    Querystring: { startDate?: string; endDate?: string };
  }>,
  reply: FastifyReply
): Promise<void> {
  const user = request.user as AuthenticatedUser;
  const { startDate, endDate } = request.query;

  const summary = await getTransactionSummary(user.id, startDate, endDate);

  reply.status(HttpStatus.OK).send({
    success: true,
    data: summary,
  });
}
