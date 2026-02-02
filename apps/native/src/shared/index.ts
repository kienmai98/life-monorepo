/**
 * Shared module exports for the Life app
 * @module shared
 */

// Components
export * from './components';

// Hooks
export * from './hooks';

// Types
export * from './types';

// Utilities
export * from './utils/helpers';
export { default as api } from './utils/api';
export { storage, STORAGE_KEYS } from './utils/storage';
export * from './utils/performance';
export * from './utils/security';

// Test utilities (only for test environment)
export * from './test-utils';
