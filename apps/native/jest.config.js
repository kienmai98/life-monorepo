/**
 * Jest configuration for React Native app
 * Monochrome theme configuration for test outputs
 */
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/shared/__tests__/setupTests.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-paper|react-native-vector-icons|@react-native-community|zustand|@react-native-firebase|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@life/types$': '<rootDir>/../packages/types/src/index.ts',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/shared/__tests__/**',
    '!src/shared/types/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'process.env.NODE_ENV': 'test',
  },
  verbose: true,
  // Monochrome output for cleaner CI logs
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/reports',
        outputName: 'junit.xml',
        ancestorSeparator: ' › ',
        suiteName: 'Life Native Tests',
      },
    ],
  ],
};
