# 🖥️ Life Web App

A fast, responsive web companion to the Life mobile app — built with Vite, React, and modern web standards for real-time life management.

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 📊 Dashboard
- **Real-time Sync** - Live data updates from mobile app
- **Spending Analytics** - Visual charts and insights
- **Calendar Overview** - Upcoming events at a glance
- **Quick Actions** - Fast entry for common tasks

### 🎛️ Admin Panel
- **User Management** - View and manage user accounts
- **System Health** - Monitor API status and errors
- **Data Analytics** - Aggregate usage statistics

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Large touch targets on mobile
- **Adaptive Layout** - Sidebar on desktop, bottom nav on mobile

### ⚡ Performance
- **Fast HMR** - Instant updates during development
- **Code Splitting** - Lazy-loaded routes
- **Optimized Builds** - Minified and tree-shaken production code

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER ENVIRONMENT                      │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐ │
│  │                    REACT 18                            │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Pages     │  │  Components │  │    Hooks    │   │ │
│  │  │             │  │             │  │             │   │ │
│  │  │ • Dashboard │  │ • DataTable │  │ • useAuth   │   │ │
│  │  │ • Calendar  │  │ • ChartCard │  │ • useApi    │   │ │
│  │  │ • Profile   │  │ • StatCard  │  │ • useSync   │   │ │
│  │  │ • Settings  │  │ • Navbar    │  │ • useTheme  │   │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │ │
│  └─────────┼────────────────┼────────────────┼──────────┘ │
└────────────┼────────────────┼────────────────┼────────────┘
             │                │                │
             └────────────────┼────────────────┘
                              │
┌─────────────────────────────┼──────────────────────────────┐
│                         STATE (Zustand)                     │
│  ┌─────────────┐  ┌─────────┴─────┐  ┌───────────────────┐ │
│  │  AuthStore  │  │  DataStore    │  │   UIStore         │ │
│  │  (User)     │  │  (App Data)   │  │  (Theme/Layout)   │ │
│  └──────┬──────┘  └───────┬───────┘  └─────────┬─────────┘ │
└─────────┼─────────────────┼────────────────────┼───────────┘
          │                 │                    │
          └─────────────────┼────────────────────┘
                            │
┌───────────────────────────┼────────────────────────────────┐
│                      API CLIENT                             │
│  ┌────────────────────────┼──────────────────────────────┐ │
│  │                        ▼                               │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │              Fetch / Axios                      │  │ │
│  │  │  • Interceptors for auth                        │  │ │
│  │  │  • Error handling                               │  │ │
│  │  │  • Request/Response transforms                  │  │ │
│  │  └─────────────────────┬───────────────────────────┘  │ │
│  └────────────────────────┼──────────────────────────────┘ │
└───────────────────────────┼────────────────────────────────┘
                            │ HTTPS/WebSocket
                            ▼
┌───────────────────────────────────────────────────────────┐
│                    Fastify API Server                      │
└───────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 20.0.0 | LTS recommended |
| npm | >= 10.0.0 | Included with Node.js |

### Installation

```bash
# Navigate to web app
cd apps/web

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Server runs at http://localhost:5173
```

### Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

```env
# API Configuration
VITE_API_URL=http://localhost:3001

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id

# App Configuration
VITE_APP_NAME=Life
VITE_APP_VERSION=1.0.0
```

---

## 📁 Project Structure

```
apps/web/
├── 📂 public/                  # Static assets
│   ├── favicon.ico
│   └── manifest.json
│
├── 🎨 src/
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.tsx    # Top navigation
│   │   │   ├── Sidebar.tsx   # Side navigation
│   │   │   └── Footer.tsx    # Page footer
│   │   ├── ui/               # UI components
│   │   │   ├── Button.tsx    # Custom button
│   │   │   ├── Card.tsx      # Card container
│   │   │   ├── Input.tsx     # Form input
│   │   │   ├── DataTable.tsx # Data table
│   │   │   └── ChartCard.tsx # Chart wrapper
│   │   └── charts/           # Chart components
│   │       ├── SpendingChart.tsx
│   │       └── CategoryChart.tsx
│   │
│   ├── pages/                 # Page components
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Calendar.tsx      # Calendar view
│   │   ├── Transactions.tsx  # Transaction list
│   │   ├── Profile.tsx       # User profile
│   │   ├── Settings.tsx      # App settings
│   │   ├── Login.tsx         # Login page
│   │   └── Admin/            # Admin pages
│   │       ├── Users.tsx
│   │       └── Analytics.tsx
│   │
│   ├── stores/                # Zustand stores
│   │   ├── authStore.ts      # Authentication state
│   │   ├── dataStore.ts      # App data state
│   │   └── uiStore.ts        # UI state
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useApi.ts         # API calls hook
│   │   ├── useSync.ts        # Real-time sync hook
│   │   └── useTheme.ts       # Theme management
│   │
│   ├── utils/                 # Utility functions
│   │   ├── api.ts            # API client setup
│   │   ├── formatters.ts     # Data formatters
│   │   └── constants.ts      # App constants
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
│
├── ⚙️  Configuration
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   └── package.json           # Dependencies
│
└── 📄 index.html              # HTML template
```

---

## 🎨 Responsive Design

### Breakpoints

```typescript
// src/utils/constants.ts
export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};
```

### Mobile-First Approach

```css
/* Base styles for mobile */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Responsive Component Example

```tsx
import { useMediaQuery } from './hooks/useMediaQuery';

function Dashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <div className="dashboard">
      {isMobile ? (
        <MobileDashboard />
      ) : isTablet ? (
        <TabletDashboard />
      ) : (
        <DesktopDashboard />
      )}
    </div>
  );
}
```

---

## ⚡ Build for Production

### Build Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Output directory: dist/
```

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
        },
      },
    },
  },
});
```

### Deployment

#### Static Hosting (Recommended)

```bash
# Build the app
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist

# Or copy to S3
aws s3 sync dist/ s3://your-bucket-name/
```

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test -- --coverage

# Run in watch mode
npm run test -- --watch
```

### Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { Dashboard } from './pages/Dashboard';

describe('Dashboard', () => {
  it('renders welcome message', () => {
    render(<Dashboard />);
    expect(screen.getByText('Welcome to Life')).toBeInTheDocument();
  });
});
```

---

## 🔌 API Integration

### Setup API Client

```typescript
// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Using in Components

```typescript
// src/hooks/useTransactions.ts
import { useEffect, useState } from 'react';
import api from '../utils/api';
import type { Transaction } from '@life/types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/transactions')
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { transactions, loading };
}
```

---

## 🎨 Customization

### Theming

```typescript
// src/stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: localStorage.getItem('theme') as 'light' | 'dark' || 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
}));
```

### CSS Variables

```css
:root {
  --color-primary: #6200ee;
  --color-secondary: #03dac6;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #121212;
}

[data-theme='dark'] {
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-text: #ffffff;
}
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Zustand State Management](https://docs.pmnd.rs/zustand/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Contributing

See [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for development guidelines.

---

## 📝 License

[MIT](../../LICENSE) © 2024 Life App Team
