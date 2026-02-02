/**
 * Example unit tests for helper functions
 * @example src/shared/utils/__tests__/helpers.test.ts
 */

import {
  formatCurrency,
  formatDate,
  capitalizeFirst,
  validateEmail,
  validatePassword,
  debounce,
  truncate,
  calculatePercentage,
} from '../helpers';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('formats JPY without decimals', () => {
    expect(formatCurrency(1234, 'JPY')).toBe('¥1,234');
  });
});

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('Jan');
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });

  it('formats Date object correctly', () => {
    const date = new Date(2024, 0, 15);
    const result = formatDate(date);
    expect(result).toContain('Jan');
  });

  it('accepts timestamp number', () => {
    const timestamp = new Date(2024, 0, 15).getTime();
    const result = formatDate(timestamp);
    expect(result).toContain('Jan');
  });
});

describe('capitalizeFirst', () => {
  it('capitalizes first letter', () => {
    expect(capitalizeFirst('hello')).toBe('Hello');
    expect(capitalizeFirst('Hello')).toBe('Hello');
    expect(capitalizeFirst('HELLO')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalizeFirst('')).toBe('');
  });

  it('handles single character', () => {
    expect(capitalizeFirst('a')).toBe('A');
    expect(capitalizeFirst('A')).toBe('A');
  });
});

describe('validateEmail', () => {
  it('returns true for valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user.name@example.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@@example.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('validates strong passwords', () => {
    const result = validatePassword('StrongPass1');
    expect(result.valid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it('rejects short passwords', () => {
    const result = validatePassword('Short1');
    expect(result.valid).toBe(false);
    expect(result.message).toContain('at least 8 characters');
  });

  it('requires uppercase', () => {
    const result = validatePassword('lowercase1');
    expect(result.valid).toBe(false);
    expect(result.message).toContain('uppercase');
  });

  it('requires lowercase', () => {
    const result = validatePassword('UPPERCASE1');
    expect(result.valid).toBe(false);
    expect(result.message).toContain('lowercase');
  });

  it('requires number', () => {
    const result = validatePassword('NoNumbers');
    expect(result.valid).toBe(false);
    expect(result.message).toContain('number');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('delays function call', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on subsequent calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    jest.advanceTimersByTime(50);
    debounced();
    jest.advanceTimersByTime(50);
    debounced();
    jest.advanceTimersByTime(50);

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
    expect(truncate('Hello World', 8, '→')).toBe('Hello W→');
  });

  it('does not truncate short strings', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
    expect(truncate('', 10)).toBe('');
  });

  it('handles exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

describe('calculatePercentage', () => {
  it('calculates percentage correctly', () => {
    expect(calculatePercentage(25, 100)).toBe('25.0');
    expect(calculatePercentage(1, 3)).toBe('33.3');
    expect(calculatePercentage(0, 100)).toBe('0.0');
  });

  it('handles zero total', () => {
    expect(calculatePercentage(25, 0)).toBe('0');
  });

  it('respects decimal places', () => {
    expect(calculatePercentage(1, 3, 0)).toBe('33');
    expect(calculatePercentage(1, 3, 2)).toBe('33.33');
  });
});
