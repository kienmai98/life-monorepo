import { supabase } from '../lib/database.js';
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from '../errors/index.js';
import type { LoginInput, RegisterInput } from '../schemas/index.js';
import type { AuthenticatedUser } from '../types/index.js';

/**
 * User type from database
 */
interface DbUser {
  id: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  role: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

/**
 * Auth token response
 */
export interface AuthToken {
  token: string;
  expiresAt: number;
}

/**
 * Login user with credentials
 */
export async function loginUser(
  input: LoginInput
): Promise<{ user: AuthenticatedUser; token: string }> {
  // For demo purposes, using mock authentication
  // In production, use Supabase Auth or similar
  if (input.email === 'test@example.com' && input.password === 'password123') {
    const user: AuthenticatedUser = {
      id: 'user-123',
      email: input.email,
      displayName: 'Test User',
      photoURL: null,
      role: 'user' as const,
    };

    return { user, token: 'mock-jwt-token' };
  }

  throw new AuthenticationError('Invalid email or password');
}

/**
 * Register a new user
 */
export async function registerUser(
  input: RegisterInput
): Promise<{ user: AuthenticatedUser; token: string }> {
  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', input.email)
    .single();

  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  // For demo purposes, create mock user
  // In production, use Supabase Auth signUp
  const user: AuthenticatedUser = {
    id: `user-${Date.now()}`,
    email: input.email,
    displayName: input.displayName ?? null,
    photoURL: null,
    role: 'user' as const,
  };

  return { user, token: 'mock-jwt-token' };
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  // Verify user exists
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (!user) {
    // Don't reveal if user exists for security
    return;
  }

  // In production, send actual password reset email via Supabase Auth
  console.log(`Password reset requested for: ${email}`);
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<AuthenticatedUser> {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, display_name, photo_url, role')
    .eq('id', id)
    .single();

  if (error || !user) {
    throw new NotFoundError('User');
  }

  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    photoURL: user.photo_url,
    role: user.role as 'user' | 'admin',
  };
}

/**
 * Validate and decode JWT token
 */
export async function validateToken(token: string): Promise<AuthenticatedUser> {
  // In production, use proper JWT verification
  // This is a mock implementation
  if (token === 'mock-jwt-token') {
    return {
      id: 'user-123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
      role: 'user' as const,
    };
  }

  throw new AuthenticationError('Invalid token');
}
