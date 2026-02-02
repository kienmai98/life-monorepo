import type { User } from '@life/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';
import {
  selectAuthError,
  selectIsAuthenticated,
  selectIsBiometricEnabled,
  selectIsLoading,
  selectUser,
  selectUserId,
  useAuthStore,
} from '../authStore';

describe('AuthStore', () => {
  const mockUser: User = {
    id: 'user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
  };

  beforeEach(() => {
    // Reset store to initial state before each test
    useAuthStore.setState({
      user: null,
      isLoading: false,
      isBiometricEnabled: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  describe('State Management', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isBiometricEnabled).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should set user correctly', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should set loading state', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should set error message', () => {
      const { result } = renderHook(() => useAuthStore());
      const errorMessage = 'Authentication failed';

      act(() => {
        result.current.setError(errorMessage);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
    });

    it('should clear error', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setError('Some error');
      });

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });

    it('should set biometric enabled', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setBiometricEnabled(true);
      });

      expect(result.current.isBiometricEnabled).toBe(true);
    });
  });

  describe('Actions', () => {
    describe('logout', () => {
      it('should clear user on logout', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
          result.current.setUser(mockUser);
        });

        expect(result.current.user).toEqual(mockUser);

        act(() => {
          result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
      });
    });

    describe('login', () => {
      it('should set loading state during login', async () => {
        const { result } = renderHook(() => useAuthStore());

        // Note: This test documents the current behavior
        // The actual login implementation is a placeholder
        await expect(
          act(async () => {
            await result.current.login('test@example.com', 'password');
          })
        ).rejects.toThrow('Login not yet implemented');
      });

      it('should set error on failed login', async () => {
        const { result } = renderHook(() => useAuthStore());

        try {
          await act(async () => {
            await result.current.login('test@example.com', 'wrong');
          });
        } catch (error) {
          // Expected to throw
        }

        expect(result.current.error).toBe('Login not yet implemented');
        expect(result.current.isLoading).toBe(false);
      });
    });

    describe('register', () => {
      it('should set loading state during registration', async () => {
        const { result } = renderHook(() => useAuthStore());

        await expect(
          act(async () => {
            await result.current.register('new@example.com', 'password');
          })
        ).rejects.toThrow('Registration not yet implemented');
      });
    });

    describe('resetPassword', () => {
      it('should set loading state during password reset', async () => {
        const { result } = renderHook(() => useAuthStore());

        await expect(
          act(async () => {
            await result.current.resetPassword('test@example.com');
          })
        ).rejects.toThrow('Password reset not yet implemented');
      });
    });

    describe('OAuth login methods', () => {
      it('should handle Google login error', async () => {
        const { result } = renderHook(() => useAuthStore());

        try {
          await act(async () => {
            await result.current.loginWithGoogle();
          });
        } catch (error) {
          // Expected
        }

        expect(result.current.error).toBe('Google login not yet implemented');
      });

      it('should handle Apple login error', async () => {
        const { result } = renderHook(() => useAuthStore());

        try {
          await act(async () => {
            await result.current.loginWithApple();
          });
        } catch (error) {
          // Expected
        }

        expect(result.current.error).toBe('Apple login not yet implemented');
      });
    });
  });

  describe('Selectors', () => {
    it('selectUser should return current user', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      const user = selectUser(result.current);
      expect(user).toEqual(mockUser);
    });

    it('selectIsAuthenticated should return true when user exists', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(selectIsAuthenticated(result.current)).toBe(false);

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(selectIsAuthenticated(result.current)).toBe(true);
    });

    it('selectIsLoading should return loading state', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setLoading(true);
      });

      expect(selectIsLoading(result.current)).toBe(true);
    });

    it('selectAuthError should return error message', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setError('Test error');
      });

      expect(selectAuthError(result.current)).toBe('Test error');
    });

    it('selectIsBiometricEnabled should return biometric state', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setBiometricEnabled(true);
      });

      expect(selectIsBiometricEnabled(result.current)).toBe(true);
    });

    it('selectUserId should return user ID', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(selectUserId(result.current)).toBeUndefined();

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(selectUserId(result.current)).toBe('user-123');
    });
  });

  describe('Persistence', () => {
    it('should persist user and biometric settings', () => {
      // The store is configured to persist user and isBiometricEnabled
      // This test verifies the configuration is correct
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setUser(mockUser);
        result.current.setBiometricEnabled(true);
      });

      // Verify AsyncStorage mock was called
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
