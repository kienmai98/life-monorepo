/**
 * Calendar-related type definitions
 * @module @life/types/types
 */

import type { Branded, Nullable, Optional } from '../index.js';
import type { UserId } from './user.js';
import type { TransactionId } from './transaction.js';

// =============================================================================
// CALENDAR IDENTIFIERS
// =============================================================================

/** Unique identifier for calendar events */
export type EventId = Branded<string, 'EventId'>;

/** Unique identifier for calendars */
export type CalendarId = Branded<string, 'CalendarId'>;

// =============================================================================
// EVENT TYPES
// =============================================================================

/**
 * Event type classification
 */
export type EventType =
  | 'appointment'
  | 'meeting'
  | 'reminder'
  | 'task'
  | 'birthday'
  | 'holiday'
  | 'transaction'
  | 'other';

/**
 * Event priority level
 */
export type EventPriority = 'low' | 'medium' | 'high';

/**
 * Event visibility
 */
export type EventVisibility = 'public' | 'private' | 'confidential';

/**
 * Event status
 */
export type EventStatus = 'confirmed' | 'tentative' | 'cancelled';

// =============================================================================
// CALENDAR EVENT ENTITY
// =============================================================================

/**
 * Base properties for all calendar events
 */
export interface CalendarEventBase {
  /** Unique event identifier */
  readonly id: EventId;
  /** Event title */
  readonly title: string;
  /** Event type */
  readonly type: EventType;
  /** Event status */
  readonly status: EventStatus;
  /** Whether event lasts all day */
  readonly isAllDay: boolean;
  /** Event start time */
  readonly startDate: Date;
  /** Event end time */
  readonly endDate: Date;
  /** Event description */
  readonly description: Nullable<string>;
  /** Event location */
  readonly location: Nullable<LocationInfo>;
  /** Event priority */
  readonly priority: EventPriority;
  /** Event visibility */
  readonly visibility: EventVisibility;
  /** Whether event repeats */
  readonly isRecurring: boolean;
  /** Recurrence rule (if applicable) */
  readonly recurrenceRule: Nullable<RecurrenceRule>;
  /** Calendar this event belongs to */
  readonly calendarId: CalendarId;
  /** Event owner */
  readonly userId: UserId;
  /** When event was created */
  readonly createdAt: Date;
  /** When event was last updated */
  readonly updatedAt: Date;
}

/**
 * Location information for events
 */
export interface LocationInfo {
  readonly name: string;
  readonly address: Nullable<string>;
  readonly latitude: Nullable<number>;
  readonly longitude: Nullable<number>;
}

/**
 * Recurrence rule for recurring events
 */
export interface RecurrenceRule {
  /** How often the event repeats */
  readonly frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Interval (e.g., every 2 weeks) */
  readonly interval: number;
  /** Day(s) of week (0-6, Sunday=0) for weekly recurrence */
  readonly daysOfWeek?: readonly number[];
  /** Day of month (1-31) for monthly/yearly recurrence */
  readonly dayOfMonth?: number;
  /** Month (0-11) for yearly recurrence */
  readonly month?: number;
  /** End date for recurrence (undefined = forever) */
  readonly endDate?: Date;
  /** Maximum number of occurrences */
  readonly count?: number;
  /** Exceptions - dates to skip */
  readonly exceptions?: readonly Date[];
}

/**
 * Complete calendar event with all optional fields
 */
export interface CalendarEvent extends CalendarEventBase {
  /** Attendees invited to the event */
  readonly attendees: readonly Attendee[];
  /** Reminders set for this event */
  readonly reminders: readonly Reminder[];
  /** URL for online meeting */
  readonly meetingUrl: Nullable<string>;
  /** Color override for this event */
  readonly color: Nullable<string>;
  /** Tags for organization */
  readonly tags: readonly string[];
  /** Associated transaction (if event is transaction-related) */
  readonly transactionId: Nullable<TransactionId>;
  /** Additional metadata */
  readonly metadata: Record<string, unknown>;
}

/**
 * Event attendee
 */
export interface Attendee {
  readonly email: string;
  readonly displayName: Nullable<string>;
  readonly status: 'pending' | 'accepted' | 'declined' | 'tentative';
  readonly isRequired: boolean;
}

/**
 * Event reminder
 */
export interface Reminder {
  readonly id: string;
  /** Minutes before event to trigger reminder */
  readonly minutesBefore: number;
  /** Type of reminder notification */
  readonly type: 'notification' | 'email' | 'sms';
  /** Whether reminder is enabled */
  readonly enabled: boolean;
}

// =============================================================================
// CALENDAR ENTITY
// =============================================================================

