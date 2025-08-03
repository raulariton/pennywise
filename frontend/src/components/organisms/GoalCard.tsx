// components/organisms/GoalCard.tsx
import { CurrencyText } from '../atoms/CurrencyText';
import { GoalHeader } from '../molecules/GoalHeader';
import { GoalProgress } from '../molecules/GoalProgress';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
}

export const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <div className="rounded-2xl border bg-gradient-to-t bg-t from-primary/5 to-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <GoalHeader title={goal.title} deadline={goal.dueDate} category={goal.category} />
      <GoalProgress progress={progress} />
      <div className="flex items-center justify-between text-sm">
        <CurrencyText amount={goal.currentAmount} />
        <CurrencyText amount={goal.targetAmount} />
      </div>
    </div>
  );
};
