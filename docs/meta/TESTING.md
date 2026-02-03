# Testing Guide for Life Monorepo

This document outlines the testing strategy, setup, and best practices for the Life monorepo.

## Table of Contents

1. [Overview](#overview)
2. [Testing Philosophy](#testing-philosophy)
3. [Test Structure](#test-structure)
4. [Running Tests](#running-tests)
5. [Native App Testing](#native-app-testing)
6. [Web App Testing](#web-app-testing)
7. [API Testing](#api-testing)
8. [Types Package Testing](#types-package-testing)
9. [E2E Testing](#e2e-testing)
10. [CI/CD Integration](#cicd-integration)
11. [Best Practices](#best-practices)
12. [Mock Examples](#mock-examples)

---

## Overview

The Life monorepo uses a multi-layered testing approach:

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit Tests | Jest / Vitest | Test individual functions, hooks, and utilities |
| Component Tests | React Testing Library | Test React components in isolation |
| Integration Tests | Vitest + Supertest | Test API routes and middleware |
| E2E Tests | Playwright | Test complete user flows |
| Type Tests | tsd / TypeScript | Ensure type safety |

---

## Testing Philosophy

### 1. The Testing Trophy

We follow the Testing Trophy approach (inspired by Kent C. Dodds):

```
        🏆
    E2E Tests
   (Critical Flows)
        ↑
  Integration Tests
  (Feature Testing)
        ↑
   Unit Tests
 (Pure Functions)
        ↑
   Static Types
  (TypeScript)
```

### 2. Monochrome Theme Testing

All test outputs, snapshots, and reports use a monochrome black/white theme:

- **Coverage reports**: Black text on white background
- **Console output**: Minimal formatting, monochrome only
- **Screenshots**: Grayscale for visual regression
- **Diffs**: Black text, white background, simple indicators

### 3. Test Priorities

1. **Business-critical paths** - Always tested (auth, payments, data persistence)
2. **User-facing features** - High priority (UI components, navigation)
3. **Edge cases** - Medium priority (error states, empty states)
4. **Implementation details** - Low priority (avoid testing internals)

---

## Test Structure

```
apps/
├── native/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── stores/
│   │   │   │   │   ├── authStore.ts
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── authStore.test.ts
│   │   │   │   └── screens/
│   │   │   │       └── __tests__/
│   │   │   │           └── LoginScreen.test.tsx
│   │   │   └── ...
│   │   └── shared/
│   │       └── __tests__/
│   │           └── setupTests.ts
│   ├── __mocks__/
│   │   ├── react-native.ts
│   │   ├── @react-native-async-storage.ts
│   │   └── zustand.ts
│   └── jest.config.js
├── web/
│   ├── src/
│   │   ├── __tests__/
│   │   └── components/
│   │       └── __tests__/
│   ├── e2e/
│   │   ├── playwright.config.ts
│   │   └── tests/
│   │       ├── login.spec.ts
│   │       ├── transaction.spec.ts
│   │       └── calendar.spec.ts
│   └── vitest.config.ts
├── api/
│   ├── src/
│   │   ├── routes/
│   │   │   └── __tests__/
│   │   │       ├── auth.routes.test.ts
│   │   │       └── transactions.routes.test.ts
│   │   └── middleware/
│   │       └── __tests__/
│   │           └── auth.middleware.test.ts
│   └── vitest.config.ts
└── types/
    ├── src/
    │   └── __tests__/
    │       └── types.test.ts
    └── vitest.config.ts
```

---

## Running Tests

### From Root

```bash
# Run all tests
turbo run test

# Run tests in watch mode
turbo run test -- --watch

# Run tests with coverage
turbo run test:coverage

# Run specific app tests
turbo run test --filter=@life/native
turbo run test --filter=@life/web
turbo run test --filter=@life/api
```

### Individual Apps

```bash
# Native (Jest)
cd apps/native
npm test
npm run test:coverage
npm run test:watch

# Web (Vitest)
cd apps/web
npm test
npm run test:coverage
npm run test:ui

# API (Vitest)
cd apps/api
npm test
npm run test:coverage
npm run test:integration

# Types (Vitest)
cd packages/types
npm test
```

### E2E Tests

```bash
# Install Playwright browsers
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run specific test
npx playwright test login.spec.ts

# Run with UI mode
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

---

## Native App Testing

### Setup

The native app uses **Jest** with **React Native Testing Library**.

**Key Features:**
- Mocked React Native modules
- MSW for API mocking
- AsyncStorage mocking
- Zustand store testing utilities

### Store Testing Pattern

```typescript
// __tests__/authStore.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAuthStore.setState({
      user: null,
      isLoading: false,
      isBiometricEnabled: false,
      error: null,
    });
  });

  it('should set user', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setUser({
        id: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: null,
      });
    });

    expect(result.current.user).toEqual({
      id: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    });
  });
});
```

### Screen Testing Pattern

```typescript
// __tests__/LoginScreen.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('LoginScreen', () => {
  it('renders login form', () => {
    render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('shows validation error for empty fields', async () => {
    render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    fireEvent.press(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeTruthy();
    });
  });
});
```

### API Mocking with MSW

```typescript
// __mocks__/server.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    
    if (body.email === 'test@example.com' && body.password === 'password') {
      return HttpResponse.json({
        user: {
          id: '123',
          email: 'test@example.com',
          displayName: 'Test User',
        },
        token: 'fake-jwt-token',
      });
    }
    
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];

export const server = setupServer(...handlers);
```

---

## Web App Testing

### Setup

The web app uses **Vitest** with **React Testing Library**.

### Component Testing Pattern

```typescript
// __tests__/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Hook Testing Pattern

```typescript
// __tests__/useCounter.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(6);
  });
});
```

---

## API Testing

### Setup

The API uses **Vitest** with **Supertest** for integration testing.

### Route Testing Pattern

```typescript
// routes/__tests__/auth.routes.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { buildApp } from '../../app';

const app = buildApp();

describe('Auth Routes', () => {
  describe('POST /api/auth/login', () => {
    it('returns 200 with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
    });

    it('returns 401 with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
```

### Middleware Testing Pattern

```typescript
// middleware/__tests__/auth.middleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from '../auth.middleware';

describe('Auth Middleware', () => {
  it('allows requests with valid token', async () => {
    const mockRequest = {
      headers: { authorization: 'Bearer valid-token' },
    };
    const mockReply = {};
    const mockDone = vi.fn();

    await authMiddleware(mockRequest as any, mockReply as any, mockDone);

    expect(mockDone).toHaveBeenCalled();
  });

  it('rejects requests without token', async () => {
    const mockRequest = { headers: {} };
    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    await authMiddleware(mockRequest as any, mockReply as any, vi.fn());

    expect(mockReply.status).toHaveBeenCalledWith(401);
  });
});
```

---

## Types Package Testing

### Runtime Type Validation

We use **Zod** for runtime type validation in addition to TypeScript compile-time checking.

```typescript
// __tests__/types.test.ts
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { UserSchema, TransactionSchema } from '../schemas';

describe('UserSchema', () => {
  it('validates correct user data', () => {
    const validUser = {
      id: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };

    expect(() => UserSchema.parse(validUser)).not.toThrow();
  });

  it('rejects invalid email', () => {
    const invalidUser = {
      id: '123',
      email: 'not-an-email',
      displayName: 'Test User',
    };

    expect(() => UserSchema.parse(invalidUser)).toThrow();
  });
});
```

---

## E2E Testing

### Setup

E2E tests use **Playwright** for testing critical user flows.

### Critical User Flows

#### 1. Login Flow

```typescript
// e2e/tests/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-greeting"]')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'wrong@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});
```

#### 2. Add Transaction Flow

```typescript
// e2e/tests/transaction.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Add Transaction Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('user can add a new expense', async ({ page }) => {
    await page.click('[data-testid="add-transaction-button"]');
    
    await page.fill('[data-testid="amount-input"]', '50.00');
    await page.selectOption('[data-testid="category-select"]', 'food');
    await page.fill('[data-testid="description-input"]', 'Lunch at cafe');
    await page.click('[data-testid="save-transaction-button"]');
    
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
    await expect(page.locator('text=Lunch at cafe')).toBeVisible();
  });
});
```

#### 3. Calendar View Flow

```typescript
// e2e/tests/calendar.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Calendar View Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
  });

  test('user can view calendar', async ({ page }) => {
    await page.click('[data-testid="calendar-nav"]');
    
    await expect(page).toHaveURL('/calendar');
    await expect(page.locator('[data-testid="calendar-grid"]')).toBeVisible();
  });

  test('user can navigate between months', async ({ page }) => {
    await page.goto('/calendar');
    
    const currentMonth = await page.locator('[data-testid="current-month"]').textContent();
    
    await page.click('[data-testid="next-month-button"]');
    
    const nextMonth = await page.locator('[data-testid="current-month"]').textContent();
    expect(nextMonth).not.toBe(currentMonth);
  });
});
```

### Visual Regression Testing

```typescript
// e2e/tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('login page matches snapshot', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100,
    });
  });
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

See `.github/workflows/test.yml` for the complete workflow.

### Coverage Requirements

| Package | Threshold |
|---------|-----------|
| @life/native | 70% |
| @life/web | 70% |
| @life/api | 75% |
| @life/types | N/A (type-only) |

### PR Checks

All PRs must pass:
1. Type checking (`tsc --noEmit`)
2. Linting (Biome)
3. Unit tests (with coverage threshold)
4. E2E tests (critical flows only)

---

## Best Practices

### 1. Test Naming

```typescript
// Good
describe('AuthStore', () => {
  it('should set user when login is successful', () => {});
  it('should set error when login fails with invalid credentials', () => {});
  it('should clear user when logout is called', () => {});
});

// Bad
describe('AuthStore', () => {
  it('works correctly', () => {});
  it('test login', () => {});
});
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('should calculate total correctly', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(30);
});
```

### 3. Avoid Testing Implementation Details

```typescript
// Bad - Testing implementation details
test('calls setState with correct arguments', () => {
  const setState = jest.spyOn(Component.prototype, 'setState');
  // ...
});

