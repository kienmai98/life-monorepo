# 🌟 Life Monorepo

A modern, full-stack application ecosystem for personal life management — built with cutting-edge technologies and best practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.83+-61DAFB?logo=react)](https://reactnative.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5.0+-000000?logo=fastify)](https://www.fastify.io/)
[![Turbo](https://img.shields.io/badge/Turborepo-2.0+-EF4444?logo=turborepo)](https://turbo.build/)
[![Biome](https://img.shields.io/badge/Biome-1.5+-60A5FA?logo=biome)](https://biomejs.dev/)

---

## 📋 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           🌐 CLIENT LAYER                                    │
├─────────────────────────────────┬───────────────────────────────────────────┤
│      📱 Mobile (iOS/Android)    │         🖥️ Web (Desktop/Mobile)            │
│                                 │                                           │
│  ┌─────────────────────────┐   │   ┌─────────────────────────────────┐     │
│  │    React Native 0.83+   │   │   │      React 18 + Vite 5          │     │
│  │  • Calendar Integration │   │   │  • Responsive Design            │     │
│  │  • Expense Tracking     │   │   │  • Real-time Sync               │     │
│  │  • Biometric Auth       │   │   │  • Admin Dashboard              │     │
│  │  • Offline Support      │   │   │                                 │     │
│  └───────────┬─────────────┘   │   └───────────────┬─────────────────┘     │
└──────────────┼─────────────────┴───────────────────┼───────────────────────┘
               │                                     │
               │      HTTPS / WebSocket              │
               └─────────────────┬───────────────────┘
                                 │
┌────────────────────────────────┼────────────────────────────────────────────┐
│                        🔧 API LAYER (Fastify)                              │
│                              Port 3001                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                     Fastify 5.0 + TypeScript                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Auth      │  │Transactions │  │  Calendar   │  │   Health    │  │  │
│  │  │   Routes    │  │   Routes    │  │   Routes    │  │   Routes    │  │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────────────┘  │  │
│  │         └─────────────────┼─────────────────┘                         │  │
│  │                           │                                           │  │
│  │                   ┌───────┴───────┐                                   │  │
│  │                   │  JWT Middleware │                                 │  │
│  │                   └───────┬───────┘                                   │  │
│  └───────────────────────────┼───────────────────────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                         💾 DATA LAYER                                       │
├──────────────────────────────────┬─────────────────────────────────────────┤
│         🔥 Firebase              │         🐘 Supabase                     │
│  ┌────────────────────────────┐  │  ┌─────────────────────────────────┐   │
│  │  • Authentication          │  │  │  • PostgreSQL Database          │   │
│  │  • Firestore (NoSQL)       │  │  │  • Real-time Subscriptions      │   │
│  │  • Cloud Messaging         │  │  │  • Row Level Security           │   │
│  │  • Analytics               │  │  │  • Storage Buckets              │   │
│  └────────────────────────────┘  │  └─────────────────────────────────┘   │
└──────────────────────────────────┴─────────────────────────────────────────┘
```

### Data Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│  Client │────▶│   API   │────▶│  Auth   │────▶│Database │
│ Action  │     │   App   │     │ Server  │     │ Check   │     │  Store  │
└─────────┘     └─────────┘     └────┬────┘     └─────────┘     └────┬────┘
                                     │                               │
                                     │◀──────────────────────────────┘
                                     │        Response/Data
                              ┌──────┴──────┐
                              │ State Update │
                              │  (Zustand)  │
                              └──────┬──────┘
                                     │
                              ┌──────┴──────┐
                              │  UI Rerender │
                              │ (React/RN)  │
                              └─────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 20.0.0 | LTS recommended |
| npm | >= 10.0.0 | Included with Node.js |
| Xcode | >= 15.0 | For iOS development (macOS only) |
| Android Studio | Latest | For Android development |
| Firebase CLI | Latest | For Firebase services |

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/kienmai98/life-monorepo.git
cd life-monorepo

# Install all dependencies (uses npm workspaces)
npm install
```

### 2. Environment Setup

```bash
# Copy environment templates
cp apps/native/.env.example apps/native/.env
cp apps/api/.env.example apps/api/.env 2>/dev/null || echo "Create apps/api/.env manually"
cp apps/web/.env.example apps/web/.env 2>/dev/null || echo "Create apps/web/.env manually"

# Edit each .env file with your configuration
```

### 3. Run All Apps (Development)

```bash
# Start all apps simultaneously with Turbo
npm run dev
```

### 4. Run Individual Apps

```bash
# 📱 Mobile App (iOS)
cd apps/native
npm run ios

# 📱 Mobile App (Android)
cd apps/native
npm run android

# 🖥️ Web App
cd apps/web
npm run dev          # http://localhost:5173

# 🔧 API Server
cd apps/api
npm run dev          # http://localhost:3001
```

---

## 📁 Project Structure

```
life-monorepo/
├── 📱 apps/
│   ├── native/                 # React Native mobile app
│   │   ├── ios/               # iOS native project
│   │   ├── android/           # Android native project
│   │   ├── src/               # TypeScript source code
│   │   │   ├── features/      # Feature-based modules
│   │   │   ├── navigation/    # Navigation configuration
│   │   │   └── shared/        # Shared components & utilities
│   │   ├── .env.example       # Environment template
│   │   └── package.json
│   │
│   ├── web/                    # React web application
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── pages/         # Page components
│   │   │   └── stores/        # Zustand stores
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── api/                    # Fastify backend API
│       ├── src/
│       │   ├── routes/        # API route handlers
│       │   ├── middleware/    # Custom middleware
│       │   └── utils/         # Utility functions
│       └── tests/             # API tests
│
├── 📦 packages/
│   └── types/                  # Shared TypeScript types
│       └── src/
│           └── index.ts       # Type exports
│
├── 📚 docs/
│   ├── ARCHITECTURE.md        # System architecture details
│   └── CONTRIBUTING.md        # Contribution guidelines
│
├── 🛠️ Configuration Files
│   ├── biome.json             # BiomeJS linting & formatting
│   ├── turbo.json             # Turborepo pipeline
│   ├── package.json           # Root workspace config
│   └── tsconfig.json          # TypeScript base config
│
└── README.md                   # This file
```

---

## 🛠️ Development Workflow

### Understanding npm Workspaces

This monorepo uses **npm workspaces** for dependency management:

```bash
# Install a dependency for all packages
npm install lodash

# Install a dependency for specific app
npm install axios -w @life/api

# Install a dependency for dev (root only)
npm install -D @types/node

# Install local package dependency
npm install @life/types -w @life/native
```

### Understanding Turborepo

**Turborepo** orchestrates builds and caching across the monorepo:

```bash
# Run dev servers for all apps (parallel)
npm run dev

# Build all apps (with dependency graph)
npm run build

# Lint all packages
npm run lint

# Type-check all packages
npm run check

# Run all tests
npm run test
```

#### Pipeline Configuration

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],     // Build dependencies first
      "outputs": ["dist/**"]        // Cache build outputs
    },
    "dev": {
      "cache": false,               // Never cache dev servers
      "persistent": true            // Keep running
    },
    "test": {
      "dependsOn": ["^build"]       // Build before testing
    }
  }
}
```

### 🔍 Code Quality with BiomeJS

We use **BiomeJS** instead of ESLint + Prettier for unified, fast code quality:

```bash
# Format all files
npm run format

# Check formatting (CI)
npm run format:check

# Lint all files
npm run lint:biome

# Check everything (lint + format)
npm run check:biome

# Run on specific path
cd apps/native && npm run lint
```

#### BiomeJS Configuration

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

**Why BiomeJS?**
- ⚡ **Fast**: Rust-based, ~10x faster than ESLint + Prettier
- 🎯 **Unified**: One tool for linting AND formatting
- 🔒 **Safe**: Reliable autofixes with minimal false positives
- 📦 **Zero-config**: Works out of the box with TypeScript

---

## 💻 Tech Stack

### Mobile App (`apps/native`)

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | React Native 0.83+ | Cross-platform mobile |
| Language | TypeScript 5.8+ | Type safety |
| Navigation | React Navigation v7 | Screen navigation |
| State | Zustand 5.0+ | Global state management |
| UI | React Native Paper | Material Design components |
| Backend | Firebase + Supabase | Auth, database, storage |
| Storage | AsyncStorage | Local persistence |

### Web App (`apps/web`)

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | React 18+ | UI library |
| Build Tool | Vite 5+ | Fast development & building |
| Router | React Router v6 | Client-side routing |
| State | Zustand 5.0+ | Global state management |
| Styling | CSS Modules | Scoped styles |

### API (`apps/api`)

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Fastify 5.0+ | High-performance API |
| Validation | Zod | Schema validation |
| Auth | @fastify/jwt | JWT authentication |
| Docs | @fastify/swagger | OpenAPI documentation |
| Database | Supabase | PostgreSQL + Realtime |

### Shared (`packages/*`)

| Package | Purpose |
|---------|---------|
| `@life/types` | Shared TypeScript interfaces |

---

## 📱 Apps Overview

### @life/native

React Native mobile application with:

- 📅 **Calendar Integration** - Sync with device calendars
- 💰 **Expense Tracking** - Categorize and analyze spending
- 🔐 **Authentication** - Email, Google, Apple, Biometric
- 🔔 **Push Notifications** - Firebase Cloud Messaging
- 🌙 **Dark Mode** - Full theming support
- 📴 **Offline Support** - Background sync

[📖 Native App Documentation](./apps/native/README.md)

### @life/web

React web preview application with:

- 📊 **Admin Dashboard** - Manage users and data
- 📱 **Mobile-First Design** - Responsive on all devices
- ⚡ **Fast Development** - Vite HMR
- 🔗 **Real-time Sync** - Live data updates

[📖 Web App Documentation](./apps/web/README.md)

### @life/api

Fastify backend API providing:

- 🔐 **JWT Authentication** - Secure token-based auth
- 📚 **RESTful API** - Standard HTTP endpoints
- 📖 **OpenAPI Docs** - Auto-generated API documentation
- 🗄️ **Supabase Integration** - PostgreSQL database

[📖 API Documentation](./apps/api/README.md)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for:

- Development workflow
- Commit message conventions
- Pull request process
- Code style guidelines

Quick contribution guide:

```bash
# 1. Create a feature branch
git checkout -b feature/amazing-feature

# 2. Make your changes
# ... edit files ...

# 3. Run quality checks
npm run check
npm run lint

# 4. Commit with conventional commits
git commit -m "feat: add amazing feature"

# 5. Push and create PR
git push origin feature/amazing-feature
```

---

## 🔐 Environment Variables

Each app requires its own `.env` file:

### Native App
```bash
# apps/native/.env
FIREBASE_API_KEY=xxx
FIREBASE_PROJECT_ID=xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
GOOGLE_WEB_CLIENT_ID=xxx
GOOGLE_IOS_CLIENT_ID=xxx
```

### API Server
```bash
# apps/api/.env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
```

### Web App
```bash
# apps/web/.env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=xxx
```

---

## 📝 License

[MIT](LICENSE) © 2024 Life App Team

---

## 🆘 Support

- 📧 Email: support@life-app.example.com
- 🐛 Issues: [GitHub Issues](https://github.com/kienmai98/life-monorepo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/kienmai98/life-monorepo/discussions)

---

<p align="center">
  Built with ❤️ using <a href="https://turbo.build">Turborepo</a>
</p>
