# Life API

A Fastify TypeScript API for the Life application - Personal finance and life management.

## Features

- **TypeScript** - Strict typing throughout
- **Fastify** - High-performance web framework
- **Zod** - Schema validation with TypeScript inference
- **JWT Authentication** - Secure token-based auth
- **OpenAPI/Swagger** - Auto-generated API documentation
- **Supabase** - PostgreSQL database with real-time capabilities
- **Rate Limiting** - Protection against abuse
- **Error Handling** - Centralized error management with custom error classes

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Supabase account (or local Supabase)

### Environment Variables

Create a `.env` file:

```env
# Server
PORT=3001
NODE_ENV=development
LOG_LEVEL=info

# Security
JWT_SECRET=your-secret-key-min-32-characters

# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:3001/documentation
- Health Check: http://localhost:3001/health

## Project Structure

```
src/
├── controllers/        # Request handlers
│   ├── auth.controller.ts
│   └── transaction.controller.ts
├── errors/            # Custom error classes
│   └── index.ts
├── lib/               # Utility libraries
│   └── database.ts    # Supabase client
├── plugins/           # Fastify plugins
│   ├── auth.ts        # JWT authentication
│   ├── error-handler.ts
│   ├── rate-limit.ts
│   └── swagger.ts     # OpenAPI config
├── routes/            # Route definitions
│   ├── auth.routes.ts
│   └── transactions.routes.ts
├── schemas/           # Zod validation schemas
│   └── index.ts
├── services/          # Business logic
│   ├── auth.service.ts
│   └── transaction.service.ts
├── types/             # TypeScript types
│   └── index.ts
└── index.ts           # Application entry point
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/register` | Create new account | No |
| POST | `/api/auth/logout` | Logout (client-side) | Yes |
| POST | `/api/auth/reset-password` | Request password reset | No |
| GET | `/api/auth/profile` | Get current user | Yes |

### Transactions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/transactions` | List transactions | Yes |
| GET | `/api/transactions/summary` | Get financial summary | Yes |
| GET | `/api/transactions/:id` | Get single transaction | Yes |
| POST | `/api/transactions` | Create transaction | Yes |
| PATCH | `/api/transactions/:id` | Update transaction | Yes |
| DELETE | `/api/transactions/:id` | Delete transaction | Yes |

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"]
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `AUTHENTICATION_ERROR` | 401 | Missing or invalid token |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration
```

## Database Schema

### Users Table

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  photo_url text,
  role text default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Transactions Table

```sql
create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  amount decimal(10, 2) not null,
  category text not null,
  description text not null,
  type text check (type in ('income', 'expense')),
  date timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz
);
```

## Security Best Practices

1. **Input Validation** - All inputs validated with Zod schemas
2. **SQL Injection Prevention** - Using Supabase query builder (parameterized queries)
3. **XSS Prevention** - Input sanitization and proper content-type headers
4. **Rate Limiting** - Configured per-route (auth: 5/15min, default: 100/min)
5. **CORS** - Whitelist-based origin validation
6. **JWT Security** - Short expiration, secure storage client-side

## License

MIT
