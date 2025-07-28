'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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
      <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-xl font-bold text-gray-800">${totalBudget.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>Spent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewChart;
