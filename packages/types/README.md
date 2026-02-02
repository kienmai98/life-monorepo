# 📦 @life/types

Shared TypeScript type definitions for the Life app ecosystem — ensuring type safety across all packages and applications.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 📋 Overview

This package contains all shared TypeScript interfaces, types, and enums used across:

- 📱 `apps/native` - React Native mobile app
- 🖥️ `apps/web` - React web application  
- 🔧 `apps/api` - Fastify backend API

Centralizing types ensures consistency and reduces duplication across the monorepo.

---

## 📦 Installation

```bash
# Installed automatically via workspaces
npm install
```

The package is referenced in other apps using npm workspaces:

```json
{
  "dependencies": {
    "@life/types": "workspace:*"
  }
}
```

---

## 🚀 Usage

### Import Types

```typescript
// In any app (native, web, or api)
import type {
  User,
  Transaction,
  CalendarEvent,
  ApiResponse,
} from '@life/types';
```

### Example Usage by App

#### Native App
```typescript
import type { Transaction, TransactionCategory } from '@life/types';
import { useState } from 'react';

function TransactionForm() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [category, setCategory] = useState<TransactionCategory>('food');
  
  // Type-safe category selection
  const categories: TransactionCategory[] = [
    'food', 'transport', 'shopping', 'entertainment',
    'utilities', 'health', 'travel', 'other'
  ];
  
  return (
    // Form implementation
  );
}
```

#### Web App
```typescript
import type { User, UserPreferences } from '@life/types';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  preferences: UserPreferences;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  preferences: {
    theme: 'system',
    currency: 'USD',
    biometricEnabled: false,
  },
  setUser: (user) => set({ user }),
}));
```

#### API Server
```typescript
import type { Transaction, ApiResponse } from '@life/types';
import { FastifyReply } from 'fastify';

async function createTransaction(
  data: Omit<Transaction, 'id' | 'createdAt'>
): Promise<ApiResponse<Transaction>> {
  const transaction = await db.transactions.create(data);
  
  return {
    success: true,
    data: transaction,
  };
}
```

---

## 📁 Type Categories

### Navigation Types

Types for React Navigation screens and params.

```typescript
import type {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  MainStackParamList,
} from '@life/types';

// Usage in navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function LoginScreen({ navigation }: Props) {
  navigation.navigate('Register');
}
```

**Available Types:**

| Type | Description |
|------|-------------|
| `RootStackParamList` | Root navigator screens |
| `AuthStackParamList` | Auth flow screens (Login, Register) |
| `MainTabParamList` | Bottom tab screens |
| `MainStackParamList` | Main stack screens |

### User Types

User-related types for authentication and profiles.

```typescript
import type { User, UserPreferences } from '@life/types';

const user: User = {
  id: 'uuid',
  email: 'user@example.com',
  displayName: 'John Doe',
  photoURL: 'https://...',
};

const preferences: UserPreferences = {
  theme: 'dark',      // 'light' | 'dark' | 'system'
  currency: 'USD',
  biometricEnabled: true,
};
```

**Available Types:**

| Type | Description |
|------|-------------|
| `User` | Core user entity |
| `UserPreferences` | User settings and preferences |

### Transaction Types

Financial transaction types for expense tracking.

```typescript
import type {
  Transaction,
  TransactionCategory,
  TransactionType,
} from '@life/types';

const transaction: Transaction = {
  id: 'uuid',
  amount: 45.99,
  category: 'food',
  description: 'Grocery shopping',
  date: '2024-01-15',
  receiptImage: 'https://...',
  createdAt: '2024-01-15T10:30:00Z',
};

// Valid categories
const categories: TransactionCategory[] = [
  'food',
  'transport', 
  'shopping',
  'entertainment',
  'utilities',
  'health',
  'travel',
  'other',
];
```

**Available Types:**

| Type | Description |
|------|-------------|
| `Transaction` | Complete transaction entity |
| `TransactionCategory` | Union type of valid categories |
| `TransactionType` | 'income' or 'expense' |

### Calendar Types

Calendar and event types for scheduling.

