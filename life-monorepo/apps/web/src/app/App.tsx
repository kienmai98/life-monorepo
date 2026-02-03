import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../entities/user/model/store';
import { useAppStore } from '../shared/lib/store';
import { PhoneFrame } from '../widgets/PhoneFrame';
import { BottomNav } from '../widgets/BottomNav';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import SchedulePage from '../pages/SchedulePage';
import MoneyPage from '../pages/MoneyPage';
import ProfilePage from '../pages/ProfilePage';
import { CmsPage } from '../pages/CmsPage';
import ContentViewPage from '../pages/ContentViewPage';
import './App.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const hideNavRoutes = ['/login'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
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
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cms"
            element={
              <PrivateRoute>
                <CmsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/content/:slug"
            element={
              <PrivateRoute>
                <ContentViewPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

export const App: React.FC = () => {
  const { isDarkMode } = useAppStore();

  return (
    <div className={`theme-root ${isDarkMode ? 'dark' : 'light'}`}>
      <PhoneFrame>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </PhoneFrame>
    </div>
  );
};

export default App;
