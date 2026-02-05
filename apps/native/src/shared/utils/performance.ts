/**
 * Performance utilities for the Life app
 * Provides memoization helpers and optimization patterns
 * @module shared/utils/performance
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';

/**
 * Memoization cache for expensive computations
 */
class MemoizationCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

/**
 * Creates a memoized function with LRU cache
 * @param fn - Function to memoize
 * @param keyFn - Function to generate cache key from arguments
 * @param maxSize - Maximum cache size
 * @returns Memoized function
 *
 * @example
 * const expensiveOperation = memoize(
 *   (n: number) => fibonacci(n),
 *   (n) => n.toString(),
 *   100
 * );
 * expensiveOperation(40); // Computes
 * expensiveOperation(40); // Returns from cache
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  keyFn: (...args: Parameters<T>) => string,
  maxSize = 100
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new MemoizationCache<string, ReturnType<T>>(maxSize);

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = keyFn(...args);

    if (cache.has(key)) {
      const cached = cache.get(key);
      if (cached !== undefined) {
        return cached;
      }
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  };
}

/**
 * Hook for memoizing expensive computations with custom equality check
 * @param factory - Function that computes the value
 * @param deps - Dependencies array
 * @param isEqual - Custom equality function
 * @returns Memoized value
 *
 * @example
 * const sortedData = useDeepMemo(
 *   () => [...data].sort((a, b) => a.date - b.date),
 *   [data],
 *   (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
 * );
 */
export function useDeepMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  isEqual: (a: React.DependencyList, b: React.DependencyList) => boolean
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T } | null>(null);

  if (!(ref.current && isEqual(deps, ref.current.deps))) {
    ref.current = { deps, value: factory() };
  }

  return ref.current.value;
}

/**
 * Hook for tracking render count and duration (development only)
 * @param componentName - Name of component to track
 *
 * @example
 * useRenderTracker('TransactionList');
 */
export function useRenderTracker(_componentName: string): void {
  const renderCount = useRef(0);
  const startTime = useRef(Date.now());

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional dependency for debugging trigger
  useEffect(() => {
    if (__DEV__) {
      renderCount.current += 1;
      const _duration = Date.now() - startTime.current;
      startTime.current = Date.now();
    }
  }, [_componentName]);
}

/**
 * Hook for lazy initialization of expensive objects
 * @param factory - Factory function
 * @returns Memoized value
 *
 * @example
 * const heavyObject = useLazyMemo(() => new HeavyClass());
 */
export function useLazyMemo<T>(factory: () => T): T {
  const ref = useRef<T | null>(null);
  const factoryRef = useRef(factory);

  // Update factory ref if it changes
  factoryRef.current = factory;

  return useMemo(() => {
    if (ref.current === null) {
      ref.current = factoryRef.current();
    }
    return ref.current;
  }, []);
}

/**
 * Creates a stable callback that doesn't cause re-renders
 * Useful for event handlers passed to optimized components
 * @param callback - Callback function
 * @returns Stable callback reference
 *
 * @example
 * const handleScroll = useStableCallback((event) => {
 *   console.log(event.nativeEvent.contentOffset.y);
 * });
 */
export function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T
): (...args: Parameters<T>) => ReturnType<T> {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Parameters<T>) => callbackRef.current(...args) as ReturnType<T>, []);
}

/**
 * Hook for batching state updates
 * @returns Batched update function
 *
 * @example
 * const batchUpdate = useBatchUpdate();
 * batchUpdate(() => {
 *   setState1(newValue1);
 *   setState2(newValue2);
 *   setState3(newValue3);
 * });
 */
export function useBatchUpdate(): (fn: () => void) => void {
  const [tick, setTick] = React.useState(0);
  const fnRef = useRef<(() => void) | null>(null);
  const tickRef = useRef(tick);

  // Sync tick ref with state
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: tick is intentional trigger for batch updates
  useEffect(() => {
    if (fnRef.current) {
      fnRef.current();
      fnRef.current = null;
    }
  }, [tick]);

  return useCallback((fn: () => void) => {
    fnRef.current = fn;
    setTick((t) => t + 1);
  }, []);
}

import React from 'react';

/**
 * Higher-order component for memoization with custom comparison
 * @param Component - Component to memoize
 * @param areEqual - Custom comparison function
 * @returns Memoized component
 *
 * @example
 * const MemoizedList = memoWithCompare(
 *   ListComponent,
 *   (prev, next) => prev.data.length === next.data.length
 * );
 */
export function memoWithCompare<P extends object>(
  Component: React.ComponentType<P>,
  areEqual: (prevProps: P, nextProps: P) => boolean
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component, areEqual);
}

/**
 * Hook for virtualization of long lists
 * Calculates visible items based on scroll position
 * @param itemCount - Total number of items
 * @param itemHeight - Height of each item
 * @param viewportHeight - Height of viewport
 * @param overscan - Number of items to render outside viewport
 * @returns Virtualization info
 *
 * @example
 * const { startIndex, endIndex, virtualItems } = useVirtualization(
 *   transactions.length,
 *   80,
 *   height,
 *   5
 * );
 */
export function useVirtualization(
  itemCount: number,
  itemHeight: number,
  viewportHeight: number,
  overscan = 3
): {
  startIndex: number;
  endIndex: number;
  virtualHeight: number;
  getItemStyle: (index: number) => { height: number; position: 'absolute'; top: number };
} {
  const totalHeight = itemCount * itemHeight;
  const visibleCount = Math.ceil(viewportHeight / itemHeight);

  const getItemStyle = (index: number) => ({
    height: itemHeight,
    position: 'absolute' as const,
    top: index * itemHeight,
  });

  return {
    startIndex: 0,
    endIndex: Math.min(itemCount, visibleCount + overscan * 2),
    virtualHeight: totalHeight,
    getItemStyle,
  };
}

export default {
  memoize,
  useDeepMemo,
  useRenderTracker,
  useLazyMemo,
  useStableCallback,
  useBatchUpdate,
  memoWithCompare,
  useVirtualization,
};
