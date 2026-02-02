import React from 'react';
import { TransactionFeature } from '../features/transaction';
import './MoneyPage.css';

/**
 * MoneyPage - Transaction/Money management page
 * 
 * Refactored to use the TransactionFeature component which handles:
 * - Transaction list display
 * - Category filtering
 * - Month navigation
 * - Stats display
 * - Add transaction modal
 * 
 * @example
 * ```tsx
 * <Route path="/money" element={<MoneyPage />} />
 * ```
 */
export const MoneyPage: React.FC = () => {
  return (
    <div className="money-page">
      <TransactionFeature />
      <div className="money-page__padding" />
    </div>
  );
};

export default MoneyPage;
