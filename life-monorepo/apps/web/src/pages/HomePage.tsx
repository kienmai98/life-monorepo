import React from 'react';
import { useAuthStore } from '../entities/user/model/store';
import { useTransactionStore } from '../entities/transaction/model/store';
import { useCalendarStore } from '../entities/event/model/store';
import { formatCurrency, getGreeting, capitalizeFirst } from '../shared/lib/helpers';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const { getStats } = useTransactionStore();
  const { getUpcomingEvents } = useCalendarStore();
  
  const stats = getStats();
  const upcomingEvents = getUpcomingEvents(3);
  
  // Get top 3 spending categories
  const topCategories = Object.entries(stats.spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const userName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="home-greeting">
          <p className="greeting-text">{getGreeting()}</p>
          <h1 className="user-name">{userName.toUpperCase()}</h1>
        </div>
        <div className="user-avatar">
          {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Spending Summary Card */}
      <section className="home-card spending-card">
        <h2 className="card-title">THIS MONTH'S SPENDING</h2>
        
        <div className="balance-display">
          {formatCurrency(stats.totalExpenses)}
        </div>

        <div className="spending-summary">
          <div className="summary-item">
            <p className="summary-label">INCOME</p>
            <p className="summary-value income">{formatCurrency(stats.totalIncome)}</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">EXPENSES</p>
            <p className="summary-value expense">{formatCurrency(stats.totalExpenses)}</p>
          </div>
        </div>

        {topCategories.length > 0 && (
          <div className="category-breakdown">
            <hr className="card-divider" />
            <h3 className="section-title">BY CATEGORY</h3>
            <div className="category-list">
              {topCategories.map(([category, amount]) => {
                const percentage = stats.totalExpenses > 0 
                  ? ((amount as number) / stats.totalExpenses) * 100 
                  : 0;
                return (
                  <div key={category} className="category-item">
                    <div className="category-header">
                      <span className="category-name">{capitalizeFirst(category)}</span>
                      <span className="category-amount">{formatCurrency(amount as number)}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Schedule Card */}
      <section className="home-card schedule-card">
        <h2 className="card-title">UPCOMING EVENTS</h2>
        
        {upcomingEvents.length > 0 ? (
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div 
                  className="event-indicator" 
                  style={{ backgroundColor: event.color || '#292524' }}
                />
                <div className="event-details">
                  <p className="event-title">{event.title}</p>
                  <p className="event-time">
                    {new Date(event.startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    }).toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">NO UPCOMING EVENTS</p>
        )}
      </section>

      {/* Recent Transactions */}
      <section className="home-card transactions-card">
        <h2 className="card-title">RECENT TRANSACTIONS</h2>
        
        <div className="mini-transaction-list">
          {>/* Show sample transactions */}
          <>
            <div className="mini-transaction">
              <div className="mini-transaction-icon">🍔</div>
              <div className="mini-transaction-info">
                <p className="mini-transaction-name">GROCERY SHOPPING</p>
                <p className="mini-transaction-meta">FOOD • TODAY</p>
              </div>
              <p className="mini-transaction-amount expense">-$45.50</p>
            </div>
            
            <div className="mini-transaction">
              <div className="mini-transaction-icon">🚗</div>
              <div className="mini-transaction-info">
                <p className="mini-transaction-name">UBER RIDE</p>
                <p className="mini-transaction-meta">TRANSPORT • YESTERDAY</p>
              </div>
              <p className="mini-transaction-amount expense">-$25.00</p>
            </div>
            
            <div className="mini-transaction">
              <div className="mini-transaction-icon">💰</div>
              <div className="mini-transaction-info">
                <p className="mini-transaction-name">MONTHLY SALARY</p>
                <p className="mini-transaction-meta">INCOME • 3 DAYS AGO</p>
              </div>
              <p className="mini-transaction-amount income">+$3,500.00</p>
            </div>
          </>
        </div>
      </section>

      <div className="home-padding" />
    </div>
  );
};

export default HomePage;
