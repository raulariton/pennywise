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
    <div className="rounded-2xl border bg-gradient-to-t bg-t from-primary/5 to-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <GoalHeader title={goal.title} deadline={goal.deadline} category={goal.category} />
      <GoalProgress progress={progress} />
      <div className="flex items-center justify-between text-sm">
        <CurrencyText amount={goal.current} />
        <CurrencyText amount={goal.target} />
      </div>
    </div>
  );
};
