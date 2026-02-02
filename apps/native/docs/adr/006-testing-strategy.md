# ADR 006: Testing Strategy

## Status

**Accepted**

## Context

We need a comprehensive testing strategy that:
- Catches bugs early
- Enables refactoring with confidence
- Documents expected behavior
- Runs quickly in CI/CD

## Decision

We will use a **multi-layer testing strategy**:

### 1. Unit Tests (70%)

Test individual functions and hooks in isolation.

```typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});
```

### 2. Component Tests (20%)

Test component rendering and user interactions.

```typescript
it('renders transaction details', () => {
  const { getByText } = render(
    <TransactionCard transaction={mockTransaction} />
  );
  expect(getByText('Grocery shopping')).toBeTruthy();
});
```

### 3. Integration Tests (10%)

Test feature workflows with multiple components.

```typescript
it('completes login flow', async () => {
  const { getByText, getByPlaceholderText } = render(
    <AuthNavigator />
  );
  
  fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'password');
  fireEvent.press(getByText('Sign In'));
  
  await waitFor(() => {
    expect(getByText('Dashboard')).toBeTruthy();
  });
});
```

### Tools

| Type | Tool |
|------|------|
| Test Runner | Jest |
| Component Testing | React Native Testing Library |
| E2E | Detox (planned) |
| Mocking | Jest mocks |

### Coverage Goals

- Statements: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%

## Consequences

### Positive
- Higher code quality
- Easier refactoring
- Living documentation
- Faster bug detection

### Negative
- Time investment
- Maintenance overhead
- Can slow development initially

### Mitigations
- Focus on critical paths
- Use test utilities
- Run tests in CI
- Balance coverage with pragmatism
