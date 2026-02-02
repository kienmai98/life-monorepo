/**
 * @module features/auth/ui/login-form/LoginForm
 * @description Login form component with email and password inputs
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

/**
 * Props for LoginForm component
 */
export interface LoginFormProps {
  /** Callback when form is submitted */
  onSubmit: (email: string, password: string) => void;
  /** Whether the form is in loading state */
  isLoading: boolean;
  /** Error message to display */
  error: string | null;
  /** Optional test ID for testing */
  testID?: string;
}

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Login form component with validation and accessibility support
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSubmit={(email, password) => console.log(email, password)}
 *   isLoading={false}
 *   error={null}
 * />
 * ```
 */
export const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({ onSubmit, isLoading, error, testID = 'login-form' }) => {
    // Form state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
      email: false,
      password: false,
    });

    // Validation
    const emailError = useMemo(() => {
      if (!touched.email) return null;
      if (!email) return 'Email is required';
      if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email';
      return null;
    }, [email, touched.email]);

    const passwordError = useMemo(() => {
      if (!touched.password) return null;
      if (!password) return 'Password is required';
      if (password.length < 6) return 'Password must be at least 6 characters';
      return null;
    }, [password, touched.password]);

    const isValid = useMemo(() => {
      return (
        email.length > 0 &&
        password.length >= 6 &&
        EMAIL_REGEX.test(email)
      );
    }, [email, password]);

    // Event handlers
    const handleEmailChange = useCallback((text: string): void => {
      setEmail(text);
      if (!touched.email) {
        setTouched((prev) => ({ ...prev, email: true }));
      }
    }, [touched.email]);

    const handlePasswordChange = useCallback((text: string): void => {
      setPassword(text);
      if (!touched.password) {
        setTouched((prev) => ({ ...prev, password: true }));
      }
    }, [touched.password]);

    const togglePasswordVisibility = useCallback((): void => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleSubmit = useCallback((): void => {
      if (isValid && !isLoading) {
        onSubmit(email, password);
      }
    }, [isValid, isLoading, email, password, onSubmit]);

    // Memoized styles
    const emailInputStyle = useMemo<ViewStyle>(
      () => [styles.input, (emailError || error) ? styles.inputError : undefined],
      [emailError, error]
    );

    const passwordInputStyle = useMemo<ViewStyle>(
      () => [styles.input, (passwordError || error) ? styles.inputError : undefined],
      [passwordError, error]
    );

    return (
      <View style={styles.container} testID={testID}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
          style={emailInputStyle}
          disabled={isLoading}
          error={!!emailError || !!error}
          accessibilityLabel="Email address"
          accessibilityHint="Enter your email address"
          accessibilityErrorMessage={emailError || undefined}
          returnKeyType="next"
          textContentType="emailAddress"
          autoComplete="email"
        />
        {emailError && (
          <HelperText type="error" accessibilityRole="alert">
            {emailError}
          </HelperText>
        )}

        <TextInput
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              accessibilityHint="Toggle password visibility"
            />
          }
          style={passwordInputStyle}
          disabled={isLoading}
          error={!!passwordError || !!error}
          accessibilityLabel="Password"
          accessibilityHint="Enter your password"
          accessibilityErrorMessage={passwordError || undefined}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          textContentType="password"
          autoComplete="password"
        />
        {passwordError && (
          <HelperText type="error" accessibilityRole="alert">
            {passwordError}
          </HelperText>
        )}

        {error && (
          <HelperText type="error" accessibilityRole="alert" style={styles.error}>
            {error}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!isValid || isLoading}
          style={styles.button}
          accessibilityLabel="Sign in"
          accessibilityHint="Sign in to your account"
          accessibilityState={{ disabled: !isValid || isLoading }}
        >
          Sign In
        </Button>
      </View>
    );
  }
);

LoginForm.displayName = 'LoginForm';

interface Styles {
  container: ViewStyle;
  input: ViewStyle;
  inputError: ViewStyle;
  button: ViewStyle;
  error: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  inputError: {
    backgroundColor: '#FEE2E2',
  },
  button: {
    marginTop: 16,
    minHeight: 44, // Minimum touch target size for accessibility
  },
  error: {
    marginTop: 8,
  },
});
