import path from 'node:path';
import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for Native app
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/__tests__/setupTests.ts'],
    include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
      exclude: [
        'node_modules/',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/types/**',
        '**/*.config.*',
      ],
    },
    reporters: ['default', 'verbose'],
    outputTruncateLength: 200,
    css: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@life/types': path.resolve(__dirname, '../packages/types/src/index.ts'),
    },
  },
});
