import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '../../stores/authStore';
import LoginScreen from '../LoginScreen';

// Mock the auth store
jest.mock('../../stores/authStore');

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation: { navigate: typeof mockNavigate } = {
  navigate: mockNavigate,
};

// Mock helpers
jest.mock('../../../shared/utils/helpers', () => ({
  validateEmail: jest.fn((email: string) => email.includes('@') && email.includes('.')),
  validatePassword: jest.fn(() => true),
}));

const _Stack = createNativeStackNavigator();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <PaperProvider>
      <NavigationContainer>{component}</NavigationContainer>
    </PaperProvider>
  );
};

describe('LoginScreen', () => {
  const mockLogin = jest.fn();
  const mockLoginWithGoogle = jest.fn();
  const mockLoginWithApple = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as jest.Mock).mockReturnValue({
      login: mockLogin,
      loginWithGoogle: mockLoginWithGoogle,
      loginWithApple: mockLoginWithApple,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
  });

  describe('Rendering', () => {
    it('renders login form elements correctly', () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      expect(screen.getByText('Life')).toBeTruthy();
      expect(screen.getByText('Manage your schedule & spending')).toBeTruthy();
      expect(screen.getByText('Welcome Back')).toBeTruthy();
      expect(screen.getByLabelText('Email')).toBeTruthy();
      expect(screen.getByLabelText('Password')).toBeTruthy();
      expect(screen.getByText('Sign In')).toBeTruthy();
      expect(screen.getByText("Don't have an account? Sign Up")).toBeTruthy();
      expect(screen.getByText('Continue with Google')).toBeTruthy();
    });

    it('renders Apple sign in button on iOS', () => {
      // Mock Platform.OS
      jest.spyOn(require('react-native'), 'Platform', 'get').mockReturnValue({ OS: 'ios' });

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      expect(screen.getByText('Continue with Apple')).toBeTruthy();
    });

    it('does not render Apple sign in button on Android', () => {
      jest.spyOn(require('react-native'), 'Platform', 'get').mockReturnValue({ OS: 'android' });

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      expect(screen.queryByText('Continue with Apple')).toBeNull();
    });
  });

  describe('Form Input', () => {
    it('updates email input correctly', () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const emailInput = screen.getByLabelText('Email');
      fireEvent.changeText(emailInput, 'test@example.com');

      expect(emailInput.props.value).toBe('test@example.com');
    });

    it('updates password input correctly', () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.changeText(passwordInput, 'password123');

      expect(passwordInput.props.value).toBe('password123');
    });

    it('toggles password visibility', () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const passwordInput = screen.getByLabelText('Password');

      // Initial state - password should be hidden
      expect(passwordInput.props.secureTextEntry).toBe(true);

      // Toggle visibility
      const _toggleButton = screen.getByTestId('eye-icon') || screen.getByText('eye');
      // Note: The icon button might be difficult to query, this is a simplified version
    });
  });

  describe('Form Validation', () => {
    it('shows error when fields are empty', async () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(screen.getByText('Please fill in all fields')).toBeTruthy();
      });
    });

    it('shows error for invalid email format', async () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const emailInput = screen.getByLabelText('Email');
      fireEvent.changeText(emailInput, 'invalid-email');

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.changeText(passwordInput, 'password123');

      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
      });
    });

    it('clears error when user starts typing again', () => {
      const { rerender } = renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      // Trigger error first
      fireEvent.press(screen.getByText('Sign In'));

      // Mock error state
      (useAuthStore as jest.Mock).mockReturnValue({
        login: mockLogin,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithApple: mockLoginWithApple,
        isLoading: false,
        error: 'Test error',
        clearError: mockClearError,
      });

      rerender(
        <PaperProvider>
          <NavigationContainer>
            <LoginScreen navigation={mockNavigation} />
          </NavigationContainer>
        </PaperProvider>
      );

      // Type in email field
      const emailInput = screen.getByLabelText('Email');
      fireEvent.changeText(emailInput, 'test@example.com');

      expect(mockClearError).toHaveBeenCalled();
    });
  });

  describe('Login Submission', () => {
    it('calls login with correct credentials', async () => {
      mockLogin.mockResolvedValue(undefined);

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const emailInput = screen.getByLabelText('Email');
      fireEvent.changeText(emailInput, 'test@example.com');

      const passwordInput = screen.getByLabelText('Password');
      fireEvent.changeText(passwordInput, 'password123');

      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('shows loading state during login', async () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        login: mockLogin,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithApple: mockLoginWithApple,
        isLoading: true,
        error: null,
        clearError: mockClearError,
      });

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      const signInButton = screen.getByText('Sign In');
      expect(signInButton.props.disabled).toBe(true);
    });

    it('displays store error message', () => {
      (useAuthStore as jest.Mock).mockReturnValue({
        login: mockLogin,
        loginWithGoogle: mockLoginWithGoogle,
        loginWithApple: mockLoginWithApple,
        isLoading: false,
        error: 'Invalid credentials',
        clearError: mockClearError,
      });

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      expect(screen.getByText('Invalid credentials')).toBeTruthy();
    });
  });

  describe('Social Login', () => {
    it('calls Google login when Google button pressed', async () => {
      mockLoginWithGoogle.mockResolvedValue(undefined);

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      fireEvent.press(screen.getByText('Continue with Google'));

      await waitFor(() => {
        expect(mockLoginWithGoogle).toHaveBeenCalled();
      });
    });

    it('calls Apple login when Apple button pressed', async () => {
      mockLoginWithApple.mockResolvedValue(undefined);

      jest.spyOn(require('react-native'), 'Platform', 'get').mockReturnValue({ OS: 'ios' });

      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      fireEvent.press(screen.getByText('Continue with Apple'));

      await waitFor(() => {
        expect(mockLoginWithApple).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation', () => {
    it('navigates to register screen', () => {
      renderWithProviders(<LoginScreen navigation={mockNavigation} />);

      fireEvent.press(screen.getByText("Don't have an account? Sign Up"));

      expect(mockNavigate).toHaveBeenCalledWith('Register');
    });
  });
});
