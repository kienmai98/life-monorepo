# Naming Conventions for Life App

This document defines the standard naming conventions for all code in the Life monorepo. Consistency is key to maintainability.

---

## File Naming

### General Rules

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EventCard.tsx`, `MoneyChart.tsx` |
| Utilities | camelCase | `dateUtils.ts`, `formatCurrency.ts` |
| Hooks | camelCase with `use` prefix | `useCalendar.ts`, `useTransactions.ts` |
| Constants | camelCase or UPPER_SNAKE_CASE for true constants | `constants.ts`, `API_ENDPOINTS.ts` |
| Styles | kebab-case with `.module` suffix | `event-card.module.css` |
| Config files | kebab-case | `tsconfig.json`, `tailwind.config.js` |
| Test files | Same as source + `.test` or `.spec` | `EventCard.test.tsx` |
| Types/Interfaces | PascalCase with `.types` suffix (optional) | `calendar.types.ts` |

### Directory Structure

```
src/
├── components/           # React components
│   ├── ui/              # Primitive UI components (Button, Input)
│   ├── layout/          # Layout components (Header, Sidebar)
│   └── features/        # Feature-specific components
│       ├── schedule/    # Calendar/Schedule feature
│       ├── money/       # Money/Expenses feature
│       ├── notes/       # Notes feature
│       └── tasks/       # Tasks feature
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # Global TypeScript types
├── constants/           # Global constants
├── styles/              # Global styles
└── api/                 # API clients and services
```

---

## Component Naming

### React Components

**Rule:** Use PascalCase, descriptive nouns, avoid generic names.

```typescript
// ✅ Good
const EventCard = () => { }
const MoneyTransactionList = () => { }
const ScheduleCalendarView = () => { }

// ❌ Bad
const Card = () => { }           // Too generic
const eventCard = () => { }      // Should be PascalCase
const EC = () => { }             // Avoid abbreviations
const RenderEvents = () => { }   // Use noun, not verb
```

### Component File Structure

```typescript
// ComponentName.tsx
import React from 'react';
import { SomeType } from './types';

// Types specific to component (optional)
interface ComponentNameProps {
  title: string;
  onAction: () => void;
}

// Component
export const ComponentName: React.FC<ComponentNameProps> = ({ 
  title, 
  onAction 
}) => {
  return (
    // JSX
  );
};

// Default export (if preferred in project)
export default ComponentName;
```

---

## Function Naming

### General Functions

**Rule:** Use camelCase, start with a verb, be descriptive.

```typescript
// ✅ Good
const getUserById = (id: string) => { }
const formatCurrency = (amount: number) => { }
const calculateTotalExpenses = (transactions: Transaction[]) => { }
const isEventRecurring = (event: CalendarEvent) => { }

// ❌ Bad
const user = () => { }           // Not a verb
const getData = () => { }        // Too vague
const process = () => { }        // Too vague
const doSomething = () => { }    // Not descriptive
```

### Verb Conventions

| Verb | Use When | Example |
|------|----------|---------|
| `get` | Retrieve data (with possible side effects) | `getUserFromAPI()` |
| `fetch` | Retrieve data (async, from external source) | `fetchTransactions()` |
| `load` | Retrieve and prepare data | `loadCalendarEvents()` |
| `create` | Make something new | `createEvent()` |
| `add` | Add to existing collection | `addTransaction()` |
| `update` | Modify existing | `updateNote()` |
| `edit` | Open edit mode/UI | `editEvent()` |
| `delete` | Remove permanently | `deleteTask()` |
| `remove` | Remove from collection (not permanent) | `removeTag()` |
| `toggle` | Switch between two states | `toggleSidebar()` |
| `show`/`hide` | Control visibility | `showModal()` |
| `open`/`close` | Control open state | `openSettings()` |
| `handle` | Event handlers | `handleClick()` |
| `on` | Prop callbacks | `onSubmit`, `onChange` |
| `format` | Transform for display | `formatDate()` |
| `parse` | Transform from string | `parseAmount()` |
| `validate` | Check validity | `validateEmail()` |
| `is`/`has`/`can` | Boolean checks | `isValid()`, `hasPermission()` |
| `calculate`/`compute` | Derive value | `calculateTotal()` |

### Event Handlers

```typescript
// ✅ Good
const handleClick = () => { }
const handleSubmit = (event: FormEvent) => { }
const handleInputChange = (value: string) => { }

