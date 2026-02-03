import React, { useState } from 'react';
import { Button } from '../../../shared/components';
import type { TransactionCategory, TransactionType } from '../model';
import { ALL_CATEGORIES, getCategoryIcon } from '../model/types';
import { capitalizeFirst } from '../../../shared/lib';
import './TransactionForm.css';

export interface TransactionFormData {
  amount: number;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
}

export interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
}

/**
 * TransactionForm component - form for creating transactions
 */
export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('food');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!numAmount || !description.trim()) return;

    onSubmit({
      amount: numAmount,
      description: description.trim(),
      category,
      type,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('food');
    setType('expense');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form__row">
        <div className="transaction-form__group">
          <label className="transaction-form__label">Type</label>
          <select
            className="transaction-form__select"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            required
          >
            <option value="expense">EXPENSE</option>
            <option value="income">INCOME</option>
          </select>
        </div>

        <div className="transaction-form__group">
          <label className="transaction-form__label">Amount</label>
          <input
            type="number"
            className="transaction-form__input"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="transaction-form__group">
        <label className="transaction-form__label">Description</label>
        <input
          type="text"
          className="transaction-form__input"
          placeholder="What was this for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="transaction-form__group">
        <label className="transaction-form__label">Category</label>
        <select
          className="transaction-form__select"
          value={category}
          onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          required
        >
          {ALL_CATEGORIES.map((cat: TransactionCategory) => (
            <option key={cat} value={cat}>
              {getCategoryIcon(cat)} {capitalizeFirst(cat)}
            </option>
          ))}
        </select>
      </div>

      <div className="transaction-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add Transaction
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
