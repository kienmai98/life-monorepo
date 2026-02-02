# ADR 004: Custom Hooks Architecture

## Status

**Accepted**

## Context

Common logic patterns were being duplicated across components:
- Async operation handling
- Loading state management
- Debouncing/throttling
- Storage operations
- Responsive design

## Decision

We will extract reusable logic into **custom hooks** in the `src/shared/hooks/` directory.

### Hook Categories

1. **Data Fetching**: `useAsync`, `useLoadingState`
2. **Input Handling**: `useDebounce`, `useThrottle`
3. **State Management**: `useToggle`, `usePrevious`
4. **Device**: `useResponsive`, `useThemeMode`
5. **Error Handling**: `useErrorBoundary`
6. **Lifecycle**: `useIsMounted`

### Hook Standards

```typescript
/**
 * JSDoc with description, examples, and parameter types
 */
export function useHookName(options: Options): ReturnType {
  // Implementation
}

// Default export for convenience
export default useHookName;
```

### Example

```typescript
// useAsync.ts
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  return { data, isLoading, error, execute };
}
```

## Consequences

### Positive
- Reusable logic across components
- Consistent patterns
- Easier testing
- Reduced duplication

### Negative
- Learning curve for team
- Potential for hook hell
- Need to document patterns

### Mitigations
- Clear naming conventions
- Documentation with examples
- Regular code reviews
