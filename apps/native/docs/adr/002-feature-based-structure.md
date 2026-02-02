# ADR 002: Feature-Based Project Structure

## Status

**Accepted**

## Context

We needed to decide on a project structure that would:
- Scale as the app grows
- Make code discoverable
- Support team collaboration
- Enable code splitting

### Options Considered

1. **Type-Based**: Organize by file type (components/, screens/, utils/)
2. **Feature-Based**: Organize by feature (auth/, transactions/, calendar/)
3. **Domain-Based**: Hybrid approach

## Decision

We will use a **Feature-Based** project structure with a shared folder for common code.

### Structure

```
src/
├── features/           # Feature modules
│   ├── auth/
│   ├── transactions/
│   ├── calendar/
│   ├── dashboard/
│   └── profile/
├── navigation/         # Navigation configuration
├── shared/            # Shared resources
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── App.tsx
```

### Feature Module Structure

Each feature contains:
```
feature/
├── api/               # API clients
├── screens/           # Screen components
├── stores/            # State management
├── components/        # Feature-specific components
├── types/             # Feature types
└── index.ts           # Public API
```

## Consequences

### Positive
- Clear ownership of features
- Easier to understand codebase
- Supports parallel development
- Enables code splitting by feature
- Natural boundaries for testing

### Negative
- Duplication of some utility functions possible
- Need discipline to not create circular dependencies
- More folders to navigate

### Mitigations
- Establish clear dependency rules
- Regular code reviews
- Automated dependency checking
