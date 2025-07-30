// components/organisms/BudgetList.tsx
import React from 'react';
import { BudgetCard } from './BudgetCard';
import { BudgetListHeader } from '../molecules/BudgetListHeader';

interface Props {
  budgets: any[];
  onAddCategory?: () => void;
}

const BudgetList: React.FC<Props> = ({ budgets, onAddCategory = () => {} }) => (
  <div>
    <BudgetListHeader onAddCategory={onAddCategory} />
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {budgets.map((b, index) => (
        <BudgetCard key={index} {...b} />
      ))}
    </div>
  </div>
);

export default BudgetList;