// In props
onClick={handleCardClick}
onSubmit={handleFormSubmit}

// ❌ Bad
const click = () => { }          // Not descriptive
const onClickHandler = () => { } // Redundant
const doClick = () => { }        // Not conventional
```

---

## Variable Naming

### General Variables

**Rule:** Use camelCase, be descriptive, avoid single letters (except common conventions).

```typescript
// ✅ Good
const currentUser = { }
const transactionList = [ ]
const isLoading = false
const eventDate = new Date()

// ❌ Bad
const u = { }                    // Too short
const data = [ ]                 // Too vague
const flag = false               # Not descriptive
const d = new Date()             # Use full name
```

### Boolean Variables

**Rule:** Use prefixes: `is`, `has`, `can`, `should`, `will`.

```typescript
// ✅ Good
const isVisible = true
const hasErrors = false
const canEdit = true
const shouldSync = false
const isDarkMode = true

// ❌ Bad
const visible = true             // Could be config object
const error = false              // Could be error object
const editing = true             // Ambiguous (is it an action?)
```

### Collection Variables

**Rule:** Use plural nouns or descriptive collection names.

```typescript
// ✅ Good
const events = [ ]
const transactionMap = new Map()
const userSet = new Set()
const eventCount = 5             // Number, not collection

// ❌ Bad
const eventList = [ ]            // events is clearer
const transactionArray = [ ]     // transactions is clearer
const userObj = { }              // user is clearer
```

### Common Abbreviations (Allowed)

| Full | Abbreviation | Context |
|------|--------------|---------|
| identifier | `id` | Always |
| property | `prop`, `props` | React |
| properties | `props` | React |
| argument | `arg` | Function params |
| arguments | `args` | Function params |
| parameter | `param` | Documentation |
| parameters | `params` | URLs, functions |
| request | `req` | HTTP/Express |
| response | `res`, `resp` | HTTP/Express |
| error | `err` | Catch blocks |
| event | `e`, `evt` | Event handlers |
| reference | `ref` | React refs |
| component | `comp` | Rarely, prefer full |

---

## Constant Naming

### True Constants

**Rule:** Use UPPER_SNAKE_CASE for values that never change.

```typescript
// ✅ Good - In a constants file
export const API_BASE_URL = 'https://api.life.app';
export const MAX_EVENT_DURATION_DAYS = 365;
export const DEFAULT_CURRENCY = 'USD';
export const SYNC_INTERVAL_MS = 30000;

// ❌ Bad
const apiUrl = '...'             // Should be UPPER_SNAKE
const maxDays = 365              // Should be UPPER_SNAKE
```

### Configuration Constants

```typescript
// config/constants.ts
export const APP_CONFIG = {
  NAME: 'Life',
  VERSION: '1.0.0',
  DEFAULT_THEME: 'monochrome',
} as const;

export const ROUTES = {
  HOME: '/',
  SCHEDULE: '/schedule',
  MONEY: '/money',
  NOTES: '/notes',
  TASKS: '/tasks',
  SETTINGS: '/settings',
} as const;

export const STORAGE_KEYS = {
  USER: 'life_user',
  TOKEN: 'life_token',
  THEME: 'life_theme',
} as const;
```

### Enum-Style Constants

```typescript
// ✅ Using const assertion
export const TransactionType = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer',
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

// ✅ Using TypeScript enum
export enum CalendarView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
```

---

## Type/Interface Naming

### TypeScript Types

**Rule:** Use PascalCase, descriptive, suffix with type purpose when ambiguous.

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

type EventHandler = (event: CalendarEvent) => void;

type AsyncResult<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

// ❌ Bad
interface user { }               // Should be PascalCase
interface ICalendarEvent { }     # Don't prefix with I
interface EventData { }          // Redundant suffix
```

### Interface vs Type

```typescript
// Use interface for object shapes that may be extended
interface ComponentProps {
  title: string;
}

interface ButtonProps extends ComponentProps {
  onClick: () => void;
}

// Use type for unions, tuples, or complex types
type Status = 'idle' | 'loading' | 'success' | 'error';
type Point = [number, number];
type Callback<T> = (result: T) => void;
```

### Props Interfaces

```typescript
// ComponentName.tsx
interface EventCardProps {
  event: CalendarEvent;
  isCompact?: boolean;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

// Use destructuring in component
const EventCard: React.FC<EventCardProps> = ({
  event,
  isCompact = false,
  onEdit,
  onDelete,
}) => { };
```

