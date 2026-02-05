import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Email" name="email" type="email" value="" onChange={() => {}} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<Input label="Email" name="email" value="test@example.com" onChange={() => {}} />);

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Email" name="email" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@example.com' },
    });

    expect(handleChange).toHaveBeenCalledWith('new@example.com');
  });

  it('displays error message when provided', () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} error="Invalid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} disabled />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders required indicator when required', () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
