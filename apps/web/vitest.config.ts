import path from 'node:path';
import react from '@vitejs/plugin-react';
/**
 * Vitest configuration for Web app
 * Monochrome theme configuration for test outputs
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setupTests.ts'],
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
      exclude: ['node_modules/', '**/*.d.ts', '**/__tests__/**', '**/types/**', '**/*.config.*'],
    },
    // Monochrome output for cleaner CI logs
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
