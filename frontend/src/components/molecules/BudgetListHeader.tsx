// components/molecules/BudgetListHeader.tsx
import { Plus } from 'lucide-react';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface BudgetListHeaderProps {
  onAddCategory: () => void;
}

export const BudgetListHeader: React.FC<BudgetListHeaderProps> = ({ onAddCategory }) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-800">Budget Categories</h2>
    <PrimaryButton onClick={onAddCategory}>
      <Plus className="h-4 w-4" />
      <span>Add Category</span>
    </PrimaryButton>
  </div>
);
