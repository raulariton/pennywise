// components/organisms/GoalCard.tsx
import { GoalHeader } from '../molecules/GoalHeader';
import { GoalProgress } from '../molecules/GoalProgress';
import { CurrencyText } from '../atoms/CurrencyText';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
}

export const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <GoalHeader title={goal.title} deadline={goal.deadline} category={goal.category} />
      <GoalProgress progress={progress} />
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          <CurrencyText amount={goal.current} />
        </span>
        <span className="font-semibold text-gray-800">
          <CurrencyText amount={goal.target} />
        </span>
      </div>
    </div>
  );
};
