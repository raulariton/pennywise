import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts';
interface BudgetCardProps {
  category: string;
  spent: number;
  budget: number;
  transactions: Transaction[];
}

interface Transaction {
  label: string;
  amount: number;
}
const COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#F97316', // orange-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
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

  const chartData = transactions.map((transaction, index) => ({
    ...transaction,
    color: COLORS[index % COLORS.length],
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProgressColor = () => {
    if (progressPercentage >= 90) return 'bg-red-500';
    if (progressPercentage >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const CustomTooltipPositioned = ({ active, payload, coordinate, viewBox }: any) => {
    if (active && payload && payload.length && coordinate && viewBox) {
      const data = payload[0].payload;
      const percentage = ((data.amount / spent) * 100).toFixed(1);

      // Center of pie chart
      const cx = viewBox.cx;
      const cy = viewBox.cy;

      // Direction from center to hovered point
      const dx = coordinate.x - cx;
      const dy = coordinate.y - cy;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;

      // Normalize and move 30px from center
      const distance = 30;
      const posX = cx + (dx / length) * distance;
      const posY = cy + (dy / length) * distance;

      return (
        <div
          className="absolute z-10 w-44 rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
          style={{
            top: posY,
            left: posX,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="mb-1 flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
            <p className="font-semibold text-gray-800">{data.label}</p>
          </div>
          <p className="font-bold text-gray-900">{formatCurrency(data.amount)}</p>
          <p className="text-xs text-gray-600">{percentage}% of total spending</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="relative mx-auto w-full transform cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Budget card for ${category}. ${formatCurrency(spent)} spent out of ${formatCurrency(budget)}`}
    >
      <div
        className={`p-6 transition-all duration-500 ease-in-out ${
          isHovered ? 'translate-y-2 transform opacity-0' : 'translate-y-0 transform opacity-100'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-gray-800">{category}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Spent</span>
                <span className="text-sm font-semibold text-gray-800">{formatCurrency(spent)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget</span>
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(budget)}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Remaining</span>
            <span
              className={`text-sm font-semibold ${
                remaining > 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(remaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Second Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 transition-all duration-500 ease-in-out ${
          isHovered
            ? 'translate-y-0 transform opacity-100'
            : 'pointer-events-none -translate-y-2 transform opacity-0'
        }`}
      >
        <div className="flex h-full flex-row">
          {/* Left side - Pie chart */}
          <div className="relative flex w-1/2 flex-col items-center justify-center">
            {/* Container for the chart */}
            <div className="relative h-56 w-56">
              {' '}
              {/* Larger size */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                    animationBegin={0}
                    animationDuration={800}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-hover-${index}`}
                        fill={entry.color}
                        className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
                        stroke="#ffffff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Centered amount */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                {activeIndex !== null ? (
                  <>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(chartData[activeIndex].amount)}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Transaction list */}
          <div className="w-1/2 overflow-y-auto pl-4">
            <h4 className="text-md font-semibold text-gray-700">Transactions</h4>
            <ul className="">
              {chartData.map((t, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-lg p-2 transition hover:bg-white/30"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center">
                    <span
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="text-sm text-gray-800">{t.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
