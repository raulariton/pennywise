import React from 'react';
import { Plus } from 'lucide-react';
import { GoalCard } from './GoalCard';

interface Props {
  goals: any[];
}

const GoalList: React.FC<Props> = ({ goals }) => (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800">Financial Goals</h2>
      <button className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200">
        <Plus className="h-4 w-4" />
        <span>New Goal</span>
      </button>
    </div>
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  </div>
);

export default GoalList;
