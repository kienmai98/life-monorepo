import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import './App.css';

// Lazy load pages for code splitting
const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const MoneyPage = lazy(() => import('./pages/MoneyPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Loading fallback
const PageLoader: React.FC = () => (
  <div className="page-loader" data-testid="page-loader">
    <div className="page-loader__spinner" />
  </div>
);

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * PrivateRoute - Protects routes that require authentication
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

/**
 * App - Main application component with routing
 * 
 * Features:
 * - Code splitting with lazy loading
 * - Protected routes
 * - Suspense fallback for async components
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/money"
            element={
              <PrivateRoute>
                <MoneyPage />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/schedule" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
