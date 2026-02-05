/**
 * MSW (Mock Service Worker) setup for API mocking in Native tests
 */
import { setupServer } from 'msw/node';

// Mock handlers
const handlers = [
  // Add your handlers here
];

export const server = setupServer(...handlers);
