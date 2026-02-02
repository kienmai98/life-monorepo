import { describe, it, expect } from 'vitest';
import {
  AuthSchemas,
  TransactionSchemas,
  type LoginInput,
  type RegisterInput,
  type CreateTransactionInput,
} from '../schemas/index.js';

describe('Auth Schemas', () => {
  describe('login schema', () => {
    it('should validate correct login input', () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const result = AuthSchemas.login.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const input = {
        email: 'invalid-email',
        password: 'password123',
      };
      
      const result = AuthSchemas.login.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const input = {
        email: 'test@example.com',
        password: '',
      };
      
      const result = AuthSchemas.login.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('register schema', () => {
    it('should validate correct registration input', () => {
      const input = {
        email: 'test@example.com',
        password: 'SecurePass123',
        displayName: 'Test User',
      };
      
      const result = AuthSchemas.register.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject weak password', () => {
      const input = {
        email: 'test@example.com',
        password: 'weak',
        displayName: 'Test User',
      };
      
      const result = AuthSchemas.register.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept registration without display name', () => {
      const input = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };
      
      const result = AuthSchemas.register.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});

describe('Transaction Schemas', () => {
  describe('create schema', () => {
    it('should validate correct transaction input', () => {
      const input = {
        amount: 100.5,
        category: 'Food',
        description: 'Grocery shopping',
        type: 'expense' as const,
        date: '2024-01-15T10:30:00Z',
      };
      
      const result = TransactionSchemas.create.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject negative amount', () => {
      const input = {
        amount: -100,
        category: 'Food',
        description: 'Test',
      };
      
      const result = TransactionSchemas.create.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty description', () => {
      const input = {
        amount: 100,
        category: 'Food',
        description: '',
      };
      
      const result = TransactionSchemas.create.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should use default values for optional fields', () => {
      const input = {
        amount: 100,
        category: 'Food',
        description: 'Test',
      };
      
      const result = TransactionSchemas.create.parse(input);
      expect(result.type).toBe('expense');
      expect(result.date).toBeDefined();
    });
  });

  describe('update schema', () => {
    it('should accept partial updates', () => {
      const input = {
        amount: 200,
      };
      
      const result = TransactionSchemas.update.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should accept empty object for no updates', () => {
      const input = {};
      
      const result = TransactionSchemas.update.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('query schema', () => {
    it('should accept empty query', () => {
      const input = {};
      
      const result = TransactionSchemas.query.parse(input);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('should parse pagination params', () => {
      const input = {
        page: '2',
        limit: '50',
      };
      
      const result = TransactionSchemas.query.parse(input);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(50);
    });
  });
});
