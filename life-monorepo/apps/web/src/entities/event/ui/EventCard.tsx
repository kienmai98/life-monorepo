import React from 'react';
import { format } from 'date-fns';
import type { CalendarEvent } from '../model';
import './EventCard.css';

export interface EventCardProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
}

/**
 * EventCard component - displays a single calendar event
 */
export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const handleClick = () => {
    onClick?.(event);
  };

  return (
    <div
      className="event-card"
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
    >
      <div
        className="event-card__color-bar"
        style={{ backgroundColor: event.color || '#292524' }}
      />
      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__time">
          {event.isAllDay
            ? 'ALL DAY'
            : `${format(new Date(event.startDate), 'h:mm a')} - ${format(
                new Date(event.endDate),
                'h:mm a'
              )}`}
        </p>
        {event.location && (
          <p className="event-card__location">📍 {event.location}</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
