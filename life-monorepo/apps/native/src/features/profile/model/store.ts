import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileStore {
  isDarkMode: boolean;
  syncStatus: { lastSync: string | null; pendingChanges: number };
  toggleTheme: () => void;
  syncTransactions: (userId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      syncStatus: { lastSync: null, pendingChanges: 0 },

      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      syncTransactions: async (userId) => {
        console.log('Sync for:', userId);
        set({ syncStatus: { lastSync: new Date().toISOString(), pendingChanges: 0 } });
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useProfile = () => {
  const store = useProfileStore();
  return {
    isDarkMode: store.isDarkMode,
    syncStatus: store.syncStatus,
    toggleTheme: store.toggleTheme,
    syncTransactions: store.syncTransactions,
  };
};
