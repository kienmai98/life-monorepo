/**
 * @module features/profile/model/store
 * @description Profile store for user settings and preferences
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sync status interface
 */
export interface SyncStatus {
  /** ISO timestamp of last successful sync */
  lastSync: string | null;
  /** Number of pending changes not yet synced */
  pendingChanges: number;
}

/**
 * Profile state interface
 */
export interface ProfileState {
  /** Whether dark mode is enabled */
  isDarkMode: boolean;
  /** Current sync status */
  syncStatus: SyncStatus;
}

/**
 * Profile store interface with actions
 */
export interface ProfileStore extends ProfileState {
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set dark mode explicitly */
  setDarkMode: (enabled: boolean) => void;
  /** Sync transactions with server */
  syncTransactions: (userId: string) => Promise<void>;
  /** Update pending changes count */
  setPendingChanges: (count: number) => void;
  /** Reset sync status */
  resetSyncStatus: () => void;
}

/**
 * Initial profile state
 */
export const initialProfileState: ProfileState = {
  isDarkMode: false,
  syncStatus: { lastSync: null, pendingChanges: 0 },
};

/**
 * Profile store hook
 * @example
 * ```tsx
 * const { isDarkMode, toggleTheme, syncTransactions } = useProfileStore();
 * ```
 */
export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      ...initialProfileState,

      toggleTheme: (): void => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setDarkMode: (enabled: boolean): void => {
        set({ isDarkMode: enabled });
      },

      syncTransactions: async (userId: string): Promise<void> => {
        try {
          // TODO: Implement actual sync logic
          console.log('Syncing transactions for:', userId);

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            syncStatus: {
              lastSync: new Date().toISOString(),
              pendingChanges: 0,
            },
          });
        } catch (error) {
          console.error('Sync failed:', error);
          // Don't update lastSync on failure
        }
      },

      setPendingChanges: (count: number): void => {
        set((state) => ({
          syncStatus: {
            ...state.syncStatus,
            pendingChanges: count,
          },
        }));
      },

      resetSyncStatus: (): void => {
        set({ syncStatus: { lastSync: null, pendingChanges: 0 } });
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/**
 * Hook for accessing profile with convenient derived state
 */
export const useProfile = () => {
  const store = useProfileStore();

  return {
    isDarkMode: store.isDarkMode,
    syncStatus: store.syncStatus,
    hasPendingChanges: store.syncStatus.pendingChanges > 0,
    lastSyncDate: store.syncStatus.lastSync
      ? new Date(store.syncStatus.lastSync)
      : null,
    toggleTheme: store.toggleTheme,
    setDarkMode: store.setDarkMode,
    syncTransactions: store.syncTransactions,
    setPendingChanges: store.setPendingChanges,
    resetSyncStatus: store.resetSyncStatus,
  };
};
