/**
 * @module entities/event/model/types
 * @description Calendar event entity types
 */

/**
 * Calendar event entity
 * Represents an event in a calendar
 */
export interface CalendarEvent {
  /** Unique event ID */
  id: string;
  /** Event title */
  title: string;
  /** ISO start date/time */
  startDate: string;
  /** ISO end date/time */
  endDate: string;
  /** Event description (optional) */
  description?: string;
  /** Event location (optional) */
  location?: string;
  /** Whether this is an all-day event */
  isAllDay: boolean;
  /** Calendar ID this event belongs to */
  calendarId?: string;
  /** Recurrence rule (e.g., 'RRULE:FREQ=WEEKLY') */
  recurrence?: string;
  /** List of attendee emails */
  attendees?: string[];
  /** Event color (hex code) */
  color?: string;
}

/**
 * Filter options for calendar events
 */
export interface CalendarFilter {
  /** Filter by start date (ISO string) */
  startDate?: string;
  /** Filter by end date (ISO string) */
  endDate?: string;
  /** Filter by calendar IDs */
  calendarIds?: string[];
}