/**
 * Calendar entity
 */
export interface Calendar {
  readonly id: CalendarId;
  readonly userId: UserId;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly color: string;
  readonly timezone: string;
  readonly isDefault: boolean;
  readonly isVisible: boolean;
  readonly isReadOnly: boolean;
  readonly syncEnabled: boolean;
  readonly externalSource: Nullable<ExternalCalendarSource>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * External calendar source (Google, Apple, etc.)
 */
export interface ExternalCalendarSource {
  readonly provider: 'google' | 'apple' | 'outlook' | 'other';
  readonly externalId: string;
  readonly lastSyncedAt: Nullable<Date>;
  readonly syncToken: Nullable<string>;
}

// =============================================================================
// EVENT INPUTS
// =============================================================================

/**
 * Input for creating a new calendar event
 */
export interface CreateEventInput {
  readonly title: string;
  readonly type: EventType;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly isAllDay?: boolean;
  readonly description?: string;
  readonly location?: LocationInfo;
  readonly priority?: EventPriority;
  readonly visibility?: EventVisibility;
  readonly isRecurring?: boolean;
  readonly recurrenceRule?: RecurrenceRule;
  readonly calendarId: CalendarId;
  readonly attendees?: readonly Attendee[];
  readonly reminders?: readonly Reminder[];
  readonly meetingUrl?: string;
  readonly color?: string;
  readonly tags?: readonly string[];
  readonly transactionId?: TransactionId;
}

/**
 * Input for updating an existing event
 */
export interface UpdateEventInput {
  readonly title?: string;
  readonly type?: EventType;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly isAllDay?: boolean;
  readonly description?: Nullable<string>;
  readonly location?: Nullable<LocationInfo>;
  readonly priority?: EventPriority;
  readonly visibility?: EventVisibility;
  readonly status?: EventStatus;
  readonly attendees?: readonly Attendee[];
  readonly reminders?: readonly Reminder[];
  readonly meetingUrl?: Nullable<string>;
  readonly color?: Nullable<string>;
  readonly tags?: readonly string[];
}

// =============================================================================
// EVENT FILTERS
// =============================================================================

/**
 * Event search filters
 */
export interface EventFilters {
  /** Filter by calendar(s) */
  readonly calendarIds?: readonly CalendarId[];
  /** Filter by event type(s) */
  readonly types?: readonly EventType[];
  /** Filter by status */
  readonly status?: EventStatus;
  /** Filter by priority */
  readonly priority?: EventPriority;
  /** Start of date range */
  readonly startDate?: Date;
  /** End of date range */
  readonly endDate?: Date;
  /** Search query for title/description */
  readonly searchQuery?: string;
  /** Include recurring event instances */
  readonly includeRecurring?: boolean;
  /** Only show events with transactions */
  readonly hasTransaction?: boolean;
}

/**
 * Event view options
 */
export type CalendarView = 'day' | 'week' | 'month' | 'agenda';

/**
 * Calendar display configuration
 */
export interface CalendarViewConfig {
  readonly view: CalendarView;
  readonly date: Date;
  readonly visibleCalendars: readonly CalendarId[];
  readonly timezone: string;
}

// =============================================================================
// TIME SLOT TYPES
// =============================================================================

/**
 * Represents a time slot for scheduling
 */
export interface TimeSlot {
  readonly start: Date;
  readonly end: Date;
  readonly isAvailable: boolean;
  readonly conflictingEvents: readonly EventId[];
}

/**
 * Availability configuration
 */
export interface AvailabilityConfig {
  readonly startHour: number;
  readonly endHour: number;
  readonly workingDays: readonly number[]; // 0-6, Sunday=0
  readonly timezone: string;
  readonly bufferMinutes: number;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a value is a valid EventType
 */
export function isEventType(value: unknown): value is EventType {
  const types: readonly string[] = [
    'appointment', 'meeting', 'reminder', 'task',
    'birthday', 'holiday', 'transaction', 'other'
  ];
  return typeof value === 'string' && types.includes(value);
}

/**
 * Type guard to check if a value is a valid EventPriority
 */
export function isEventPriority(value: unknown): value is EventPriority {
  return value === 'low' || value === 'medium' || value === 'high';
}

/**
 * Type guard to check if a value is a valid EventStatus
 */
export function isEventStatus(value: unknown): value is EventStatus {
  return value === 'confirmed' || value === 'tentative' || value === 'cancelled';
}

/**
 * Type guard to check if a value is a valid CalendarView
 */
export function isCalendarView(value: unknown): value is CalendarView {
  return value === 'day' || value === 'week' || value === 'month' || value === 'agenda';
}
