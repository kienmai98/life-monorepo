import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isDarkMode: boolean;
  hasCompletedOnboarding: boolean;
  lastSyncTime: string | null;
  notificationsEnabled: boolean;
}

interface AppActions {
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  setOnboardingComplete: () => void;
  setLastSyncTime: (time: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      hasCompletedOnboarding: false,
      lastSyncTime: null,
      notificationsEnabled: true,

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (enabled) => set({ isDarkMode: enabled }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
      setLastSyncTime: (time) => set({ lastSyncTime: time }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
);

export default useAppStore;
