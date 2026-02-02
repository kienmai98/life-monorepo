# Life App

A React Native application for managing your schedule and spending. Built with modern best practices for scalability, performance, and maintainability.

## Features

- **Authentication**: Email/Password, Google Sign-In, Apple Sign-In, Biometric Authentication
- **Expense Tracking**: Manual transaction entry with categories, receipts, and location
- **Schedule Management**: Google Calendar integration
- **Dashboard**: Overview of finances and schedule
- **Push Notifications**: Firebase Cloud Messaging
- **Offline Support**: Background sync with AsyncStorage
- **Dark Mode**: Full theming support
- **Responsive Design**: Works on phones and tablets

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.83+ |
| Language | TypeScript 5.8+ |
| Navigation | React Navigation v7 |
| State Management | Zustand with persistence |
| UI Components | React Native Paper |
| Animations | React Native Reanimated |
| Backend | Firebase (Auth, Firestore, Messaging) + Supabase |
| Storage | AsyncStorage |
| Testing | Jest + React Native Testing Library |

## Project Structure

```
src/
├── features/               # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── api/           # API clients
│   │   ├── screens/       # Screen components
│   │   ├── stores/        # Zustand stores with selectors
│   │   └── index.ts       # Public exports
│   ├── transactions/      # Transaction management
│   ├── calendar/          # Calendar integration
│   ├── dashboard/         # Dashboard overview
│   └── profile/           # User profile
├── navigation/            # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── index.ts
├── shared/                # Shared resources
│   ├── components/        # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Skeleton.tsx
│   │   ├── CardSkeleton.tsx
│   │   └── TransactionSkeleton.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAsync.ts
│   │   ├── useDebounce.ts
│   │   ├── useErrorBoundary.ts
│   │   ├── useIsMounted.ts
│   │   ├── useLoadingState.ts
│   │   ├── usePrevious.ts
│   │   ├── useResponsive.ts
│   │   ├── useSecureStorage.ts
│   │   ├── useThemeMode.ts
│   │   ├── useThrottle.ts
│   │   └── useToggle.ts
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   │   ├── helpers.ts
│   │   ├── api.ts
│   │   └── storage.ts
│   └── test-utils.tsx     # Test utilities
└── App.tsx               # App entry point
```

## Architecture Principles

### 1. Feature-Based Organization

Code is organized by feature rather than by type. Each feature contains:
- **API**: External service communication
- **Screens**: UI components
- **Stores**: State management with Zustand
- **Types**: Feature-specific TypeScript definitions

### 2. Performance Optimization

**Selectors for State Management:**
```typescript
// ❌ Bad: Subscribes to entire store
const { transactions } = useTransactionStore();

// ✅ Good: Only subscribes to specific data
const transactions = useTransactionStore(selectTransactions);
const isLoading = useTransactionStore(selectIsLoading);
```

**Memoization:**
```typescript
// Use React.memo for pure components
const TransactionCard = React.memo(({ transaction }) => {
  return <Card>...</Card>;
});

// Use useMemo for expensive computations
const filteredTransactions = useMemo(() => {
  return transactions.filter(t => t.amount > 100);
}, [transactions]);

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  navigation.navigate('Detail', { id });
}, [navigation, id]);
```

**FlatList Optimization:**
```typescript
<FlatList
  data={transactions}
  keyExtractor={(item) => item.id}
  renderItem={renderTransaction}
  getItemLayout={(data, index) => ({
    length: 80,
    offset: 80 * index,
    index,
  })}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
/>
```

### 3. Error Handling

**Error Boundaries:**
```typescript
<ErrorBoundary
  onError={(error, errorInfo) => logError(error)}
>
  <AppNavigator />
</ErrorBoundary>
```

**Async Error Handling:**
```typescript
const { error, hasError, withErrorHandling } = useErrorBoundary();

const handleSubmit = withErrorHandling(async (data) => {
  await saveTransaction(data);
});
```

### 4. Custom Hooks

Reusable logic extracted into custom hooks:

| Hook | Purpose |
|------|---------|
| `useAsync` | Async operations with loading/error states |
| `useDebounce` | Debounce function calls |
| `useErrorBoundary` | Component-level error handling |
| `useLoadingState` | Loading state with minimum duration |
| `useResponsive` | Responsive breakpoint detection |
| `useSecureStorage` | Persist state to storage |
| `useThemeMode` | Theme mode with system preference |
| `useThrottle` | Throttle function calls |
| `useToggle` | Simple boolean state toggle |

### 5. State Management

**Zustand Store Pattern:**
```typescript
export const useStore = create<StoreType>()(
  persist(
    (set, get) => ({
      // State
      data: [],
      isLoading: false,
      
      // Actions
      setData: (data) => set({ data }),
      
      // Selectors (computed values)
      getFilteredData: () => {
        const { data, filter } = get();
        return data.filter(...);
      },
    }),
    {
      name: 'store-name',
      partialize: (state) => ({ data: state.data }),
    }
  )
);

// Selectors for performance
export const selectData = (state: StoreType) => state.data;
export const selectIsLoading = (state: StoreType) => state.isLoading;
```

### 6. Responsive Design

```typescript
const { width, isTablet, getResponsiveValue } = useResponsive();

// Responsive values
const padding = getResponsiveValue({
  sm: 16,
  md: 24,
  lg: 32,
  default: 16,
});

// Conditional rendering
if (isTablet) {
  return <TabletLayout />;
}
```

### 7. Testing Strategy

**Unit Tests:**
```typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});
```

**Component Tests:**
```typescript
it('renders transaction details', () => {
  const { getByText } = render(
    <TransactionCard transaction={mockTransaction} />
  );
  expect(getByText('Grocery shopping')).toBeTruthy();
});
```

**Hook Tests:**
```typescript
it('debounces function calls', async () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 100);
  
  debounced();
  debounced();
  debounced();
  
  expect(fn).not.toHaveBeenCalled();
  
  await wait(150);
  expect(fn).toHaveBeenCalledTimes(1);
});
```

## Getting Started

### Prerequisites

- Node.js >= 20
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- Firebase project
- Supabase project

### Installation

```bash
# Clone repository
git clone https://github.com/kienmai98/Life.git
cd Life

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Environment setup
cp .env.example .env
# Edit .env with your configuration
```

### Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Metro bundler
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Environment Variables

```bash
# Firebase
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_key

# Google Sign-In
GOOGLE_WEB_CLIENT_ID=your_client_id
GOOGLE_IOS_CLIENT_ID=your_client_id
```

## Performance Checklist

- [ ] Use selectors for Zustand store subscriptions
- [ ] Wrap components with React.memo when appropriate
- [ ] Use useMemo for expensive computations
- [ ] Use useCallback for event handlers passed to children
- [ ] Optimize FlatList with getItemLayout, maxToRenderPerBatch
- [ ] Use removeClippedSubviews for long lists
- [ ] Implement proper loading skeletons
- [ ] Lazy load screens with React.lazy
- [ ] Use Hermes engine for smaller bundle size

## Security Considerations

- Store sensitive tokens in secure storage (Keychain/Keystore)
- Never commit `.env` files
- Validate all user input
- Use parameterized queries for database operations
- Implement proper session management
- Enable certificate pinning for API calls

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Documentation

- [Architecture Decision Records](./docs/adr/)
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)

## License

MIT

## Support

For support, email support@life-app.example.com or open an issue on GitHub.
