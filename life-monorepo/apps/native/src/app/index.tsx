/**
 * @module app/index
 * @description App Entry Point - Initializes the application with providers
 */

import React, { useMemo } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './navigation';
import { lightTheme, darkTheme } from './styles/theme';
import { ErrorBoundary } from '@/shared/components';
import { useProfileStore } from '@/features/profile';

/**
 * Theme provider wrapper that handles theme switching
 */
const ThemeProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const { isDarkMode } = useProfileStore();

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
});

ThemeProvider.displayName = 'ThemeProvider';

/**
 * Root application component with all providers
 * Wrapped in ErrorBoundary for crash recovery
 */
export const App: React.FC = React.memo(() => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // In production, send to crash reporting service
        // Example: Sentry.captureException(error, { extra: errorInfo });
        // eslint-disable-next-line no-console
        console.error('App Error:', error, errorInfo);
      }}
    >
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
