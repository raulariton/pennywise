import React from 'react';
import { Plus } from 'lucide-react';
import { BudgetCard } from './BudgetCard';

interface Props {
  budgets: any[];
}

const BudgetList: React.FC<Props> = ({ budgets }) => (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Budget Categories</h2>
      <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700">
        <Plus className="h-4 w-4" />
        <span>Add Category</span>
      </button>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {budgets.map((b, index) => (
        <BudgetCard key={index} {...b} />
      ))}
    </div>
  </div>
);

export default BudgetList;
