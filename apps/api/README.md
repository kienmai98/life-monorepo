# 🔧 Life API

A high-performance REST API built with Fastify and TypeScript — powering the Life mobile and web applications with secure, scalable endpoints.

[![Fastify](https://img.shields.io/badge/Fastify-5.0+-000000?logo=fastify)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-3.22+-3068B7)](https://zod.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49+-3ECF8E?logo=supabase)](https://supabase.io/)

---

## ✨ Features

- ⚡ **High Performance** - Fastify's low overhead (~20% faster than Express)
- 🔐 **JWT Authentication** - Secure token-based auth with @fastify/jwt
- 📚 **Auto Documentation** - OpenAPI/Swagger specs generated automatically
- ✅ **Schema Validation** - Runtime type checking with Zod
- 🗄️ **Supabase Integration** - PostgreSQL with real-time subscriptions
- 🧪 **Type Safety** - Full TypeScript coverage
- 🔄 **Hot Reload** - tsx watch for development

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                            │
└──────────────────────────────────┬──────────────────────────────┘
                                   │ HTTPS
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FASTIFY SERVER                              │
│                          Port 3001                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                     REQUEST PIPELINE                       │ │
│  │                                                            │ │
│  │  1. CORS Middleware   →  Add CORS headers                  │ │
│  │  2. JWT Verify        →  Validate token (if required)      │ │
│  │  3. Rate Limiter      →  Prevent abuse                     │ │
│  │  4. Schema Validate   →  Zod validation                    │ │
│  │  5. Route Handler     →  Execute business logic            │ │
│  │  6. Response          →  Send JSON response                │ │
│  └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────┬──────────────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           ▼                       ▼                       ▼
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│      /auth         │  │   /transactions    │  │     /calendar      │
│                    │  │                    │  │                    │
│ • POST /register   │  │ • GET /            │  │ • GET /            │
│ • POST /login      │  │ • POST /           │  │ • POST /           │
│ • POST /refresh    │  │ • GET /:id         │  │ • GET /:id         │
│ • POST /logout     │  │ • PUT /:id         │  │ • PUT /:id         │
│                    │  │ • DELETE /:id      │  │ • DELETE /:id      │
└─────────┬──────────┘  └──────────┬─────────┘  └──────────┬─────────┘
          │                        │                       │
          └────────────────────────┼───────────────────────┘
                                   │
┌──────────────────────────────────┼──────────────────────────────┐
│                         SUPABASE CLIENT                        │
│  ┌───────────────────────────────┴───────────────────────────┐ │
│  │                  PostgreSQL Database                       │ │
│  │                                                            │ │
│  │  ┌─────────────┐  ┌─────────────────┐  ┌─────────────┐   │ │
│  │  │   users     │  │  transactions   │  │   events    │   │ │
│  │  │             │  │                 │  │             │   │ │
│  │  │ • id (uuid) │  │ • id (uuid)     │  │ • id (uuid) │   │ │
│  │  │ • email     │  │ • user_id       │  │ • user_id   │   │ │
│  │  │ • password  │  │ • amount        │  │ • title     │   │ │
│  │  │ • created_at│  │ • category      │  │ • start_date│   │ │
│  │  │             │  │ • description   │  │ • end_date  │   │ │
│  │  │             │  │ • date          │  │ • is_all_day│   │ │
│  │  └─────────────┘  │ • created_at    │  │ • created_at│   │ │
│  │                   └─────────────────┘  └─────────────┘   │ │
│  └───────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 20.0.0 | LTS recommended |
| Supabase | - | Free tier works fine |

### Installation

```bash
# Navigate to API directory
cd apps/api

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

```env
# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Database Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Users table (managed by Supabase Auth)
-- auth.users already exists, just add custom fields
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  receipt_url TEXT,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar events table
CREATE TABLE calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  location VARCHAR(255),
  is_all_day BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
CREATE POLICY "Users can only access their own transactions"
  ON transactions
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for calendar events
CREATE POLICY "Users can only access their own calendar events"
  ON calendar_events
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Users can only access their own profile"
  ON profiles
  FOR ALL
  USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_calendar_events_user_id ON calendar_events(user_id);
CREATE INDEX idx_calendar_events_start_date ON calendar_events(start_date);
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server runs at http://localhost:3001
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── routes/               # Route handlers
│   │   ├── auth.ts          # Authentication routes
│   │   ├── transactions.ts  # Transaction routes
│   │   ├── calendar.ts      # Calendar routes
│   │   └── health.ts        # Health check route
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.ts          # JWT verification
│   │   ├── errorHandler.ts  # Global error handler
│   │   └── rateLimiter.ts   # Rate limiting
│   │
│   ├── utils/                # Utility functions
│   │   ├── supabase.ts      # Supabase client
│   │   ├── schemas.ts       # Zod schemas
│   │   └── responses.ts     # Response helpers
│   │
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   │
│   └── index.ts              # Entry point
│
├── tests/                    # Test files
│   ├── auth.test.ts
│   ├── transactions.test.ts
│   └── setup.ts
│
├── .env.example              # Environment template
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

---

## 🔐 Authentication

### JWT Flow

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Client   │────────▶│   POST      │────────▶│   Validate  │
│   (Login)   │         │  /login     │         │  Credentials│
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                       │
┌─────────────┐         ┌─────────────┐         ┌──────┴──────┐
│ Store Token │◀────────│   Return    │◀────────│  Generate   │
│   Securely  │         │   {token}   │         │    JWT      │
└─────────────┘         └─────────────┘         └─────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  Authentic  │────────▶│   Include   │────────▶│   Verify    │
│   Request   │         │Authorization│         │    JWT      │
│             │         │: Bearer xxx │         │   Signature │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                       │
┌─────────────┐         ┌─────────────┐         ┌──────┴──────┐
│   Process   │◀────────│   Return    │◀────────│   Extract   │
│   Request   │         │   Response  │         │   User ID   │
└─────────────┘         └─────────────┘         └─────────────┘
```

### Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe"
    }
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {token}
```

#### Get Profile
```http
GET /auth/me
Authorization: Bearer {token}
```

---

## 💰 Transactions API

### Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/transactions` | List all transactions | ✅ |
| POST | `/transactions` | Create new transaction | ✅ |
| GET | `/transactions/:id` | Get single transaction | ✅ |
| PUT | `/transactions/:id` | Update transaction | ✅ |
| DELETE | `/transactions/:id` | Delete transaction | ✅ |

### List Transactions
```http
GET /transactions?page=1&limit=20&category=food&startDate=2024-01-01
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "amount": 45.99,
        "category": "food",
        "description": "Grocery shopping",
        "date": "2024-01-15",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 150,
      "hasMore": true
    }
  }
}
```

### Create Transaction
```http
POST /transactions
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 29.99,
  "category": "transport",
  "description": "Uber ride",
  "date": "2024-01-20",
  "location": {
    "lat": 40.7128,
    "lng": -74.0060
  }
}
```

### Update Transaction
```http
PUT /transactions/uuid
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 35.99,
  "description": "Updated description"
}
```

### Delete Transaction
```http
DELETE /transactions/uuid
Authorization: Bearer {token}
```

---

## 📅 Calendar API

### Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/calendar` | List events | ✅ |
| POST | `/calendar` | Create event | ✅ |
| GET | `/calendar/:id` | Get single event | ✅ |
| PUT | `/calendar/:id` | Update event | ✅ |
| DELETE | `/calendar/:id` | Delete event | ✅ |

### List Events
```http
GET /calendar?start=2024-01-01&end=2024-01-31
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "uuid",
        "title": "Team Meeting",
        "startDate": "2024-01-15T09:00:00Z",
        "endDate": "2024-01-15T10:00:00Z",
        "description": "Weekly sync",
        "location": "Conference Room A",
        "isAllDay": false
      }
    ]
  }
}
```

### Create Event
```http
POST /calendar
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Dentist Appointment",
  "startDate": "2024-01-20T14:00:00Z",
  "endDate": "2024-01-20T15:00:00Z",
  "description": "Regular checkup",
  "location": "123 Main St",
  "isAllDay": false
}
```

---

## 🧪 Testing with curl/Postman

### Health Check
```bash
curl http://localhost:3001/health
```

### Register User
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "displayName": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Transaction (with token)
```bash
TOKEN="your-jwt-token"

curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "amount": 50.00,
    "category": "food",
    "description": "Lunch",
    "date": "2024-01-20"
  }'
```

### Get Transactions
```bash
curl http://localhost:3001/transactions \
  -H "Authorization: Bearer $TOKEN"
```

### Get with Query Parameters
```bash
curl "http://localhost:3001/transactions?category=food&page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Automated Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# Run specific file
npm run test -- auth.test.ts

# Watch mode
npm run test -- --watch
```

### Test Example

```typescript
import { test, expect } from 'vitest';
import { build } from './test-utils';

test('POST /auth/login', async () => {
  const app = await build();
  
  const response = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: {
      email: 'test@example.com',
      password: 'password123',
    },
  });
  
  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toHaveProperty('data.token');
});
```

---

## 📚 OpenAPI Documentation

When the server is running, view interactive API docs at:

```
http://localhost:3001/documentation
```

This provides a Swagger UI with:
- All available endpoints
- Request/response schemas
- Try-it-now functionality
- Authentication setup

---

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### Build and Run

```bash
# Build image
docker build -t life-api .

# Run container
docker run -p 3001:3001 \
  -e JWT_SECRET=your-secret \
  -e SUPABASE_URL=your-url \
  -e SUPABASE_SERVICE_KEY=your-key \
  life-api
```

---

## 📊 Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│     auth.users  │         │   transactions   │         │ calendar_events │
├─────────────────┤         ├──────────────────┤         ├─────────────────┤
│ id (PK, uuid)   │◀────────┤ user_id (FK)     │         │ user_id (FK)    │◀────────┤
│ email           │         │ id (PK, uuid)    │         │ id (PK, uuid)   │         │
│ encrypted_pass  │         │ amount           │         │ title           │         │
│ created_at      │         │ category         │         │ start_date      │         │
└─────────────────┘         │ description      │         │ end_date        │         │
                            │ date             │         │ description     │         │
                            │ receipt_url      │         │ location        │         │
                            │ location         │         │ is_all_day      │         │
                            │ created_at       │         │ created_at      │         │
                            └──────────────────┘         └─────────────────┘
```

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring users can only access their own data:

```sql
-- Example policy
CREATE POLICY "Users can only access their own data"
  ON transactions
  FOR ALL
  USING (auth.uid() = user_id);
```

---

## 🛡️ Security Considerations

- **JWT Secret**: Use a cryptographically secure random string (min 32 chars)
- **HTTPS**: Always use HTTPS in production
- **Rate Limiting**: Implemented on all auth endpoints
- **Input Validation**: All inputs validated with Zod schemas
- **SQL Injection**: Protected by Supabase's parameterized queries
- **CORS**: Configured to allow only specific origins

---

## 🤝 Contributing

See [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) for development guidelines.

---

## 📝 License

[MIT](../../LICENSE) © 2024 Life App Team
