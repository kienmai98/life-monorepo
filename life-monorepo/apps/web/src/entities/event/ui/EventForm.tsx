import React, { useState } from 'react';
import { Button } from '../../../shared/components';
import './EventForm.css';

export interface EventFormData {
  title: string;
  isAllDay: boolean;
  color: string;
  location?: string;
}

export interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EventFormData>;
}

const COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // yellow
  '#8B5CF6', // purple
  '#EC4899', // pink
];

/**
 * EventForm component - form for creating/editing events
 */
export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || COLORS[0]);
  const [location, setLocation] = useState(initialData?.location || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      isAllDay: false,
      color,
      location: location.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setLocation('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form__group">
        <label className="event-form__label">Event Title</label>
        <input
          type="text"
          className="event-form__input"
          placeholder="Enter event title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="event-form__group">
        <label className="event-form__label">Location (optional)</label>
        <input
          type="text"
          className="event-form__input"
          placeholder="Add location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="event-form__group">
        <label className="event-form__label">Color</label>
        <div className="event-form__colors">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`event-form__color-btn ${
                color === c ? 'event-form__color-btn--selected' : ''
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="event-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Event
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
