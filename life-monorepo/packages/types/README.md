# @life/types

Shared TypeScript types, schemas, and utilities for the Life app monorepo.

## Features

- **Complete Type Coverage** - Comprehensive types for all domains
- **Runtime Validation** - Zod schemas for type-safe data validation
- **Strict Null Checks** - No implicit null/undefined
- **Branded Types** - Type-safe IDs and identifiers
- **Utility Functions** - Helper functions for common operations
- **Full Documentation** - JSDoc comments with examples

## Installation

```bash
npm install @life/types
```

## Usage

### Basic Types

```typescript
import type { User, Transaction, CalendarEvent } from '@life/types';

const user: User = {
  id: 'user_123',
  email: 'user@example.com',
  // ... other fields
};
```

### Runtime Validation

```typescript
import { userSchema, transactionSchema } from '@life/types/schemas';

const result = userSchema.safeParse(unknownData);
if (result.success) {
  console.log(result.data); // Typed as User
} else {
  console.error(result.error);
}
```

### Utility Functions

```typescript
import { formatCurrency, calculateTotal } from '@life/types/utils';

const total = calculateTotal(transactions);
const formatted = formatCurrency(total, 'USD');
```

## Type Safety Features

### Branded Types

```typescript
import type { UserId, TransactionId } from '@life/types';

// These are not interchangeable at compile time
const userId: UserId = 'user_123' as UserId;
const transactionId: TransactionId = 'txn_456' as TransactionId;
```

### Result Type

```typescript
import type { Result } from '@life/types';
import { ok, err } from '@life/types';

function divide(a: number, b: number): Result<number, Error> {
  if (b === 0) {
    return err(new Error('Cannot divide by zero'));
  }
  return ok(a / b);
}
```

### Discriminated Unions

```typescript
import type { ApiResponse } from '@life/types';

const response: ApiResponse<User> = await fetchUser(id);

if (response.success) {
  // TypeScript knows response.data is User
  console.log(response.data.email);
} else {
  // TypeScript knows response.error is ApiError
  console.error(response.error.message);
}
```

## Package Structure

```
packages/types/
├── src/
│   ├── index.ts          # Core types and utilities
│   ├── types/
│   │   ├── index.ts      # Type exports
│   │   ├── user.ts       # User-related types
│   │   ├── transaction.ts # Transaction types
│   │   ├── calendar.ts   # Calendar event types
│   │   └── navigation.ts # Navigation types
│   ├── schemas/
│   │   └── index.ts      # Zod validation schemas
│   └── utils/
│       └── index.ts      # Utility functions
├── tests/
│   ├── types.test.ts     # Type and schema tests
│   └── utils.test.ts     # Utility function tests
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── vitest.config.ts      # Test configuration
```

## Scripts

```bash
# Build the package
npm run build

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

## TypeScript Configuration

This package uses strict TypeScript settings:

- `strict: true` - All strict type-checking options
- `noImplicitAny: true` - No implicit any types
- `strictNullChecks: true` - Strict null and undefined checking
- `exactOptionalPropertyTypes: true` - Distinct types for undefined and optional
- `noUncheckedIndexedAccess: true` - undefined for unindexed properties

## Contributing

When adding new types:

1. Add types to the appropriate file in `src/types/`
2. Add corresponding Zod schemas in `src/schemas/`
3. Add utility functions in `src/utils/` if needed
4. Add comprehensive JSDoc comments
5. Add tests in `tests/`
6. Update this README with examples

## License

MIT
