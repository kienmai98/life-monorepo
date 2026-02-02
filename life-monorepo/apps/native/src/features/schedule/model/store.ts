import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CalendarEvent } from '@/entities/event';

interface ScheduleStore {
  events: CalendarEvent[];
  isLoading: boolean;
  hasPermission: boolean;
  fetchEvents: (start: Date, end: Date) => Promise<void>;
  requestPermission: () => Promise<boolean>;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set) => ({
      events: [],
      isLoading: false,
      hasPermission: true,

      fetchEvents: async (start, end) => {
        set({ isLoading: true });
        console.log('Fetch events:', start, end);
        set({ isLoading: false });
      },

      requestPermission: async () => {
        set({ hasPermission: true });
        return true;
      },
    }),
    {
      name: 'schedule-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useSchedule = () => {
  const store = useScheduleStore();
  return {
    events: store.events,
    isLoading: store.isLoading,
    hasPermission: store.hasPermission,
    fetchEvents: store.fetchEvents,
    requestPermission: store.requestPermission,
  };
};
