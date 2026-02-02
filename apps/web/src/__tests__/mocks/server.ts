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

  http.post('/api/auth/logout', async () => {
    await delay(50);
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/user/profile', async () => {
    await delay(100);
    return HttpResponse.json({ user: mockUser });
  }),

  // Transaction endpoints
  http.get('/api/transactions', async () => {
    await delay(150);
    return HttpResponse.json({
      transactions: mockTransactions,
      total: mockTransactions.length,
    });
  }),

  http.post('/api/transactions', async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as Partial<Transaction>;

    return HttpResponse.json(
      {
        id: `txn-${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // Calendar endpoints
  http.get('/api/calendar/events', async () => {
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
      ],
    });
  }),
];

export const server = setupServer(...handlers);
