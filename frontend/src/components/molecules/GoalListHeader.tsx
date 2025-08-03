// components/molecules/GoalListHeader.tsx
import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { SecondaryButton } from '../atoms/SecondaryButton';

interface GoalListHeaderProps {
  onAddGoal: Dispatch<SetStateAction<boolean>>;
}

export const GoalListHeader: React.FC<GoalListHeaderProps> = ({ onAddGoal }) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-2xl font-light">Financial Goals</h2>
    <SecondaryButton onClick={() => onAddGoal(true)}>
      <Plus className="h-4 w-4" />
      <span>New Goal</span>
    </SecondaryButton>
  </div>
);
