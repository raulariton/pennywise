// components/organisms/GoalList.tsx
import { useFetchGoals } from '@/hooks/crud/useGoals'; // adjust path to your hook
import React, { Dispatch, SetStateAction } from 'react';
import { GoalListHeader } from '../molecules/GoalListHeader';
import { GoalCard } from './GoalCard';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAddGoal?: () => void;
}

const GoalList: React.FC<Props> = ({ setIsOpen }) => {
  const { goals, isLoading, isError } = useFetchGoals();
  if (isLoading) {
    return (
      <div>
        <GoalListHeader onAddGoal={setIsOpen} />
        <p className="p-4">Loading goals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <GoalListHeader onAddGoal={setIsOpen} />
        <p className="p-4 text-red-500">Failed to load goals.</p>
      </div>
    );
  }

  return (
    <div>
      <GoalListHeader onAddGoal={setIsOpen} />
      <div className="space-y-4">
        {goals && goals.length > 0 ? (
          goals.map((goal: any) => <GoalCard key={goal.id} goal={goal} />)
        ) : (
          <p className="p-4 text-gray-500">No goals yet.</p>
        )}
      </div>
    </div>
  );
};

export default GoalList;
