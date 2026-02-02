import React, { useCallback, useMemo } from 'react';
import { format, isToday } from 'date-fns';
import { useCalendarStore } from '../../entities/event/model';
import { CalendarGrid, EventCard, EventForm } from '../../entities/event/ui';
import { Button, Modal } from '../../shared/components';
import { useModal } from '../../shared/hooks';
import './CalendarFeature.css';

/**
 * CalendarHeader component - displays month navigation
 */
interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevious,
  onNext,
}) => {
  const monthName = format(currentDate, 'MMM yyyy').toUpperCase();

  return (
    <header className="calendar-header">
      <button className="calendar-header__nav" onClick={onPrevious} aria-label="Previous month">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <h1 className="calendar-header__title">{monthName}</h1>

      <button className="calendar-header__nav" onClick={onNext} aria-label="Next month">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </header>
  );
};

/**
 * SelectedDatePanel component - displays events for selected date
 */
interface SelectedDatePanelProps {
  selectedDate: Date;
  events: ReturnType<typeof useCalendarStore.getState.getEventsForDate>;
  onAddEvent: () => void;
}

const SelectedDatePanel: React.FC<SelectedDatePanelProps> = ({
  selectedDate,
  events,
  onAddEvent,
}) => {
  const dateTitle = isToday(selectedDate)
    ? 'TODAY'
    : format(selectedDate, 'EEEE, MMMM d').toUpperCase();

  return (
    <div className="selected-date-panel">
      <div className="selected-date-panel__header">
        <div>
          <h2 className="selected-date-panel__title">{dateTitle}</h2>
          <span className="selected-date-panel__count">
            {events.length} EVENTS
          </span>
        </div>
      </div>

      <Button variant="primary" fullWidth onClick={onAddEvent}>
        + ADD EVENT
      </Button>

      <div className="selected-date-panel__events">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="selected-date-panel__empty">NO EVENTS FOR THIS DAY</p>
        )}
      </div>
    </div>
  );
};

/**
 * CalendarFeature - Main calendar feature component
 * Combines calendar grid with event management
 */
export const CalendarFeature: React.FC = () => {
  const {
    events,
    selectedDate,
    currentMonth,
    setSelectedDate,
    setCurrentMonth,
    addEvent,
  } = useCalendarStore();

  const { isOpen, open, close } = useModal();

  const selectedDateEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      }),
    [events, selectedDate]
  );

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  }, [currentMonth, setCurrentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  }, [currentMonth, setCurrentMonth]);

  const handleSelectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const handleAddEvent = useCallback(
    (formData: { title: string; isAllDay: boolean; color: string; location?: string }) => {
      const startDate = new Date(selectedDate);
      startDate.setHours(10, 0, 0, 0);

      const endDate = new Date(selectedDate);
      endDate.setHours(11, 0, 0, 0);

      addEvent({
        ...formData,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      close();
    },
    [selectedDate, addEvent, close]
  );

  return (
    <div className="calendar-feature">
      <CalendarHeader
        currentDate={currentMonth}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />

      <div className="calendar-feature__grid-container">
        <CalendarGrid
          currentDate={currentMonth}
          selectedDate={selectedDate}
          events={events}
          onSelectDate={handleSelectDate}
        />
      </div>

      <SelectedDatePanel
        selectedDate={selectedDate}
        events={selectedDateEvents}
        onAddEvent={open}
      />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="ADD EVENT"
      >
        <EventForm onSubmit={handleAddEvent} onCancel={close} />
      </Modal>
    </div>
  );
};

export default CalendarFeature;
