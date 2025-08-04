'use client';

import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Example datasets
const data6Months = [
  { month: 'Jan', income: 4500, expenses: 3200 },
  { month: 'Feb', income: 4800, expenses: 3500 },
  { month: 'Mar', income: 4600, expenses: 3100 },
  { month: 'Apr', income: 5200, expenses: 3800 },
  { month: 'May', income: 4900, expenses: 3400 },
  { month: 'Jun', income: 5100, expenses: 3600 },
];

const data1Year = [
  { month: 'Jul', income: 4800, expenses: 3300 },
  { month: 'Aug', income: 4700, expenses: 3400 },
  ...data6Months, // reuse last 6 months
];

const data5Years = Array.from({ length: 5 * 12 }).map((_, i) => {
  const year = 2020 + Math.floor(i / 12);
  const month = (i % 12) + 1;
  return {
    month: `${year}-${month.toString().padStart(2, '0')}`,
    income: 4000 + Math.random() * 2000,
    expenses: 3000 + Math.random() * 1500,
  };
});

export default function IncomeVsExpensesChart() {
  const [period, setPeriod] = useState<'6m' | '1y' | '5y'>('6m');

  const getData = () => {
    switch (period) {
      case '1y':
        return data1Year;
      case '5y':
        return data5Years;
      default:
        return data6Months;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setPeriod('6m')}
            className={`px-3 py-1 font-semibold rounded-full ${
              period === '6m' ? 'bg-cyan-600 hover:bg-cyan-700 text-primary-foreground' : 'bg-input'
            }`}
          >
            6M
          </button>
          <button
            onClick={() => setPeriod('1y')}
            className={`px-3 py-1 font-semibold rounded-full ${
              period === '1y' ? 'bg-cyan-600 hover:bg-cyan-700 text-primary-foreground' : 'bg-input'
            }`}
          >
            1Y
          </button>
          <button
            onClick={() => setPeriod('5y')}
            className={`px-3 py-1 font-semibold rounded-full ${
              period === '5y' ? 'bg-cyan-600 hover:bg-cyan-700 text-primary-foreground' : 'bg-input'
            }`}
          >
            5Y
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={450} className="mb-5">
        <LineChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} />
          <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
