import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '../authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  it('initializes with null user', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('updates user correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('clears user on logout', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    // First set the user
    act(() => {
      result.current.setUser(mockUser);
    });
    expect(result.current.user).toEqual(mockUser);

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('updates loading state', () => {
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

  it('updates error state', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setError('Test error');
    });

    expect(result.current.error).toBe('Test error');
  });

  it('clears error state', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setError('Test error');
    });
    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
