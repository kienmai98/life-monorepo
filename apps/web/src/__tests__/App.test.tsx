import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => null,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => vi.fn(),
}));

// Mock zustand store
vi.mock('../stores/authStore', () => ({
  useAuthStore: () => ({
    user: null,
    isAuthenticated: false,
  }),
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('contains the app structure', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
