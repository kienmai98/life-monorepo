import { useState, useCallback } from 'react';

/**
 * Return type for useToggle hook
 */
interface UseToggleReturn {
  /** Current toggle state */
  value: boolean;
  /** Toggle to the opposite state */
  toggle: () => void;
  /** Set to true */
  setOn: () => void;
  /** Set to false */
  setOff: () => void;
  /** Set to a specific value */
  set: (value: boolean) => void;
}

/**
 * Hook for simple boolean state toggling
 * 
 * @param initialValue - Initial boolean value (default: false)
 * @returns Toggle state and control functions
 * 
 * @example
 * ```tsx
 * function Modal() {
 *   const { value: isOpen, toggle, setOff } = useToggle(false);
 *   
 *   return (
 *     <View>
 *       <Button onPress={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
 *       <Modal visible={isOpen} onDismiss={setOff}>
 *         <Text>Modal Content</Text>
 *       </Modal>
 *     </View>
 *   );
 * }
 * ```
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);
  const set = useCallback((newValue: boolean) => setValue(newValue), []);

  return {
    value,
    toggle,
    setOn,
    setOff,
    set,
  };
}

export default useToggle;
