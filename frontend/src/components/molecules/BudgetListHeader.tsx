// components/molecules/BudgetListHeader.tsx
import { Plus } from 'lucide-react';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface BudgetListHeaderProps {
  onAddCategory: (arg0: boolean) => void;
}

export const BudgetListHeader: React.FC<BudgetListHeaderProps> = ({ onAddCategory }) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-light">Your budgets</h2>
  </div>
);
