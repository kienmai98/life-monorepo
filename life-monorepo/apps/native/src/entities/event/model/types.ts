export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  isAllDay: boolean;
  calendarId?: string;
  recurrence?: string;
  attendees?: string[];
  color?: string;
}

export interface CalendarFilter {
  startDate?: string;
  endDate?: string;
  calendarIds?: string[];
}
