# 🤝 Contributing to Life

Thank you for your interest in contributing to Life! This document provides guidelines and workflows for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Release Process](#release-process)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Installation |
|------|---------|--------------|
| Node.js | >= 20.0.0 | [nvm](https://github.com/nvm-sh/nvm) recommended |
| Git | Latest | System package manager |
| npm | >= 10.0.0 | Included with Node.js |

### Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/life-monorepo.git
cd life-monorepo

# Add upstream remote
git remote add upstream https://github.com/kienmai98/life-monorepo.git

# Install dependencies
npm install
```

### Verify Setup

```bash
# Run type check across all packages
npm run check

# Run linter
npm run lint

# Run tests
npm run test
```

---

## Development Workflow

### 1. Create a Branch

```bash
# Fetch latest from upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create your feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes:
git checkout -b fix/bug-description
```

### 2. Make Changes

Work on your changes following the project structure:

```
life-monorepo/
├── apps/
│   ├── native/          # React Native changes
│   ├── web/             # Web app changes
│   └── api/             # API changes
├── packages/
│   └── types/           # Shared type changes
└── docs/                # Documentation changes
```

### 3. Test Your Changes

```bash
# Run all checks
npm run check
npm run lint
npm run test

# Run checks on specific package
cd apps/api && npm run check
cd apps/native && npm run lint
```

### 4. Commit Your Changes

Follow our [commit conventions](#commit-conventions).

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history and automated changelog generation.

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Code style changes (formatting, semicolons, etc) |
| `refactor` | Code refactoring without feature changes |
| `perf` | Performance improvements |
| `test` | Adding or correcting tests |
| `chore` | Build process or auxiliary tool changes |
| `ci` | CI/CD changes |
| `types` | TypeScript type changes |

### Scopes

| Scope | Description |
|-------|-------------|
| `native` | Mobile app changes |
| `web` | Web app changes |
| `api` | API server changes |
| `types` | Shared types changes |
| `*` | Changes affecting multiple scopes |

### Examples

```bash
# Feature
git commit -m "feat(native): add biometric authentication"

# Bug fix
git commit -m "fix(api): resolve JWT token expiration issue"

# Documentation
git commit -m "docs: update API endpoint documentation"

# Type changes
git commit -m "types: add CalendarEvent interface"

# Refactoring
git commit -m "refactor(web): simplify dashboard component"

# Breaking change
git commit -m "feat(api)!: change response format for /transactions

BREAKING CHANGE: response now wraps data in 'data' property"
```

### Commit Body Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Reference issues and PRs liberally after the first line
- Consider starting with a verb

---

## Pull Request Process

### Before Submitting

- [ ] Branch is up to date with `main`
- [ ] All checks pass (`npm run check`)
- [ ] Code is linted (`npm run lint`)
- [ ] Tests pass (`npm run test`)
- [ ] Commits follow convention
- [ ] PR template is filled out

### PR Title Format

```
<type>(<scope>): <description>
```

Examples:
- `feat(native): implement Face ID authentication`
- `fix(api): handle null values in transaction list`
- `docs: add deployment guide`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. **Automated Checks**: CI must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: Verify changes work as expected
4. **Merge**: Maintainers will squash and merge

---

## Code Style

### BiomeJS Configuration

We use **BiomeJS** for unified linting and formatting:

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingComma": "es5",
      "semicolons": "always"
    }
  }
}
```

### TypeScript Guidelines

#### Naming Conventions

```typescript
// ✅ PascalCase for types, interfaces, enums
interface UserProfile { }
type ApiResponse = { }
enum StatusCode { }

// ✅ camelCase for variables, functions
const userName = 'John';
function getUserData() { }

// ✅ UPPER_SNAKE_CASE for constants
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// ✅ PascalCase for React components
function UserCard() { }
```

#### Type Safety

```typescript
// ✅ Use explicit return types for functions
function calculateTotal(items: Transaction[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

// ✅ Use type guards
function isTransaction(obj: unknown): obj is Transaction {
  return obj !== null && typeof obj === 'object' && 'amount' in obj;
}

// ✅ Avoid 'any', use 'unknown' instead
function processData(data: unknown): void {
  if (isTransaction(data)) {
    // Safe to use as Transaction
  }
}

// ✅ Use readonly when possible
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}
```

#### React Guidelines

```typescript
// ✅ Use functional components with hooks
function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    loadUser(userId);
  }, [userId]);
  
  return <View>{user?.name}</View>;
}

// ✅ Memoize expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.amount > 100);
}, [items]);

// ✅ Use selectors for Zustand
const user = useAuthStore(selectUser);  // ✅ Good
const { user } = useAuthStore();        // ❌ Subscribes to entire store

// ✅ Define prop interfaces
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

#### File Organization

```typescript
// 1. Imports (external first, then internal)
import React from 'react';
import { View } from 'react-native';

import { useAuthStore } from '../stores/authStore';
import type { User } from '@life/types';

// 2. Types/Interfaces
interface Props { }

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Component/Function
export function MyComponent({ }: Props) {
  // Implementation
}

// 5. Helper functions
function helper() { }

// 6. Exports
export { helper };
```

### Code Quality Checklist

Before committing, ensure:

- [ ] No `console.log` statements (use proper logging)
- [ ] No `any` types without justification
- [ ] All functions have return types
- [ ] All parameters have types
- [ ] No unused imports or variables
- [ ] Proper error handling
- [ ] Async functions handle errors

---

## Testing

### Test File Locations

```
apps/native/
├── src/
│   └── utils/
│       └── __tests__/
│           └── helpers.test.ts

apps/api/
├── tests/
│   ├── auth.test.ts
│   └── transactions.test.ts
```

### Writing Tests

```typescript
// Unit test example
import { describe, it, expect } from 'vitest';
import { formatCurrency } from './helpers';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
  
  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
  
  it('handles negative values', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd apps/api && npm run test

# Run with coverage
npm run test -- --coverage

# Run in watch mode
npm run test -- --watch
```

### Test Coverage Requirements

| Package | Minimum Coverage |
|---------|------------------|
| `apps/api` | 70% |
| `apps/web` | 60% |
| `apps/native` | 50% |
| `packages/*` | 80% |

---

## Monorepo Guidelines

### Adding Dependencies

```bash
# Root dependency (dev tools, shared)
npm install -D husky

# App-specific dependency
npm install axios -w @life/api

# Add shared types as dependency
npm install @life/types -w @life/native
```

### Workspace Commands

```bash
# Run command in all workspaces
npm run build

# Run command in specific workspace
npm run build --workspace=@life/api

# Run dev for all apps
npm run dev
```

### Creating New Packages

```bash
# Create new package directory
mkdir packages/new-package
cd packages/new-package

# Initialize package.json
npm init -y

# Update name
# "name": "@life/new-package"

# Add to root package.json workspaces
```

---

## Documentation

### Code Documentation

```typescript
/**
 * Calculates the total amount from an array of transactions.
 * 
 * @param transactions - Array of transaction objects
 * @param filterExpense - If true, only include expenses
 * @returns The calculated total amount
 * @throws Will throw if transactions is not an array
 * 
 * @example
 * ```typescript
 * const total = calculateTotal(transactions, true);
 * console.log(total); // 1234.56
 * ```
 */
function calculateTotal(
  transactions: Transaction[],
  filterExpense = false
): number {
  // Implementation
}
```

### README Updates

When adding features:

- Update relevant README.md files
- Add examples for new APIs
- Update architecture diagrams if structure changes

---

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes

### Release Checklist

- [ ] All tests passing
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Git tag created
- [ ] GitHub release drafted

---

## Getting Help

- 💬 [GitHub Discussions](https://github.com/kienmai98/life-monorepo/discussions)
- 🐛 [GitHub Issues](https://github.com/kienmai98/life-monorepo/issues)
- 📧 Email: support@life-app.example.com

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to the core team for sustained contributions

---

Thank you for contributing to Life! 🎉
