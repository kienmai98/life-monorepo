# Feature-Sliced Design (FSD) Architecture

This document describes the FSD architecture used in the Life Monorepo.

## Overview

Feature-Sliced Design is an architectural methodology for frontend projects. It aims to create a scalable and maintainable codebase by organizing code around business domains.

## Layer Structure

```
src/
├── app/          # Application initialization layer
├── processes/    # Business process layer (optional)
├── pages/        # Page/route layer
├── widgets/      # Independent UI blocks
├── features/     # User features
├── entities/     # Business entities
└── shared/       # Shared code
```

## Import Rules

1. **One-Way Dependencies**: Each layer can only import from layers below it:
   - `app` → `pages`, `widgets`, `features`, `entities`, `shared`
   - `pages` → `widgets`, `features`, `entities`, `shared`
   - `widgets` → `features`, `entities`, `shared`
   - `features` → `entities`, `shared`
   - `entities` → `shared`
   - `shared` → nothing (only internal)

2. **No Cross-Slice Imports**: Slices within the same layer cannot import from each other:
   - ❌ `features/auth` cannot import from `features/money`
   - ✅ Use composition at the widget/page level instead

3. **Public API**: Each slice exports only what's needed via `index.ts`

## Layers Explained

### 1. App Layer (`app/`)
Application initialization code:
- Providers setup
- Global styles
- Entry point component

### 2. Pages Layer (`pages/`)
Route-level components:
- One page per route
- Composition of widgets and features
- No business logic, only composition

### 3. Widgets Layer (`widgets/`)
Independent UI blocks:
- Header, Navigation, Cards
- Can use multiple features
- Self-contained with own state if needed

### 4. Features Layer (`features/`)
User-facing features:
- Authentication, Money, Schedule, Profile
- Each feature contains: api, model, lib, ui

### 5. Entities Layer (`entities/`)
Business entities:
- User, Transaction, Event
- Types, store state, selectors

### 6. Shared Layer (`shared/`)
Shared code:
- API client
- Utilities
- UI kit components
- Global types

## Feature Structure

Each feature follows this internal structure:

```
features/auth/
├── api/          # API calls
│   ├── login.ts
│   ├── register.ts
│   └── index.ts
├── model/        # State management
│   ├── types.ts
│   ├── store.ts
│   ├── selectors.ts
│   └── index.ts
├── lib/          # Hooks and utilities
│   ├── useAuth.ts
│   └── index.ts
├── ui/           # Components
│   ├── login-form/
│   ├── register-form/
│   └── index.ts
└── index.ts      # Public API
```

## File Size Limit

All files must be under **150 lines**:
- Split large components into smaller ones
- Extract hooks to `lib/`
- Extract utilities to `lib/`
- Keep components focused and single-responsibility

## Import Aliases

Use path aliases for clean imports:

```typescript
// ✅ Good
import { useAuth } from '@/features/auth';
import { TransactionCard } from '@/widgets/transaction-card';

// ❌ Bad
import { useAuth } from '../../../features/auth';
import { TransactionCard } from '../../widgets/transaction-card';
```

## Migration Guide

### From Old Structure

```typescript
// Before
import { useAuthStore } from '../stores/authStore';
import { LoginScreen } from './screens/LoginScreen';

// After
import { useAuth } from '@/features/auth';
import { LoginPage } from '@/pages/login';
```

## Benefits

1. **Scalability**: Easy to add new features without affecting existing code
2. **Maintainability**: Clear boundaries and responsibilities
3. **Testability**: Isolated features are easier to test
4. **Team Collaboration**: Different teams can work on different features
5. **Code Reusability**: Shared code is clearly separated

## References

- [Feature-Sliced Design Official](https://feature-sliced.design/)
