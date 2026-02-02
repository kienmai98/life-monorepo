/**
 * Main Application Component
 * @module App
 * 
 * Entry point for the Life app with:
 * - Global error boundary for crash recovery
 * - Optimized store subscriptions using selectors
 * - Gesture handler root view
 * - Safe area and navigation containers
 */

import React, { useMemo } from 'react';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { 
  Provider as PaperProvider, 
  MD3LightTheme, 
  MD3DarkTheme,
  ActivityIndicator,
} from 'react-native-paper';

import { ErrorBoundary } from './src/shared/components';
import { 
  useAuthStore, 
  selectUser, 
  selectIsLoading as selectAuthLoading 
} from './src/features/auth/stores/authStore';
import { MainNavigator } from './src/navigation/MainNavigator';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { RootStackParamList } from './src/shared/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Loading screen shown while auth state initializes
 * Memoized to prevent unnecessary re-renders
 */
const LoadingScreen: React.FC = React.memo(() => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" animating={true} />
  </View>
));

LoadingScreen.displayName = 'LoadingScreen';

/**
 * Root navigator with authentication state handling
 * Uses React.memo to prevent re-renders when parent updates
 */
const RootNavigator: React.FC = React.memo(() => {
  // Use selectors to prevent re-renders from unrelated state changes
  const user = useAuthStore(selectUser);
  const isLoading = useAuthStore(selectAuthLoading);

  // Memoize navigation screen to prevent unnecessary re-renders
  const screen = useMemo(() => {
    if (isLoading) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }

    if (user) {
      return <Stack.Screen name="Main" component={MainNavigator} />;
    }

    return <Stack.Screen name="Auth" component={AuthNavigator} />;
  }, [user, isLoading]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screen}
    </Stack.Navigator>
  );
});

RootNavigator.displayName = 'RootNavigator';

/**
 * Theme provider wrapper with dark mode support
 */
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Memoize themes to prevent recreation on every render
  const paperTheme = useMemo(() => ({
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#000000',
      onPrimary: '#FFFFFF',
      secondary: '#555555',
      background: '#FFFFFF',
      surface: '#FFFFFF',
    },
  }), []);

  const darkPaperTheme = useMemo(() => ({
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#FFFFFF',
      onPrimary: '#000000',
      secondary: '#AAAAAA',
      background: '#121212',
      surface: '#1E1E1E',
    },
  }), []);

  const navigationTheme = useMemo(() => ({
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      primary: isDark ? '#FFFFFF' : '#000000',
      background: isDark ? '#121212' : '#FFFFFF',
      card: isDark ? '#1E1E1E' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#000000',
    },
  }), [isDark]);

  return (
    <PaperProvider theme={isDark ? darkPaperTheme : paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

/**
 * Main App Component
 * 
 * Provides:
 * 1. Global error boundary for crash recovery
 * 2. Gesture handler support
 * 3. Safe area handling
 * 4. Navigation
 * 5. Theme support
 */
function App(): React.JSX.Element {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to crash reporting service
        console.error('App Error:', error, errorInfo);
      }}
    >
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
