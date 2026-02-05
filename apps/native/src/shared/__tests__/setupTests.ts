import { vi } from 'vitest';
import { server } from '../mocks/server';

// MSW setup
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock async storage
vi.mock('@react-native-async-storage/async-storage', () => ({
  setItem: vi.fn(() => Promise.resolve()),
  getItem: vi.fn(() => Promise.resolve(null)),
  removeItem: vi.fn(() => Promise.resolve()),
  clear: vi.fn(() => Promise.resolve()),
  getAllKeys: vi.fn(() => Promise.resolve([])),
  multiGet: vi.fn(() => Promise.resolve([])),
  multiSet: vi.fn(() => Promise.resolve()),
  multiRemove: vi.fn(() => Promise.resolve()),
}));

// Setup for Zustand stores
vi.mock('zustand');

// Global test utilities
beforeEach(() => {
  vi.clearAllMocks();
});
