// components/molecules/BudgetPieChart.tsx
'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface BudgetPieChartProps {
  data: { name: string; value: number; fill: string }[];
  totalBudget: number;
}

export const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ data, totalBudget }) => (
  <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          labelLine={false}
          stroke="none"
        >
          {data.map((entry, index) => (
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
      <p className="text-sm text-muted-foreground">Total Budget</p>
      <p className="text-3xl font-bold">${totalBudget.toLocaleString()}</p>
    </div>
  </div>
);
