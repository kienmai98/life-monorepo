import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../entities/user/model/store';
import { useTransactionStore } from '../entities/transaction/model/store';
import { useCalendarStore } from '../entities/event/model/store';
import { useAppStore } from '../shared/lib/store';
import { formatCurrency } from '../shared/lib/helpers';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { getStats } = useTransactionStore();
  const { events } = useCalendarStore();
  const { isDarkMode, toggleDarkMode, notificationsEnabled, setNotificationsEnabled } = useAppStore();
  
  const stats = getStats();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || 'No email';
  const avatarInitial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="profile-avatar">{avatarInitial}</div>
        <h1 className="profile-name">{userName.toUpperCase()}</h1>
        <p className="profile-email">{userEmail}</p>
      </header>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-item">
          <p className="stat-value">{stats.transactionCount}</p>
          <p className="stat-label">TRANSACTIONS</p>
        </div>
        <div className="stat-item">
          <p className="stat-value">{formatCurrency(stats.totalExpenses).replace('$', '')}</p>
          <p className="stat-label">SPENT</p>
        </div>
        <div className="stat-item">
          <p className="stat-value">{events.length}</p>
          <p className="stat-label">EVENTS</p>
        </div>
      </div>

      {/* Preferences Section */}
      <section className="profile-section">
        <h2 className="section-heading">PREFERENCES</h2>
        
        <div className="setting-item">
          <div className="setting-info">
            <p className="setting-name">DARK MODE</p>
            <p className="setting-description">Switch between light and dark themes</p>
          </div>
          <button 
            className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
          >
            <span className="toggle-knob" />
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <p className="setting-name">NOTIFICATIONS</p>
            <p className="setting-description">Receive reminders and alerts</p>
          </div>
          <button 
            className={`toggle-switch ${notificationsEnabled ? 'active' : ''}`}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </section>

      {/* Account Section */}
      <section className="profile-section">
        <h2 className="section-heading">ACCOUNT</h2>
        
        <button className="menu-item">
          <div className="menu-icon">☁️</div>
          <div className="menu-info">
            <p className="menu-name">SYNC TO CLOUD</p>
            <p className="menu-description">Keep your data backed up</p>
          </div>
          <svg className="menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <button className="menu-item">
          <div className="menu-icon">📥</div>
          <div className="menu-info">
            <p className="menu-name">EXPORT DATA</p>
            <p className="menu-description">Download as CSV</p>
          </div>
          <svg className="menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <button className="menu-item">
          <div className="menu-icon">📅</div>
          <div className="menu-info">
            <p className="menu-name">GOOGLE CALENDAR</p>
            <p className="menu-description">Manage calendar integration</p>
          </div>
          <svg className="menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section className="profile-section">
        <h2 className="section-heading">ABOUT</h2>
        
        <button className="menu-item">
          <div className="menu-icon">🛡️</div>
          <div className="menu-info">
            <p className="menu-name">PRIVACY POLICY</p>
          </div>
          <svg className="menu-arrow external" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
        
        <button className="menu-item">
          <div className="menu-icon">📄</div>
          <div className="menu-info">
            <p className="menu-name">TERMS OF SERVICE</p>
          </div>
          <svg className="menu-arrow external" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
        
        <div className="menu-item static">
          <div className="menu-icon">ℹ️</div>
          <div className="menu-info">
            <p className="menu-name">APP VERSION</p>
            <p className="menu-description">1.0.0 (MVP)</p>
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <div className="coming-soon-banner">
        <p className="coming-soon-title">✨ COMING SOON</p>
        <p className="coming-soon-text">Bank connection, CSV import, and more advanced features are in development.</p>
        <button className="btn btn-secondary">GET NOTIFIED</button>
      </div>

      {/* Logout Button */}
      <button className="btn btn-logout" onClick={handleLogout}>
        SIGN OUT
      </button>

      <div className="home-padding" />
    </div>
  );
};

export default ProfilePage;
