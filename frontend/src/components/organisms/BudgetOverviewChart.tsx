// components/organisms/BudgetOverviewChart.tsx
'use client';
import { BudgetLegend } from '../molecules/BudgetLegend';
import { BudgetPieChart } from '../molecules/BudgetPieChart';

interface Props {
  totalSpent: number;
  totalRemaining: number;
  totalBudget: number;
}

const BudgetOverviewChart: React.FC<Props> = ({ totalSpent, totalRemaining, totalBudget }) => {
  const chartData = [
    { name: 'Spent', value: totalSpent, fill: '#EF4444' },
    { name: 'Remaining', value: totalRemaining, fill: '#10B981' },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Budget Overview</h2>
      <BudgetPieChart data={chartData} totalBudget={totalBudget} />
      <BudgetLegend />
    </div>
  );
};

export default BudgetOverviewChart;
