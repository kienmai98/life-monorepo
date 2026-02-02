import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  color?: string;
  location?: string;
  description?: string;
}

export interface CalendarFilter {
  startDate?: Date;
  endDate?: Date;
}

interface CalendarState {
  // State
  events: CalendarEvent[];
  selectedDate: Date;
  currentMonth: Date;
  filter: CalendarFilter | null;
  isLoading: boolean;
  error: string | null;

  // Computed (selectors)
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForMonth: (date: Date) => CalendarEvent[];
  
  // Actions
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  setCurrentMonth: (date: Date) => void;
  setFilter: (filter: CalendarFilter | null) => void;
  clearError: () => void;
}

/**
 * Calendar store using Zustand with persistence
 * Features:
 * - Type-safe state management
 * - Persisted storage
 * - Computed selectors
 * - DevTools integration
 */
export const useCalendarStore = create<CalendarState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        events: [],
        selectedDate: new Date(),
        currentMonth: new Date(),
        filter: null,
        isLoading: false,
        error: null,

        // Computed selectors
        getEventsForDate: (date: Date) => {
          const { events } = get();
          return events.filter((event) => {
            const eventDate = new Date(event.startDate);
            return (
              eventDate.getDate() === date.getDate() &&
              eventDate.getMonth() === date.getMonth() &&
              eventDate.getFullYear() === date.getFullYear()
            );
          });
        },

        getEventsForMonth: (date: Date) => {
          const { events } = get();
          return events.filter((event) => {
            const eventDate = new Date(event.startDate);
            return (
              eventDate.getMonth() === date.getMonth() &&
              eventDate.getFullYear() === date.getFullYear()
            );
          });
        },

        // Actions
        addEvent: (eventData) => {
          const newEvent: CalendarEvent = {
            ...eventData,
            id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          };
          set((state) => ({
            events: [...state.events, newEvent],
          }));
        },

        updateEvent: (id, updates) => {
          set((state) => ({
            events: state.events.map((event) =>
              event.id === id ? { ...event, ...updates } : event
            ),
          }));
        },

        deleteEvent: (id) => {
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
          }));
        },

        setSelectedDate: (date) => {
          set({ selectedDate: date });
        },

        setCurrentMonth: (date) => {
          set({ currentMonth: date });
        },

        setFilter: (filter) => {
          set({ filter });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'calendar-storage',
        partialize: (state) => ({
          events: state.events,
          selectedDate: state.selectedDate.toISOString(),
          currentMonth: state.currentMonth.toISOString(),
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Convert ISO strings back to Date objects
            state.selectedDate = new Date(state.selectedDate as unknown as string);
            state.currentMonth = new Date(state.currentMonth as unknown as string);
          }
        },
      }
    ),
    { name: 'CalendarStore' }
  )
);

export default useCalendarStore;
