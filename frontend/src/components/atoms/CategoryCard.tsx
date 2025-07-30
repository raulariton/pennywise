'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#F97316', // orange-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
];

const BudgetCard: React.FC<BudgetCardProps> = ({ category, spent, budget, transactions }) => {
  const [isHovered, setIsHovered] = useState(false);

  const progressPercentage = Math.min((spent / budget) * 100, 100);
  const remaining = Math.max(budget - spent, 0);

  // Prepare data for pie chart
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.amount / spent) * 100).toFixed(1);
      return (
        <div className="max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
            <p className="font-semibold text-gray-800">{data.label}</p>
          </div>
          <p className="mb-1 text-lg font-bold text-gray-900">{formatCurrency(data.amount)}</p>
          <p className="text-sm text-gray-600">{percentage}% of total spending</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Budget card for ${category}. ${formatCurrency(spent)} spent out of ${formatCurrency(budget)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsHovered(!isHovered);
        }
      }}
    >
      {/* First Layer - Default View */}
      <div
        className={`p-8 transition-all duration-500 ease-in-out ${
          isHovered ? 'translate-y-2 transform opacity-0' : 'translate-y-0 transform opacity-100'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="mb-6">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">{category}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Spent</span>
                <span className="text-base font-semibold text-gray-800">
                  {formatCurrency(spent)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Budget</span>
                <span className="text-base font-semibold text-gray-800">
                  {formatCurrency(budget)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium text-gray-700">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
                aria-label={`${progressPercentage.toFixed(1)}% of budget used`}
              />
            </div>
          </div>

          {/* Remaining Budget */}
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-600">Remaining</span>
            <span
              className={`text-base font-semibold ${
                remaining > 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(remaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Second Layer - Hover View with Detailed Pie Chart */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 transition-all duration-500 ease-in-out ${
          isHovered
            ? 'translate-y-0 transform opacity-100'
            : 'pointer-events-none -translate-y-2 transform opacity-0'
        }`}
      >
        <div className="flex h-full flex-col">
          <h3 className="mb-4 text-center text-xl font-bold text-gray-800">{category} Breakdown</h3>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="amount"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-hover-${index}`}
                        fill={entry.color}
                        className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with sample data
const App: React.FC = () => {
  const sampleData = {
    category: 'Health',
    spent: 850,
    budget: 1000,
    transactions: [
      { label: 'Doctor Visit', amount: 300 },
      { label: 'Pharmacy', amount: 120 },
      { label: 'Gym Membership', amount: 180 },
      { label: 'Supplements', amount: 85 },
      { label: 'Dental Checkup', amount: 165 },
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Interactive Budget Card
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Hover over the card to see the transaction breakdown
        </p>
        <BudgetCard {...sampleData} />
      </div>
    </div>
  );
};

export default App;
