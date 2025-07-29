// components/organisms/GoalList.tsx
import React from 'react';
import { GoalCard } from './GoalCard';
import { GoalListHeader } from '../molecules/GoalListHeader';

interface Props {
  goals: any[];
  onAddGoal?: () => void;
}

const GoalList: React.FC<Props> = ({ goals, onAddGoal = () => {} }) => (
  <div>
    <GoalListHeader onAddGoal={onAddGoal} />
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  </div>
);

export default GoalList;
