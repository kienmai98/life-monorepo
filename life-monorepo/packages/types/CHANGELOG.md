# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-02-02

### Added

- **Complete Type System Overhaul**
  - Introduced branded types for type-safe identifiers (`UserId`, `TransactionId`, `EventId`, etc.)
  - Added `Result<T, E>` type for explicit error handling without exceptions
  - Implemented discriminated unions for API responses (`ApiResponse<T>`)
  - Added strict pagination types with cursor and offset support

- **New Type Modules**
  - `user.ts` - User profiles, preferences, authentication, and sessions
  - `transaction.ts` - Transactions, categories, budgets, and summaries
  - `calendar.ts` - Calendar events, attendees, reminders, and recurrence
  - `navigation.ts` - React Navigation param lists and route types

- **Runtime Validation with Zod**
  - Complete Zod schemas for all types
  - Email validation with regex
  - Password strength validation
  - Hex color validation
  - URL and date validation
  - Custom schema factories for generic types

- **Utility Functions**
  - Currency formatting (`formatCurrency`, `formatCompactNumber`, `parseCurrency`)
  - Date manipulation (`startOfDay`, `endOfDay`, `startOfMonth`, `endOfMonth`, `isSameDay`)
  - Transaction calculations (`calculateTotal`, `calculateNet`, `groupByCategory`, `groupByDate`)
  - Event filtering and sorting
  - Preference management (`getDefaultPreferences`, `mergeWithDefaultPreferences`)
  - Validation helpers (`isValidEmail`, `isValidUrl`, `isPositiveNumber`)

- **Type Guards**
  - `isUserId()`, `isUserRole()`, `isUserStatus()`, `isAuthProvider()`
  - `isTransactionType()`, `isTransactionCategory()`, `isTransactionStatus()`
  - `isPaymentMethod()`, `isIncomeCategory()`, `isExpenseCategory()`
  - `isEventType()`, `isEventPriority()`, `isEventStatus()`, `isCalendarView()`
  - Navigation route type guards

- **Strict TypeScript Configuration**
  - `strict: true` - All strict type-checking options enabled
  - `noImplicitAny: true` - No implicit any types
  - `strictNullChecks: true` - Strict null checking
  - `exactOptionalPropertyTypes: true` - Distinct undefined types
  - `noUncheckedIndexedAccess: true` - Safe array/object access
  - `strictFunctionTypes: true` - Strict function parameter checking

- **Documentation**
  - Comprehensive JSDoc comments on all types
  - Usage examples in type definitions
  - README with feature overview and usage examples
  - This changelog

- **Testing Infrastructure**
  - Vitest configuration for unit tests
  - Type safety tests
  - Schema validation tests
  - Utility function tests
  - Edge case coverage

- **Build System**
  - tsup configuration for ESM/CJS dual package
  - Type declaration generation
  - Source maps
  - Subpath exports for tree-shaking

### Changed

- Migrated from single `index.ts` to modular structure
- Renamed `Transaction.receiptImage` from optional to nullable
- Changed `Transaction.date` from string to Date type
- Updated all timestamp fields from string to Date type

### Removed

- N/A (initial release with new structure)

## Migration Guide

### From 0.0.1 to 0.1.0

1. **Update Imports**
   ```typescript
   // Before
   import type { User, Transaction } from '@life/types';
   
   // After (still works)
   import type { User, Transaction } from '@life/types';
   
   // New subpath imports for tree-shaking
   import type { User } from '@life/types';
   import { userSchema } from '@life/types/schemas';
   import { formatCurrency } from '@life/types/utils';
   ```

2. **Date Types**
   ```typescript
   // Before
   date: string;
   
   // After
   date: Date;
   ```

3. **Optional to Nullable**
   ```typescript
   // Before
   receiptImage?: string;
   
   // After
   receiptImage: string | null;
   ```

4. **Use Result Type for Error Handling**
   ```typescript
   // Before
   function parseData(data: unknown): Data {
     if (!isValid(data)) throw new Error('Invalid');
     return data;
   }
   
   // After
   import { Result, ok, err } from '@life/types';
   
   function parseData(data: unknown): Result<Data, Error> {
     if (!isValid(data)) return err(new Error('Invalid'));
     return ok(data);
   }
   ```

5. **Branded IDs**
   ```typescript
   // Before
   const userId: string = 'user_123';
   
   // After
   import type { UserId } from '@life/types';
   const userId = 'user_123' as UserId;
   ```
