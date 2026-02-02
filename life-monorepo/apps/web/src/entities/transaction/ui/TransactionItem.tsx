import React from 'react';
import { format } from 'date-fns';
import type { Transaction } from '../model';
import { getCategoryIcon, getCategoryColor, formatCurrency, capitalizeFirst } from '../../../shared/lib';
import './TransactionItem.css';

export interface TransactionItemProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

/**
 * TransactionItem component - displays a single transaction
 */
export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(transaction);
  };

  return (
    <div
      className="transaction-item"
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
    >
      <div
        className="transaction-item__icon"
        style={{
          backgroundColor: `${getCategoryColor(transaction.category)}20`,
        }}
      >
        {getCategoryIcon(transaction.category)}
      </div>

      <div className="transaction-item__info">
        <p className="transaction-item__description">
          {transaction.description.toUpperCase()}
        </p>
        <p className="transaction-item__meta">
          {capitalizeFirst(transaction.category)} •{' '}
          {format(new Date(transaction.date), 'MMM d').toUpperCase()}
        </p>
      </div>

      <p
        className={`transaction-item__amount transaction-item__amount--${transaction.type}`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
};

export default TransactionItem;
