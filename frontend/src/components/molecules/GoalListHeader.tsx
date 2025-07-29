// components/molecules/GoalListHeader.tsx
import { Plus } from 'lucide-react';
import { SecondaryButton } from '../atoms/SecondaryButton';

interface GoalListHeaderProps {
  onAddGoal: () => void;
}

export const GoalListHeader: React.FC<GoalListHeaderProps> = ({ onAddGoal }) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-800">Financial Goals</h2>
    <SecondaryButton onClick={onAddGoal}>
      <Plus className="h-4 w-4" />
      <span>New Goal</span>
    </SecondaryButton>
  </div>
);
