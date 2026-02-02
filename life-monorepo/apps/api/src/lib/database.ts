import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Database configuration
 */
const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY ?? '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
}

/**
 * Supabase client instance
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: 'public',
  },
});

/**
 * Database transaction wrapper
 * Executes operations within a transaction and rolls back on error
 */
export async function withTransaction<T>(
  operations: (client: SupabaseClient) => Promise<T>
): Promise<T> {
  // Note: Supabase doesn't support traditional transactions across multiple operations
  // For complex transactions, use database functions or stored procedures
  // This wrapper provides a consistent interface for future flexibility
  try {
    return await operations(supabase);
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

/**
 * Type-safe database query builder helper
 */
export function createQueryBuilder(table: string) {
  return {
    select: <T = unknown>(columns = '*') => 
      supabase.from(table).select(columns) as Promise<{ data: T[] | null; error: Error | null }>,
    
    selectSingle: <T = unknown>(columns = '*') =>
      supabase.from(table).select(columns).single() as Promise<{ data: T | null; error: Error | null }>,
    
    insert: <T = unknown>(data: Partial<T> | Partial<T>[]) =>
      supabase.from(table).insert(data).select() as Promise<{ data: T[] | null; error: Error | null }>,
    
    update: <T = unknown>(id: string, data: Partial<T>) =>
      supabase.from(table).update(data).eq('id', id).select() as Promise<{ data: T[] | null; error: Error | null }>,
    
    delete: (id: string) =>
      supabase.from(table).delete().eq('id', id) as Promise<{ error: Error | null }>,
  };
}

/**
 * Database table names enum for type safety
 */
export enum DatabaseTables {
  USERS = 'users',
  TRANSACTIONS = 'transactions',
  CATEGORIES = 'categories',
}
