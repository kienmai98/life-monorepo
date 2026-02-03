import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/schedule', label: 'Schedule', icon: '📅' },
    { path: '/money', label: 'Money', icon: '💰' },
    { path: '/cms', label: 'CMS', icon: '📝' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav__item ${currentPath === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
