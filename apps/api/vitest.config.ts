import path from 'node:path';
/**
 * Vitest configuration for API app
 * Monochrome theme configuration for test outputs
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/__tests__/setupTests.ts'],
    include: ['**/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        branches: 75,
        functions: 75,
        lines: 75,
        statements: 75,
      },
      exclude: [
        'node_modules/',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/types/**',
        '**/*.config.*',
        'src/index.ts',
      ],
    },
    // Monochrome output for cleaner CI logs
    reporters: ['default'],
    outputTruncateLength: 200,
    // Test timeout
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@life/types': path.resolve(__dirname, '../packages/types/src/index.ts'),
    },
  },
});
