import React, { useCallback } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  getDay,
} from 'date-fns';
import type { CalendarEvent } from '../model';
import './CalendarGrid.css';

export interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}

/**
 * CalendarGrid component - displays a month view calendar
 */
export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
}) => {
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const firstDayOfMonth = getDay(startOfMonth(currentDate));

  const getEventsForDate = useCallback(
    (date: Date) => {
      return events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return isSameDay(eventDate, date);
      });
    },
    [events]
  );

  const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="calendar-grid">
      {/* Day Headers */}
      {dayHeaders.map((day) => (
        <div key={day} className="calendar-grid__header">
          {day}
        </div>
      ))}

      {/* Empty cells for padding */}
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
        <div key={`empty-${index}`} className="calendar-grid__cell calendar-grid__cell--empty" />
      ))}

      {/* Actual days */}
      {days.map((day) => {
        const dayEvents = getEventsForDate(day);
        const isSelected = isSameDay(day, selectedDate);
        const isTodayDate = isToday(day);

        return (
          <button
            key={day.toISOString()}
            className={`calendar-grid__cell ${
              isSelected ? 'calendar-grid__cell--selected' : ''
            } ${isTodayDate ? 'calendar-grid__cell--today' : ''}`}
            onClick={() => onSelectDate(day)}
            aria-label={format(day, 'MMMM d, yyyy')}
            aria-selected={isSelected}
          >
            <span className="calendar-grid__day-number">{format(day, 'd')}</span>
            {dayEvents.length > 0 && (
              <div className="calendar-grid__dots">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <span
                    key={idx}
                    className="calendar-grid__dot"
                    style={{ backgroundColor: event.color || '#292524' }}
                  />
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
