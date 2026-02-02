import type { Transaction, User } from '@life/types';
import { http, HttpResponse, delay } from 'msw';
/**
 * MSW (Mock Service Worker) setup for API mocking in tests
 */
import { setupServer } from 'msw/node';

// Mock user data
const mockUser: User = {
  id: 'user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
};

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    amount: 50.0,
    category: 'food',
    description: 'Lunch at cafe',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'txn-2',
    amount: 25.0,
    category: 'transport',
    description: 'Taxi ride',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        user: mockUser,
        token: 'fake-jwt-token-12345',
      });
    }

    return HttpResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as {
      email: string;
      password: string;
      displayName?: string;
    };

    if (body.email === 'existing@example.com') {
      return HttpResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    return HttpResponse.json(
      {
        user: {
          ...mockUser,
          email: body.email,
          displayName: body.displayName || null,
        },
        token: 'fake-jwt-token-12345',
      },
      { status: 201 }
    );
  }),

  http.post('/api/auth/reset-password', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as { email: string };

    return HttpResponse.json({
      message: 'Password reset email sent',
      email: body.email,
    });
  }),

  http.post('/api/auth/logout', async () => {
    await delay(50);
    return HttpResponse.json({ success: true });
  }),

  // Transaction endpoints
  http.get('/api/transactions', async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return HttpResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    return HttpResponse.json({
      transactions: mockTransactions,
      total: mockTransactions.length,
      page: 1,
      pageSize: 20,
      hasMore: false,
    });
  }),

  http.post('/api/transactions', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as Partial<Transaction>;

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      amount: body.amount || 0,
      category: body.category || 'other',
      description: body.description || '',
      date: body.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  http.patch('/api/transactions/:id', async ({ request, params }) => {
    await delay(100);
    const body = (await request.json()) as Partial<Transaction>;
    const id = params.id as string;

    const existingTransaction = mockTransactions.find((t) => t.id === id);
    if (!existingTransaction) {
      return HttpResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return HttpResponse.json({
      ...existingTransaction,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  http.delete('/api/transactions/:id', async ({ params }) => {
    await delay(100);
    const id = params.id as string;

    const existingTransaction = mockTransactions.find((t) => t.id === id);
    if (!existingTransaction) {
      return HttpResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return HttpResponse.json({ success: true });
  }),

  // Calendar endpoints
  http.get('/api/calendar/events', async ({ request }) => {
    await delay(150);

    return HttpResponse.json({
      events: [
        {
          id: 'event-1',
          title: 'Team Meeting',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3600000).toISOString(),
          isAllDay: false,
        },
        {
          id: 'event-2',
          title: 'Lunch Break',
          startDate: new Date(Date.now() + 7200000).toISOString(),
          endDate: new Date(Date.now() + 10800000).toISOString(),
          isAllDay: false,
        },
      ],
    });
  }),

  // User endpoints
  http.get('/api/user/profile', async () => {
    await delay(100);
    return HttpResponse.json({ user: mockUser });
  }),

  http.patch('/api/user/profile', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as Partial<User>;

    return HttpResponse.json({
      user: { ...mockUser, ...body },
    });
  }),
];

export const server = setupServer(...handlers);
