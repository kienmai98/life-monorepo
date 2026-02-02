/**
 * Example hook tests
 * @example src/shared/hooks/__tests__/useToggle.test.ts
 */

import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('initializes with false by default', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets to on', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.setOn();
    });
    expect(result.current.value).toBe(true);

    // Calling again should stay true
    act(() => {
      result.current.setOn();
    });
    expect(result.current.value).toBe(true);
  });

  it('sets to off', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.setOff();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets to specific value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.set(true);
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.set(false);
    });
    expect(result.current.value).toBe(false);
  });
});
