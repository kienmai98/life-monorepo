import { supabase } from '../lib/database.js';
import {
  NotFoundError,
  AuthorizationError,
  ValidationError,
} from '../errors/index.js';
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionQueryInput,
} from '../schemas/index.js';
import type { ResponseMeta } from '../types/index.js';

/**
 * Transaction type
 */
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
  createdAt: string;
  updatedAt: string | null;
}

/**
 * Database transaction row
 */
interface DbTransaction {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
  created_at: string;
  updated_at: string | null;
}

/**
 * Paginated transactions result
 */
export interface PaginatedTransactions {
  transactions: Transaction[];
  meta: ResponseMeta;
}

/**
 * Map database row to Transaction type
 */
function mapDbToTransaction(db: DbTransaction): Transaction {
  return {
    id: db.id,
    userId: db.user_id,
    amount: db.amount,
    category: db.category,
    description: db.description,
    type: db.type,
    date: db.date,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

/**
 * Get transactions for a user with filtering and pagination
 */
export async function getTransactions(
  userId: string,
  query: TransactionQueryInput
): Promise<PaginatedTransactions> {
  const { page = 1, limit = 20, category, type, startDate, endDate } = query;

  let dbQuery = supabase
    .from('transactions')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  // Apply filters
  if (category) {
    dbQuery = dbQuery.eq('category', category);
  }
  if (type) {
    dbQuery = dbQuery.eq('type', type);
  }
  if (startDate) {
    dbQuery = dbQuery.gte('date', startDate);
  }
  if (endDate) {
    dbQuery = dbQuery.lte('date', endDate);
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  dbQuery = dbQuery.order('date', { ascending: false }).range(from, to);

  const { data, error, count } = await dbQuery;

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }

  const total = count ?? 0;
  const transactions = (data ?? []).map(mapDbToTransaction);

  return {
    transactions,
    meta: {
      page,
      pageSize: limit,
      total,
      hasMore: page * limit < total,
    },
  };
}

/**
 * Get a single transaction by ID
 */
export async function getTransactionById(
  id: string,
  userId: string
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new NotFoundError('Transaction');
  }

  // Verify ownership
  if (data.user_id !== userId) {
    throw new AuthorizationError('You do not have access to this transaction');
  }

  return mapDbToTransaction(data);
}

/**
 * Create a new transaction
 */
export async function createTransaction(
  userId: string,
  input: CreateTransactionInput
): Promise<Transaction> {
  // Validate amount based on transaction type
  if (input.type === 'expense' && input.amount < 0) {
    throw new ValidationError('Expense amount must be positive', {
      amount: ['Expense amount must be positive'],
    });
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      amount: input.amount,
      category: input.category,
      description: input.description,
      type: input.type,
      date: input.date,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create transaction: ${error?.message}`);
  }

  return mapDbToTransaction(data);
}

/**
 * Update an existing transaction
 */
export async function updateTransaction(
  id: string,
  userId: string,
  input: UpdateTransactionInput
): Promise<Transaction> {
  // First check if transaction exists and belongs to user
  await getTransactionById(id, userId);

  const updateData: Partial<DbTransaction> = {};
  if (input.amount !== undefined) updateData.amount = input.amount;
  if (input.category !== undefined) updateData.category = input.category;
  if (input.description !== undefined) updateData.description = input.description;
  if (input.type !== undefined) updateData.type = input.type;
  if (input.date !== undefined) updateData.date = input.date;

  const { data, error } = await supabase
    .from('transactions')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to update transaction: ${error?.message}`);
  }

  return mapDbToTransaction(data);
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(
  id: string,
  userId: string
): Promise<void> {
  // First check if transaction exists and belongs to user
  await getTransactionById(id, userId);

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
}

/**
 * Get transaction summary for user
 */
export async function getTransactionSummary(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<{
  totalIncome: number;
  totalExpense: number;
  balance: number;
}> {
  let query = supabase.from('transactions').select('type, amount').eq('user_id', userId);

  if (startDate) {
    query = query.gte('date', startDate);
  }
  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to get summary: ${error.message}`);
  }

  const transactions = data ?? [];
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}
