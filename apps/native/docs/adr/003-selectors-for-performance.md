# ADR 003: Selectors for State Management Performance

## Status

**Accepted**

## Context

React components re-render when subscribed state changes. With Zustand, subscribing to the entire store causes unnecessary re-renders when unrelated state changes.

### Problem

```typescript
// ❌ Bad: Component re-renders when ANY store state changes
const { transactions } = useTransactionStore();
```

### Solution

Use selectors to subscribe only to specific state slices.

## Decision

We will use **selector functions** for all Zustand store subscriptions.

### Implementation

```typescript
// store.ts
export const selectTransactions = (state: Store) => state.transactions;
export const selectIsLoading = (state: Store) => state.isLoading;

// Component.tsx
const transactions = useTransactionStore(selectTransactions);
const isLoading = useTransactionStore(selectIsLoading);
```

### Selector Patterns

1. **Simple selectors**: Extract single values
2. **Computed selectors**: Derive values from state
3. **Memoized selectors**: Use with reselect for expensive computations

## Consequences

### Positive
- Reduced re-renders
- Better performance
- Clear data dependencies
- Easier to test

### Negative
- More code to write
- Need to export selectors
- Team needs to understand pattern

### Mitigations
- Include selector pattern in onboarding
- Create linting rules
- Document best practices
