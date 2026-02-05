import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  isAllDay: boolean;
}

interface ScheduleSummary {
  eventsToday: number;
  eventsThisWeek: number;
  freeHoursToday: number;
  upcomingEvents: CalendarEvent[];
}

interface CalendarState {
  events: CalendarEvent[];
  isGoogleConnected: boolean;
  hasPermission: boolean;
  isLoading: boolean;
  error: string | null;
  scheduleSummary: ScheduleSummary;

  // Actions
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  setGoogleConnected: (connected: boolean) => void;
  getEventsForDate: (date: string) => CalendarEvent[];
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
  fetchEvents: (startDate?: Date, endDate?: Date) => Promise<void>;
  requestPermission: () => Promise<boolean>;
  refreshScheduleSummary: () => void;
}

const _calculateScheduleSummary = (events: CalendarEvent[]): ScheduleSummary => {
  const today = new Date().toISOString().split('T')[0];
  const eventsToday = events.filter((e) => e.startDate.startsWith(today)).length;

  const now = new Date();
  const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const eventsThisWeek = events.filter((e) => {
    const eventDate = new Date(e.startDate);
    return eventDate >= now && eventDate <= weekLater;
  }).length;

  const upcomingEvents = events
    .filter((e) => new Date(e.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return {
    eventsToday,
    eventsThisWeek,
    freeHoursToday: Math.max(0, 8 - eventsToday * 0.5),
    upcomingEvents,
  };
};

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],
      isGoogleConnected: false,
      hasPermission: true,
      isLoading: false,
      error: null,
      scheduleSummary: {
        eventsToday: 0,
        eventsThisWeek: 0,
        freeHoursToday: 8,
        upcomingEvents: [],
      },

      setEvents: (events) => set({ events }),

      addEvent: (event) => {
        const newEvent: CalendarEvent = {
          ...event,
          id: Date.now().toString(),
        };
        set((state) => ({
          events: [...state.events, newEvent].sort(
            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          ),
        }));
      },

      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      setGoogleConnected: (connected) => set({ isGoogleConnected: connected }),

      getEventsForDate: (date) => {
        return get().events.filter((e) => {
          const eventDate = e.startDate.split('T')[0];
          return eventDate === date;
        });
      },

      getUpcomingEvents: (limit = 5) => {
        const now = new Date().toISOString();
        return get()
          .events.filter((e) => e.startDate >= now)
          .slice(0, limit);
      },
    }),
    {
      name: 'calendar-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
