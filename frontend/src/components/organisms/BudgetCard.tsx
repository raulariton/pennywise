// components/organisms/BudgetCard.tsx
import { useMemo, useState } from 'react';
import { BudgetSummary } from '../molecules/BudgetSummary';
import { TransactionList } from '../molecules/TransactionList';
import { PieChartWithCenterValue } from '../molecules/PieChartWithCenterValue';
import { ProgressBar } from '../atoms/ProgessBar';

interface Transaction {
  label: string;
  amount: number;
}

interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
  transactions: Transaction[];
}

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#F97316',
  '#06B6D4',
  '#84CC16',
];

export const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  spent,
  budget,
  transactions,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const progressPercentage = Math.min((spent / budget) * 100, 100);
  const remaining = Math.max(budget - spent, 0);

  const chartData = useMemo(
    () => transactions.map((t, i) => ({ ...t, color: COLORS[i % COLORS.length] })),
    [transactions],
  );

  const getProgressColor = () => {
    if (progressPercentage >= 90) return 'bg-red-500';
    if (progressPercentage >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div
      className="relative mx-auto w-full transform cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
    >
      {/* Front Layer */}
      <div
        className={`p-6 transition-all duration-500 ease-in-out ${
          isHovered ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <h3 className="mb-4 text-xl font-bold">{category}</h3>
        <BudgetSummary spent={spent} budget={budget} remaining={remaining} />

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm">Spent</span>
            <span className="text-base font-bold">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <ProgressBar percentage={progressPercentage} colorClass={getProgressColor()} />
        </div>
      </div>

      {/* Back Layer */}
      <div
        className={`absolute inset-0 bg-input p-6 transition-all duration-500 ease-in-out ${
          isHovered ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex h-full flex-row">
          <PieChartWithCenterValue
            data={chartData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            total={spent}
          />
          <TransactionList transactions={chartData} onHover={setActiveIndex} />
        </div>
      </div>
    </div>
  );
};
