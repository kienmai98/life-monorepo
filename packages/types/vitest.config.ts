import path from 'node:path';
/**
 * Vitest configuration for Types package
 * Monochrome theme configuration for test outputs
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
    },
    // Monochrome output
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@life/types': path.resolve(__dirname, './src/index.ts'),
    },
  },
});
