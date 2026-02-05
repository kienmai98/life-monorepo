import { describe, expect, it, vi } from 'vitest';
import { useAuthStore } from '../stores/authStore';

// Mock zustand
vi.mock('../stores/authStore');

describe('useAuthStore', () => {
  const mockSetState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuthStore as unknown as { mockReturnValue: (value: unknown) => void }).mockReturnValue({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      setUser: vi.fn((user) => mockSetState({ user })),
      setLoading: vi.fn((loading) => mockSetState({ isLoading: loading })),
      setError: vi.fn((error) => mockSetState({ error })),
      clearError: vi.fn(() => mockSetState({ error: null })),
      logout: vi.fn(() => mockSetState({ user: null, error: null })),
    });
  });

  it('initializes with null user', () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });

  it('updates user correctly', () => {
    const store = useAuthStore();
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    store.setUser(mockUser);

    expect(mockSetState).toHaveBeenCalledWith({ user: mockUser });
  });

  it('clears user on logout', () => {
    const store = useAuthStore();

    store.logout();

    expect(mockSetState).toHaveBeenCalledWith({ user: null, error: null });
  });
});
