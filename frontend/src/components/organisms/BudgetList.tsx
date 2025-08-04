import { useFetchBudgets } from '@/hooks/crud/useBudget';
import React, { Dispatch, SetStateAction } from 'react';
import { BudgetCard } from './BudgetCard';

interface Props {
  month: string | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BudgetList: React.FC<Props> = ({ month }) => {
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
      <div className="space-y-4">
        <p className="text-muted-foreground">No budgets found. Add a new budget to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {budgets.map((b: any, index: number) => (
          <BudgetCard key={index} {...b} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
