/**
 * @module features/schedule/model/store
 * @description Schedule/Calendar store using Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CalendarEvent } from '@/entities/event';

/**
 * Schedule state interface
 */
export interface ScheduleState {
  /** List of calendar events */
  events: CalendarEvent[];
  /** Whether events are being loaded */
  isLoading: boolean;
  /** Whether calendar permission is granted */
  hasPermission: boolean;
  /** Error message or null */
  error: string | null;
}

/**
 * Schedule store interface with actions
 */
export interface ScheduleStore extends ScheduleState {
  /** Fetch events for a date range */
  fetchEvents: (start: Date, end: Date) => Promise<void>;
  /** Request calendar permissions */
  requestPermission: () => Promise<boolean>;
  /** Add a new event */
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  /** Update an existing event */
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  /** Delete an event */
  deleteEvent: (id: string) => void;
  /** Clear error state */
  clearError: () => void;
  /** Refresh events for current range */
  refresh: () => Promise<void>;
}

/**
 * Initial schedule state
 */
export const initialScheduleState: ScheduleState = {
  events: [],
  isLoading: false,
  hasPermission: true,
  error: null,
};

/**
 * Current date range for refresh
 */
let currentRange: { start: Date; end: Date } | null = null;

/**
 * Generate unique event ID
 */
const generateId = (): string => {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Schedule store hook
 * @example
 * ```tsx
 * const { events, fetchEvents, hasPermission } = useScheduleStore();
 * ```
 */
export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      ...initialScheduleState,

      fetchEvents: async (start: Date, end: Date): Promise<void> => {
        currentRange = { start, end };
        set({ isLoading: true, error: null });

        try {
          // TODO: Implement actual calendar API integration
          console.log('Fetching events from', start, 'to', end);

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));

          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch events',
            isLoading: false,
          });
        }
      },

      requestPermission: async (): Promise<boolean> => {
        try {
          // TODO: Implement actual permission request
          // For now, always grant permission
          set({ hasPermission: true });
          return true;
        } catch (error) {
          console.error('Failed to request permission:', error);
          set({ hasPermission: false });
          return false;
        }
      },

      addEvent: (event): void => {
        const newEvent: CalendarEvent = {
          ...event,
          id: generateId(),
        };
        set((state) => ({
          events: [...state.events, newEvent],
        }));
      },

      updateEvent: (id, updates): void => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
      },

      deleteEvent: (id): void => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      clearError: (): void => {
        set({ error: null });
      },

      refresh: async (): Promise<void> => {
        if (currentRange) {
          await get().fetchEvents(currentRange.start, currentRange.end);
        }
      },
    }),
    {
      name: 'schedule-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): Pick<ScheduleState, 'events' | 'hasPermission'> => ({
        events: state.events,
        hasPermission: state.hasPermission,
      }),
    }
  )
);

/**
 * Hook for accessing schedule with convenient derived state
 */
export const useSchedule = () => {
  const store = useScheduleStore();

  // Sort events by start date
  const sortedEvents = store.events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Get today's events
  const today = new Date().toISOString().split('T')[0];
  const todayEvents = sortedEvents.filter((e) =>
    e.startDate.startsWith(today)
  );

  return {
    events: sortedEvents,
    todayEvents,
    isLoading: store.isLoading,
    hasPermission: store.hasPermission,
    error: store.error,
    fetchEvents: store.fetchEvents,
    requestPermission: store.requestPermission,
    addEvent: store.addEvent,
    updateEvent: store.updateEvent,
    deleteEvent: store.deleteEvent,
    clearError: store.clearError,
    refresh: store.refresh,
  };
};
