import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useTransactionStore } from '../entities/transaction/model/store';
import { getCategoryIcon, getCategoryColor, TransactionCategory } from '../entities/transaction/model/types';
import { formatCurrency, capitalizeFirst, getMonthName } from '../shared/lib/helpers';
import './MoneyPage.css';

const categories: TransactionCategory[] = [
  'food', 'transport', 'shopping', 'entertainment', 
  'utilities', 'health', 'travel', 'education', 
  'income', 'investment', 'other'
];

export const MoneyPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const { transactions, addTransaction } = useTransactionStore();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const date = new Date(t.date);
      const monthMatch = date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
      const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
      return monthMatch && categoryMatch;
    });
  }, [transactions, selectedMonth, selectedYear, selectedCategory]);

  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expenses, total: income - expenses };
  }, [filteredTransactions]);

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addTransaction({
      amount: parseFloat(formData.get('amount') as string),
      currency: 'USD',
      category: formData.get('category') as TransactionCategory,
      description: formData.get('description') as string,
      date: new Date().toISOString(),
      type: formData.get('type') as 'income' | 'expense',
      paymentMethod: 'credit_card',
      tags: [],
    });
    
    setShowAddModal(false);
  };

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="money-page">
      {/* Header */}
      <header className="money-header">
        <h1 className="page-title">MONEY</h1>
        <button className="btn-add-transaction" onClick={() => setShowAddModal(true)}>
          + ADD
        </button>
      </header>

      {/* Month Selector */}
      <div className="month-selector">
        <button className="month-arrow" onClick={goToPreviousMonth}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <span className="month-label">
          {getMonthName(selectedMonth)} {selectedYear}
        </span>
        
        <button className="month-arrow" onClick={goToNextMonth}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Total Spent */}
      <div className="total-card">
        <p className="total-label">TOTAL SPENT</p>
        <p className="total-amount">{formatCurrency(stats.expenses)}</p>
        
        <div className="total-summary">
          <div className="total-summary-item">
            <span className="summary-label">INCOME</span>
            <span className="summary-value income">{formatCurrency(stats.income)}</span>
          </div>
          <div className="total-summary-item">
            <span className="summary-label">NET</span>
            <span className={`summary-value ${stats.total >= 0 ? 'income' : 'expense'}`}>
              {formatCurrency(Math.abs(stats.total))}
            </span>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        <button
          className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          ALL
        </button>
        {categories.slice(0, 6).map((cat) => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={selectedCategory === cat ? { 
              backgroundColor: `${getCategoryColor(cat)}20`,
              borderColor: getCategoryColor(cat)
            } : {}}
          >
            {getCategoryIcon(cat)} {capitalizeFirst(cat)}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="transaction-section">
        <h2 className="section-title">TRANSACTIONS</h2>
        
        <div className="transaction-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div 
                  className="transaction-icon"
                  style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
                >
                  {getCategoryIcon(transaction.category)}
                </div>
                
                <div className="transaction-info">
                  <p className="transaction-description">
                    {transaction.description.toUpperCase()}
                  </p>
                  <p className="transaction-meta">
                    {capitalizeFirst(transaction.category)} • {format(new Date(transaction.date), 'MMM d').toUpperCase()}
                  </p>
                </div>
                
                <p className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))
          ) : (
            <div className="empty-transactions">
              <div className="empty-icon">💰</div>
              <p className="empty-title">NO TRANSACTIONS</p>
              <p className="empty-subtitle">Add your first transaction to get started</p>
            </div>
          )}
        </div>
      </div>

      <div className="home-padding" />

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">ADD TRANSACTION</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddTransaction}>
              <div className="form-group">
                <label className="form-label">DESCRIPTION</label>
                <input
                  type="text"
                  name="description"
                  className="form-input"
                  placeholder="What was this for?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">AMOUNT</label>
                <input
                  type="number"
                  name="amount"
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">TYPE</label>
                  <select name="type" className="form-input form-select" required>
                    <option value="expense">EXPENSE</option>
                    <option value="income">INCOME</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">CATEGORY</label>
                  <select name="category" className="form-input form-select" required>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {getCategoryIcon(cat)} {capitalizeFirst(cat)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary modal-submit">
                ADD TRANSACTION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyPage;
