import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified?: boolean;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isBiometricEnabled: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const initialState: Omit<AuthState, 'isAuthenticated'> = {
  user: null,
  isLoading: false,
  isBiometricEnabled: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      isAuthenticated: false,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user, 
        isLoading: false, 
        error: null 
      }),

      setLoading: (isLoading) => set({ isLoading }),

      setBiometricEnabled: (enabled) => set({ isBiometricEnabled: enabled }),

      setError: (error) => set({ error, isLoading: false }),

      clearError: () => set({ error: null }),

      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        error: null, 
        isLoading: false 
      }),

      login: async (email, _password) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock login - accept any email/password for demo
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email,
          displayName: email.split('@')[0],
          photoURL: null,
          emailVerified: true,
          createdAt: new Date().toISOString(),
        };
        
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false, 
          error: null 
        });
      },

      register: async (email, _password, displayName) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email,
          displayName: displayName || email.split('@')[0],
          photoURL: null,
          emailVerified: false,
          createdAt: new Date().toISOString(),
        };
        
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false, 
          error: null 
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isBiometricEnabled: state.isBiometricEnabled,
      }),
    }
  )
);

export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectAuthError = (state: AuthStore) => state.error;

export default useAuthStore;
