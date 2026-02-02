import { beforeAll, afterAll } from 'vitest';

// Test environment setup
beforeAll(() => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_SERVICE_KEY = 'test-key';
});

afterAll(() => {
  // Cleanup
});
