import React from 'react';
import type { TransactionCategory } from '../model';
import { getCategoryIcon, getCategoryColor, COMMON_CATEGORIES } from '../model/types';
import { capitalizeFirst } from '../../../shared/lib';
import './CategoryChip.css';

export interface CategoryChipProps {
  category: TransactionCategory | 'all';
  isSelected: boolean;
  onClick: () => void;
  label?: string;
}

/**
 * CategoryChip component - displays a selectable category chip
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected,
  onClick,
  label,
}) => {
  const displayLabel = label || (category === 'all' ? 'All' : capitalizeFirst(category));
  
  const style: React.CSSProperties =
    isSelected && category !== 'all'
      ? {
          backgroundColor: `${getCategoryColor(category as TransactionCategory)}20`,
          borderColor: getCategoryColor(category as TransactionCategory),
        }
      : {};

  return (
    <button
      className={`category-chip ${isSelected ? 'category-chip--selected' : ''}`}
      onClick={onClick}
      style={style}
    >
      {category !== 'all' && getCategoryIcon(category as TransactionCategory)}{' '}
      {displayLabel}
    </button>
  );
};

export interface CategoryFilterProps {
  selectedCategory: TransactionCategory | 'all';
  onSelect: (category: TransactionCategory | 'all') => void;
  categories?: TransactionCategory[];
  showAll?: boolean;
}

/**
 * CategoryFilter component - displays a list of category chips
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelect,
  categories = COMMON_CATEGORIES,
  showAll = true,
}) => {
  return (
    <div className="category-filter">
      {showAll && (
        <CategoryChip
          category="all"
          isSelected={selectedCategory === 'all'}
          onClick={() => onSelect('all')}
        />
      )}
      {categories.map((category: TransactionCategory) => (
        <CategoryChip
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
};

export default CategoryChip;