---

## CSS Class Naming

### BEM Methodology (Block Element Modifier)

**Rule:** Use BEM for CSS class names to ensure specificity and clarity.

```css
/* Block */
.event-card { }

/* Element */
.event-card__title { }
.event-card__date { }
.event-card__actions { }

/* Modifier */
.event-card--compact { }
.event-card--selected { }
.event-card--disabled { }

/* Combined */
.event-card--compact .event-card__title { }
```

### CSS Modules with BEM

```typescript
// EventCard.module.css
.event-card {
  border: 1px solid var(--color-border);
}

.event-card__title {
  font-weight: 500;
}

.event-card--compact {
  padding: 0.5rem;
}

// EventCard.tsx
import styles from './EventCard.module.css';

const EventCard = () => (
  <div className={styles['event-card']}>
    <h3 className={styles['event-card__title']}>Title</h3>
  </div>
);
```

### Tailwind CSS (Alternative)

When using Tailwind, prefer semantic class grouping with `clsx` or `classnames`:

```typescript
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
}) => {
  const className = clsx(
    // Base styles
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors focus-visible:outline-none',
    
    // Size variants
    size === 'sm' && 'h-8 px-3 text-sm',
    size === 'md' && 'h-10 px-4 text-base',
    size === 'lg' && 'h-12 px-6 text-lg',
    
    // Color variants
    variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
    variant === 'secondary' && 'bg-gray-100 text-black hover:bg-gray-200',
    variant === 'ghost' && 'bg-transparent hover:bg-gray-100',
    
    // States
    isLoading && 'opacity-50 cursor-not-allowed'
  );
  
  return <button className={className}>...</button>;
};
```

### CSS Custom Properties (Variables)

```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  
  /* Semantic colors */
  --color-background: var(--color-white);
  --color-text: var(--color-black);
  --color-text-muted: var(--color-gray-500);
  --color-border: var(--color-gray-200);
  --color-border-strong: var(--color-gray-400);
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, monospace;
  
  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

---

## Quick Reference

| Category | Convention | Example |
|----------|------------|---------|
| React Components | PascalCase | `EventCard.tsx` |
| Component Props | PascalCase + Props | `EventCardProps` |
| Functions | camelCase + verb | `getEvents()` |
| Variables | camelCase | `eventList` |
| Booleans | camelCase + prefix | `isLoading` |
| Constants | UPPER_SNAKE_CASE | `API_URL` |
| Types/Interfaces | PascalCase | `CalendarEvent` |
| CSS Classes | kebab-case BEM | `event-card__title` |
| Files (utils) | camelCase | `dateUtils.ts` |
| Files (styles) | kebab-case | `event-card.module.css` |

---

## Examples by Feature

### Schedule Feature

```typescript
// File: components/features/schedule/EventCard.tsx

interface EventCardProps {
  event: CalendarEvent;
  isCompact?: boolean;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isCompact = false,
  onEdit,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleEditClick = useCallback(() => {
    onEdit(event);
  }, [event, onEdit]);
  
  const formattedDate = useMemo(() => {
    return formatEventDate(event.startDate);
  }, [event.startDate]);
  
  return (
    <div className={styles['event-card']}>
      <span className={styles['event-card__date']}>{formattedDate}</span>
      <h3 className={styles['event-card__title']}>{event.title}</h3>
    </div>
  );
};
```

### Money Feature

```typescript
// File: components/features/money/TransactionList.tsx

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  hasMore,
  onLoadMore,
}) => {
  const totalAmount = useMemo(() => {
    return calculateTotalAmount(transactions);
  }, [transactions]);
  
  if (isLoading && transactions.length === 0) {
    return <TransactionListSkeleton />;
  }
  
  return (
    <div className={styles['transaction-list']}>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
      {hasMore && <LoadMoreButton onClick={onLoadMore} />}
    </div>
  );
};
```

### Custom Hook

```typescript
// File: hooks/useSchedule.ts

interface UseScheduleOptions {
  startDate: Date;
  endDate: Date;
}

interface UseScheduleResult {
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useSchedule = (options: UseScheduleOptions): UseScheduleResult => {
  const { startDate, endDate } = options;
  
  const query = useQuery({
    queryKey: ['schedule', startDate, endDate],
    queryFn: () => fetchEvents({ startDate, endDate }),
  });
  
  return {
    events: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
```
