import { useRef, useEffect } from 'react';

/**
 * Hook for tracking the previous value of a state or prop
 * 
 * @template T - Type of the value to track
 * @param value - Current value
 * @returns The previous value (undefined on first render)
 * 
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   
 *   return (
 *     <View>
 *       <Text>Now: {count}, Before: {prevCount}</Text>
 *       <Button onPress={() => setCount(c => c + 1)}>Increment</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
