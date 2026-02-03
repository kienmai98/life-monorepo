/**
 * Test utilities and mocks for the Life app
 * @module shared/test-utils
 */

import { NavigationContainer } from '@react-navigation/native';
import { type RenderOptions, render as rtlRender } from '@testing-library/react-native';
import type React from 'react';
import { PaperProvider } from 'react-native-paper';

/**
 * Mock theme for testing
 */
export const mockTheme = {
  colors: {
    primary: '#000000',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E0E0E0',
    onPrimaryContainer: '#000000',
    secondary: '#555555',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#F0F0F0',
    onSecondaryContainer: '#000000',
    error: '#B00020',
    onError: '#FFFFFF',
    errorContainer: '#FCD8DF',
    onErrorContainer: '#370B1E',
    background: '#FFFFFF',
    onBackground: '#000000',
    surface: '#FFFFFF',
    onSurface: '#000000',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#555555',
    outline: '#C0C0C0',
    outlineVariant: '#E0E0E0',
  },
  fonts: {
    displayLarge: { fontFamily: 'System', fontWeight: '400', fontSize: 57 },
    displayMedium: { fontFamily: 'System', fontWeight: '400', fontSize: 45 },
    displaySmall: { fontFamily: 'System', fontWeight: '400', fontSize: 36 },
    headlineLarge: { fontFamily: 'System', fontWeight: '400', fontSize: 32 },
    headlineMedium: { fontFamily: 'System', fontWeight: '400', fontSize: 28 },
    headlineSmall: { fontFamily: 'System', fontWeight: '400', fontSize: 24 },
    titleLarge: { fontFamily: 'System', fontWeight: '500', fontSize: 22 },
    titleMedium: { fontFamily: 'System', fontWeight: '500', fontSize: 16 },
    titleSmall: { fontFamily: 'System', fontWeight: '500', fontSize: 14 },
    bodyLarge: { fontFamily: 'System', fontWeight: '400', fontSize: 16 },
    bodyMedium: { fontFamily: 'System', fontWeight: '400', fontSize: 14 },
    bodySmall: { fontFamily: 'System', fontWeight: '400', fontSize: 12 },
    labelLarge: { fontFamily: 'System', fontWeight: '500', fontSize: 14 },
    labelMedium: { fontFamily: 'System', fontWeight: '500', fontSize: 12 },
    labelSmall: { fontFamily: 'System', fontWeight: '500', fontSize: 11 },
  },
};

/**
 * All providers wrapper for tests
 */
interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <NavigationContainer>
      <PaperProvider theme={mockTheme as any}>{children}</PaperProvider>
    </NavigationContainer>
  );
};

/**
 * Custom render function that wraps component with all necessary providers
 * @param ui - Component to render
 * @param options - Render options
 * @returns Render result with additional utilities
 *
 * @example
 * const { getByText } = render(<MyComponent />);
 * expect(getByText('Hello')).toBeTruthy();
 */
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };

/**
 * Mock user for testing
 */
export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
  emailVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
};

/**
 * Mock transaction for testing
 */
export const mockTransaction = {
  id: 'txn-123',
  amount: 50.0,
  currency: 'USD',
  category: 'food' as const,
  description: 'Grocery shopping',
  date: '2024-01-15T10:00:00Z',
  type: 'expense' as const,
  paymentMethod: 'credit_card' as const,
  tags: ['groceries', 'essentials'],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  synced: true,
};

/**
 * Mock calendar event for testing
 */
export const mockCalendarEvent = {
  id: 'event-123',
  title: 'Team Meeting',
  startDate: '2024-01-15T14:00:00Z',
  endDate: '2024-01-15T15:00:00Z',
  description: 'Weekly team sync',
  location: 'Conference Room A',
  isAllDay: false,
};

/**
 * Creates multiple mock transactions
 * @param count - Number of transactions to create
 * @returns Array of mock transactions
 */
export const createMockTransactions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    ...mockTransaction,
    id: `txn-${i}`,
    amount: Math.random() * 100,
    description: `Transaction ${i}`,
    date: new Date(Date.now() - i * 86400000).toISOString(),
  }));
};

/**
 * Waits for a specified time
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Creates a mock async function that resolves after a delay
 * @param value - Value to resolve with
 * @param delay - Delay in milliseconds
 * @returns Mock async function
 */
export const createMockAsyncFunction = <T,>(
  value: T,
  delay = 100
): jest.Mock<Promise<T>, any[]> => {
  return jest.fn().mockImplementation(() => wait(delay).then(() => value));
};

/**
 * Suppresses console errors during test
 * Useful when testing error handling
 * @param fn - Function to run
 */
export const suppressConsoleErrors = async (fn: () => void | Promise<void>): Promise<void> => {
  const originalError = console.error;
  console.error = jest.fn();

  try {
    await fn();
  } finally {
    console.error = originalError;
  }
};
