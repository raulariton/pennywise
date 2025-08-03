import { useFetchBudgets } from '@/hooks/crud/useBudget';
import React, { Dispatch, SetStateAction } from 'react';
import { BudgetListHeader } from '../molecules/BudgetListHeader';
import { BudgetCard } from './BudgetCard';

interface Props {
  month: string | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BudgetList: React.FC<Props> = ({ month, setIsOpen }) => {
  const { budgets, isLoading, isError } = useFetchBudgets(month);
  console.log(budgets);
  if (isLoading) {
    return <div>Loading budgets...</div>;
  }

  if (isError) {
    return <div>Failed to load budgets</div>;
  }

  if (!budgets || budgets.length === 0) {
    return (
      <div>
        <BudgetListHeader onAddCategory={setIsOpen} />
        <p className="mt-4 text-gray-500">No budgets found. Add a new budget to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <BudgetListHeader onAddCategory={setIsOpen} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {budgets.map((b: any, index: number) => (
          <BudgetCard key={index} {...b} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
