import React, { useMemo, useCallback } from 'react';
import { getMonthName, formatCurrency } from '../../shared/lib';
import { useTransactionStore, type TransactionCategory, type Transaction } from '../../entities/transaction/model';
import { TransactionItem, CategoryFilter, TransactionForm } from '../../entities/transaction/ui';
import { Button, Card, Modal } from '../../shared/components';
import { useModal } from '../../shared/hooks';
import './TransactionFeature.css';

/**
 * MonthSelector component - displays month/year navigation
 */
interface MonthSelectorProps {
  month: number;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  month,
  year,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="month-selector">
      <button className="month-selector__arrow" onClick={onPrevious} aria-label="Previous month">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <span className="month-selector__label">
        {getMonthName(month)} {year}
      </span>

      <button className="month-selector__arrow" onClick={onNext} aria-label="Next month">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

/**
 * StatsCard component - displays income/expenses stats
 */
interface StatsCardProps {
  income: number;
  expenses: number;
  total: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ income, expenses, total }) => {
  return (
    <Card className="stats-card">
      <p className="stats-card__label">TOTAL SPENT</p>
      <p className="stats-card__amount">{formatCurrency(expenses)}</p>

      <div className="stats-card__summary">
        <div className="stats-card__summary-item">
          <span className="stats-card__summary-label">INCOME</span>
          <span className="stats-card__summary-value stats-card__summary-value--income">
            {formatCurrency(income)}
          </span>
        </div>
        <div className="stats-card__summary-item">
          <span className="stats-card__summary-label">NET</span>
          <span
            className={`stats-card__summary-value ${
              total >= 0 ? 'stats-card__summary-value--income' : 'stats-card__summary-value--expense'
            }`}
          >
            {formatCurrency(Math.abs(total))}
          </span>
        </div>
      </div>
    </Card>
  );
};

/**
 * TransactionList component - displays filtered transactions
 */
interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list__empty">
        <div className="transaction-list__empty-icon">💰</div>
        <p className="transaction-list__empty-title">NO TRANSACTIONS</p>
        <p className="transaction-list__empty-subtitle">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction: Transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

/**
 * TransactionFeature - Main transaction management feature
 */
export const TransactionFeature: React.FC = () => {
  const { transactions, addTransaction } = useTransactionStore();
  const { isOpen, open, close } = useModal();

  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = React.useState<TransactionCategory | 'all'>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.date);
      const monthMatch = date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
      const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
      return monthMatch && categoryMatch;
    });
  }, [transactions, selectedMonth, selectedYear, selectedCategory]);

  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses, total: income - expenses };
  }, [filteredTransactions]);

  const handlePreviousMonth = useCallback(() => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  }, [selectedMonth]);

  const handleNextMonth = useCallback(() => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  }, [selectedMonth]);

  const handleAddTransaction = useCallback(
    (formData: { amount: number; description: string; category: TransactionCategory; type: 'income' | 'expense' }) => {
      addTransaction({
        ...formData,
        currency: 'USD',
        date: new Date().toISOString(),
        paymentMethod: 'credit_card',
        tags: [],
      });
      close();
    },
    [addTransaction, close]
  );

  return (
    <div className="transaction-feature">
      <header className="transaction-feature__header">
        <h1 className="transaction-feature__title">MONEY</h1>
        <Button onClick={open}>+ ADD</Button>
      </header>

      <MonthSelector
        month={selectedMonth}
        year={selectedYear}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />

      <StatsCard
        income={stats.income}
        expenses={stats.expenses}
        total={stats.total}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <Card title="TRANSACTIONS" variant="secondary">
        <TransactionList transactions={filteredTransactions} />
      </Card>

      <Modal isOpen={isOpen} onClose={close} title="ADD TRANSACTION">
        <TransactionForm onSubmit={handleAddTransaction} onCancel={close} />
      </Modal>
    </div>
  );
};

export default TransactionFeature;
