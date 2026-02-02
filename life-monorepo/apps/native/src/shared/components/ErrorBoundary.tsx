/**
 * @module shared/components/ErrorBoundary
 * @description Global error boundary for crash recovery
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in its child component tree
 * and displays a fallback UI instead of the component tree that crashed.
 *
 * @example
 * ```tsx
 * <ErrorBoundary onError={logError} onReset={resetApp}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  /**
   * Update state so the next render will show the fallback UI
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Log error details when an error occurs
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to crash reporting service in production
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset the error state to retry rendering
   */
  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback UI
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <View style={styles.container}>
          <Text style={styles.title} accessibilityRole="header">
            Something went wrong
          </Text>
          <Text style={styles.message} accessibilityRole="text">
            {error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            onPress={this.handleReset}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Try again"
            accessibilityHint="Attempts to reload the application"
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#DC2626',
  },
  message: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44, // Minimum touch target size for accessibility
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
