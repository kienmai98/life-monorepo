import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; displayName: string } | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
}

/**
 * Auth store using Zustand with persistence
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        isAuthenticated: false,
        user: null,

        // Actions
        login: async (email: string, password: string) => {
          // Mock login - in production, this would call an API
          if (email && password) {
            set({
              isAuthenticated: true,
              user: {
                id: 'user-1',
                email,
                displayName: email.split('@')[0],
              },
            });
            return true;
          }
          return false;
        },

        logout: () => {
          set({
            isAuthenticated: false,
            user: null,
          });
        },

        setAuthenticated: (value: boolean) => {
          set({ isAuthenticated: value });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

export default useAuthStore;
