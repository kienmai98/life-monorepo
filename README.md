# Life Monorepo

A Turbo Repo-powered monorepo for the Life app ecosystem containing:
- **Native App** (React Native) - iOS/Android mobile app
- **Web App** (React + Vite) - Web preview and admin dashboard
- **API** (Fastify + TypeScript) - Backend services
- **Shared Packages** - Common types and utilities

## 🏗️ Architecture

```
life-monorepo/
├── apps/
│   ├── native/          # React Native mobile app
│   ├── web/             # React web preview
│   └── api/             # Fastify backend API
├── packages/
│   ├── types/           # Shared TypeScript types
│   └── config/          # Shared configurations
├── biome.json           # BiomeJS linting/formatting config
└── turbo.json           # Turbo Repo pipeline config
```

## 🚀 Quick Start

```bash
# Install dependencies (uses npm workspaces)
npm install

# Run all apps in dev mode
npm run dev

# Run individual apps
cd apps/native && npm run ios      # iOS simulator
cd apps/web && npm run dev         # Web dev server (port 3000)
cd apps/api && npm run dev         # API server (port 3001)
```

## 📦 Apps

### @life/native
React Native mobile app with:
- Calendar integration
- Expense tracking
- Biometric authentication
- Offline support

### @life/web
React web preview with:
- Mobile-first responsive design
- Real-time sync with native app
- Admin dashboard

### @life/api
Fastify backend with:
- RESTful API
- JWT authentication
- Supabase integration
- OpenAPI documentation

## 🛠️ Development

### Linting & Formatting (BiomeJS)

```bash
# Lint all packages
npm run lint

# Check all packages
npm run check

# Format all packages
npm run format

# Run on specific package
npm run lint:biome -- apps/native
```

### Build

```bash
# Build all apps
npm run build

# Build specific app
cd apps/web && npm run build
```

### Testing

```bash
# Run all tests
npm run test

# Run tests for specific app
cd apps/native && npm test
```

## 📝 Code Style

We use **BiomeJS** instead of ESLint + Prettier for:
- Faster execution (Rust-based)
- Unified linting and formatting
- Better TypeScript support
- Simpler configuration

Configuration in `biome.json`:
- 2-space indentation
- Single quotes
- Semicolons required
- 100 character line width

## 🔄 Workflows

### Turborepo Pipeline

| Command | Description |
|---------|-------------|
| `dev` | Start all apps in development mode |
| `build` | Build all apps for production |
| `lint` | Lint all packages |
| `check` | Type check all packages |
| `test` | Run tests for all packages |

### Remote Caching (optional)

```bash
# Login to Vercel for remote caching
npx turbo login
npx turbo link
```

## 🌿 Environment Variables

Each app has its own `.env` file:

- `apps/native/.env` - Firebase, API keys
- `apps/web/.env` - API URL, feature flags
- `apps/api/.env` - Database, JWT secrets

## 📚 Documentation

- [Native App](./apps/native/README.md)
- [Web App](./apps/web/README.md)
- [API](./apps/api/README.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run `npm run check` to verify
4. Commit and push
5. Create PR

## 📄 License

MIT
