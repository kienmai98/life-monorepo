import React, { useState } from 'react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  getDay,
} from 'date-fns';
import { useCalendarStore } from '../entities/event/model/store';
import { getShortMonthName } from '../shared/lib/helpers';
import './SchedulePage.css';

export const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  
  const { events, addEvent } = useCalendarStore();

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return isSameDay(eventDate, date);
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const startDate = new Date(selectedDate);
    startDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(selectedDate);
    endDate.setHours(11, 0, 0, 0);

    addEvent({
      title: newEventTitle,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isAllDay: false,
      color: '#3B82F6',
    });

    setNewEventTitle('');
    setShowAddForm(false);
  };

  const days = getDaysInMonth();
  const firstDayOfMonth = getDay(startOfMonth(currentDate));
  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="schedule-page">
      {/* Header */}
      <header className="schedule-header">
        <button className="nav-arrow" onClick={goToPreviousMonth}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <h1 className="month-title">
          {getShortMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h1>
        
        <button className="nav-arrow" onClick={goToNextMonth}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </header>

      {/* Calendar Grid */}
      <div className="calendar-container">
        <div className="calendar-grid">
          {/* Day Headers */}
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          
          {/* Empty cells for padding */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="day-cell empty" />
          ))}
          
          {/* Actual days */}
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            
            return (
              <button
                key={day.toISOString()}
                className={`day-cell ${isSelected ? 'selected' : ''} ${isTodayDate ? 'today' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                <span className="day-number">{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <div className="event-dots">
                    {dayEvents.slice(0, 3).map((event, idx) => (
                      <span
                        key={idx}
                        className="event-dot"
                        style={{ backgroundColor: event.color || '#292524' }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      <div className="selected-date-section">
        <div className="selected-date-header">
          <h2 className="selected-date-title">
            {isToday(selectedDate) ? 'TODAY' : format(selectedDate, 'EEEE, MMMM d').toUpperCase()}
          </h2>
          <span className="event-count">{selectedDateEvents.length} EVENTS</span>
        </div>

        <button className="btn btn-add" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'CANCEL' : '+ ADD EVENT'}
        </button>

        {showAddForm && (
          <form className="add-event-form" onSubmit={handleAddEvent}>
            <input
              type="text"
              className="form-input"
              placeholder="Event title..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">ADD</button>
          </form>
        )}

        <div className="events-list">
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div
                  className="event-color-bar"
                  style={{ backgroundColor: event.color || '#292524' }}
                />
                <div className="event-content">
                  <h3 className="event-name">{event.title}</h3>
                  <p className="event-time">
                    {event.isAllDay 
                      ? 'ALL DAY' 
                      : `${format(new Date(event.startDate), 'h:mm a')} - ${format(new Date(event.endDate), 'h:mm a')}`
                    }
                  </p>
                  {event.location && (
                    <p className="event-location">📍 {event.location}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-text">NO EVENTS FOR THIS DAY</p>
          )}
        </div>
      </div>

      <div className="home-padding" />
    </div>
  );
};

export default SchedulePage;