// Good - Testing user behavior
test('displays updated count after click', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4. Use Data Test IDs

```tsx
// Component
<button data-testid="submit-button">Submit</button>

// Test
screen.getByTestId('submit-button');
```

### 5. Isolate Tests

```typescript
// Use beforeEach to reset state
beforeEach(() => {
  jest.clearAllMocks();
  useAuthStore.setState(initialState);
});
```

---

## Mock Examples

### React Native AsyncStorage

```typescript
// __mocks__/@react-native-async-storage/async-storage.ts
const storage = new Map<string, string>();

export default {
  setItem: jest.fn((key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve();
  }),
  getItem: jest.fn((key: string) => {
    return Promise.resolve(storage.get(key) || null);
  }),
  removeItem: jest.fn((key: string) => {
    storage.delete(key);
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    storage.clear();
    return Promise.resolve();
  }),
};
```

### Zustand Store

```typescript
// __mocks__/zustand.ts
import { act } from '@testing-library/react-native';

export const mockStore = (hook: any, state: any) => {
  act(() => {
    hook.setState(state);
  });
};
```

### React Native Modules

```typescript
// __mocks__/react-native.ts
export const Platform = {
  OS: 'ios',
  select: jest.fn((obj: any) => obj.ios),
};

export const Dimensions = {
  get: jest.fn(() => ({ width: 375, height: 812 })),
};

export const Alert = {
  alert: jest.fn(),
};
```

---

## Troubleshooting

### Common Issues

#### 1. Jest Transform Errors

```bash
# If you see "Cannot use import statement outside a module"
npm run test -- --clearCache
```

#### 2. AsyncStorage Warnings

```typescript
// Add to jest.setup.js
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

#### 3. Playwright Browser Issues

```bash
# Reinstall browsers
npx playwright install --with-deps
```

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vitest Documentation](https://vitest.dev/guide/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MSW Documentation](https://mswjs.io/docs/)
- [Zod Documentation](https://zod.dev/)

---

## Contributing

When adding new tests:

1. Follow the existing patterns in this guide
2. Ensure tests are deterministic (no randomness)
3. Add data-testid attributes for E2E tests
4. Update this documentation if introducing new patterns
5. Maintain the monochrome theme for all outputs
