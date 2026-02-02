import { useEffect, useRef } from 'react';

/**
 * Hook that tracks whether a component is still mounted
 * Useful for preventing state updates on unmounted components
 *
 * @returns Object with isMounted property that is true while component is mounted
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isMounted } = useIsMounted();
 *
 *   useEffect(() => {
 *     fetchData().then(data => {
 *       if (isMounted()) {
 *         setData(data);
 *       }
 *     });
 *   }, []);
 *
 *   return <View />;
 * }
 * ```
 */
export function useIsMounted(): { isMounted: () => boolean } {
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    isMounted: () => isMountedRef.current,
  };
}

export default useIsMounted;
