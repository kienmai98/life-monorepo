# ADR 005: Error Boundaries

## Status

**Accepted**

## Context

JavaScript errors in parts of the UI should not break the entire app. We need a way to handle errors gracefully and show fallback UI.

## Decision

We will implement **Error Boundaries** using React class components to catch JavaScript errors anywhere in the child component tree.

### Implementation

```typescript
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorUI />;
    }
    return this.props.children;
  }
}
```

### Usage

```typescript
// App-level error boundary
function App() {
  return (
    <ErrorBoundary onError={logError}>
      <AppNavigator />
    </ErrorBoundary>
  );
}

// Feature-level error boundary
function DashboardScreen() {
  return (
    <ErrorBoundary fallback={<DashboardError />}>
      <DashboardContent />
    </ErrorBoundary>
  );
}
```

## Consequences

### Positive
- Graceful error handling
- Users see fallback UI instead of crash
- Errors can be logged to services
- Recovery possible with retry

### Negative
- Only catches render phase errors
- Requires class component (no hooks in error boundaries yet)
- Extra nesting in component tree

### Mitigations
- Also use try-catch for async operations
- Document limitations clearly