```typescript
import type { CalendarEvent } from '@life/types';

const event: CalendarEvent = {
  id: 'uuid',
  title: 'Team Meeting',
  startDate: '2024-01-15T09:00:00Z',
  endDate: '2024-01-15T10:00:00Z',
  description: 'Weekly sync with the team',
  location: 'Conference Room A',
  isAllDay: false,
};
```

**Available Types:**

| Type | Description |
|------|-------------|
| `CalendarEvent` | Calendar event entity |

### API Types

Generic API response types for consistent responses.

```typescript
import type { ApiResponse, PaginationInfo } from '@life/types';

// Success response
const successResponse: ApiResponse<Transaction> = {
  success: true,
  data: transaction,
};

// Error response
const errorResponse: ApiResponse<never> = {
  success: false,
  error: 'Transaction not found',
};

// Paginated response
interface PaginatedTransactions {
  transactions: Transaction[];
  pagination: PaginationInfo;
}

const paginated: ApiResponse<PaginatedTransactions> = {
  success: true,
  data: {
    transactions: [],
    pagination: {
      page: 1,
      pageSize: 20,
      total: 150,
      hasMore: true,
    },
  },
};
```

**Available Types:**

| Type | Description |
|------|-------------|
| `ApiResponse<T>` | Generic API response wrapper |
| `PaginationInfo` | Pagination metadata |

### Theme Types

Theme and UI-related types.

```typescript
import type { ThemeMode, ActiveTheme } from '@life/types';

function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system');
  
  // ThemeMode can be: 'light' | 'dark' | 'system'
  // ActiveTheme is resolved to: 'light' | 'dark'
  
  const activeTheme: ActiveTheme = theme === 'system' 
    ? getSystemTheme() 
    : theme;
    
  return { theme, activeTheme, setTheme };
}
```

**Available Types:**

| Type | Description |
|------|-------------|
| `ThemeMode` | User's theme preference |
| `ActiveTheme` | Resolved active theme |

---

## 📄 Complete Type Reference

```typescript
// ============================================
// NAVIGATION TYPES
// ============================================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Calendar: undefined;
  Transactions: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  AddTransaction: undefined;
};

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  biometricEnabled: boolean;
}

// ============================================
// TRANSACTION TYPES
// ============================================

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptImage?: string;
  createdAt: string;
}

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'health'
  | 'travel'
  | 'other';

export type TransactionType = 'income' | 'expense';

// ============================================
// CALENDAR TYPES
// ============================================

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  isAllDay: boolean;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';
```

---

## 🔧 Development

### Adding New Types

1. Edit `src/index.ts`
2. Add your type definition with JSDoc comments
3. Run type check: `npm run check`
4. Commit with conventional commit: `git commit -m "types: add new entity types"`

### Type Check

```bash
# Run type checker
cd ../.. && npm run check -- packages/types

# Or from package directory
npm run check
```

### Linting

```bash
# Lint types
cd ../.. && npm run lint:biome -- packages/types

# Or from package directory
npm run lint
```

---

## 📚 Best Practices

### Use `type` vs `interface`

```typescript
// Use interface for objects that will be extended
export interface User {
  id: string;
  email: string;
}

// Use type for unions, tuples, and mapped types
export type ThemeMode = 'light' | 'dark' | 'system';

// Use type for complex type transformations
export type UserInput = Omit<User, 'id' | 'createdAt'>;
```

### Export Pattern

```typescript
// ✅ Good: Explicit exports in index.ts
export type { User } from './user';
export type { Transaction } from './transaction';

// ✅ Good: All types in single index.ts file (current approach)
export interface User { ... }
export interface Transaction { ... }
```

### Type Safety with API Calls

```typescript
import type { ApiResponse, Transaction } from '@life/types';

async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch('/api/transactions');
  const data: ApiResponse<Transaction[]> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data.data!;
}
```

---

## 🔗 Related Packages

| Package | Description |
|---------|-------------|
| `@life/native` | React Native mobile app |
| `@life/web` | React web application |
| `@life/api` | Fastify backend API |

---

## 🤝 Contributing

See [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for development guidelines.

---

## 📝 License

[MIT](../../LICENSE) © 2024 Life App Team
