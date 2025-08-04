'use client';

import { useFetchEntries } from '@/hooks/crud/useEntries';
import { useMemo, useState } from 'react';
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

// Date utility functions
const formatDate = (date, format) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (format === 'MMM yyyy') {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  if (format === 'yyyy-MM') {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}`;
  }
  return date.toISOString();
};

const subMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};

const subYears = (date, years) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() - years);
  return result;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const income = payload.find((p) => p.dataKey === 'income')?.value || 0;
    const expenses = payload.find((p) => p.dataKey === 'expenses')?.value || 0;
    const net = income - expenses;

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-green-600">Income: ${Math.round(income).toLocaleString()}</p>
          <p className="text-red-600">Expenses: ${Math.round(expenses).toLocaleString()}</p>
          <hr className="my-2" />
          <p className={`font-semibold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Net: ${Math.round(net).toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function IncomeVsExpensesChart() {
  const [period, setPeriod] = useState('6m');

  // Replace this with your actual hook: const { entries, isLoading } = useFetchEntries({ url: '/entries' });
  const { entries, isLoading } = useFetchEntries({
    url: `/entries`,
  });
  console.log(entries);

  // Filter data based on selected period
  const filteredData = useMemo(() => {
    if (!entries) return [];

    const now = new Date();
    let startDate = new Date();

    if (period === '6m') startDate = subMonths(now, 6);
    else if (period === '1y') startDate = subYears(now, 1);
    else startDate = subYears(now, 5);

    return entries.filter((entry) => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= startDate && entryDate <= now;
    });
  }, [entries, period]);

  // Group entries by month
  const chartData = useMemo(() => {
    if (!filteredData.length) return [];

    const monthly = {};

    filteredData.forEach((entry) => {
      const date = new Date(entry.timestamp);
      const key = formatDate(date, 'yyyy-MM');
      const displayMonth = formatDate(date, 'MMM yyyy');

      if (!monthly[key]) {
        monthly[key] = {
          month: displayMonth,
          sortKey: key,
          income: 0,
          expenses: 0,
        };
      }

      if (entry.type === 'income') {
        monthly[key].income += entry.amount;
      } else if (entry.type === 'expense') {
        monthly[key].expenses += entry.amount;
      }
    });

    return Object.values(monthly)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .map(({ sortKey, ...rest }) => rest);
  }, [filteredData]);

  return (
    <div className="w-full h-[450px] bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Income vs Expenses</h2>

        {/* Period selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['6m', '1y', '5y'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 ${
                period === p
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-500">Loading...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No data available for this period</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
