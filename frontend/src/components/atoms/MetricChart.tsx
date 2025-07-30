'use client';
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Tooltip,
} from 'recharts';

const spendingData = [
  { month: 'Feb', value: 3200 },
  { month: 'Mar', value: 2900 },
  { month: 'Apr', value: 3400 },
  { month: 'May', value: 2700 },
  { month: 'Jun', value: 3100 },
  { month: 'Jul', value: 3247 },
];

const budgetData = [
  { month: 'Feb', used: 64, remaining: 36 },
  { month: 'Mar', used: 58, remaining: 42 },
  { month: 'Apr', used: 68, remaining: 32 },
  { month: 'May', used: 54, remaining: 46 },
  { month: 'Jun', used: 62, remaining: 38 },
  { month: 'Jul', used: 65, remaining: 35 },
];

const categoryData = [
  { name: 'Food', value: 1240, color: '#6366f1' },
  { name: 'Transport', value: 890, color: '#8b5cf6' },
  { name: 'Shopping', value: 520, color: '#06b6d4' },
  { name: 'Bills', value: 380, color: '#10b981' },
  { name: 'Other', value: 217, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md">
        {label && <p className="text-xs font-medium text-slate-600">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color || '#475569' }}>
            {entry.name}: {entry.value}
            {entry.dataKey === 'value' && entry.value > 200 ? ' $' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MetricChart({ type }: { type: 'spending' | 'budget' | 'category' }) {
  if (type === 'spending') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={spendingData}>
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            name="Expenses"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#spendingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'budget') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={budgetData}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="used" stackId="a" name="Used %" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar
            dataKey="remaining"
            stackId="a"
            name="Remaining %"
            fill="#e2e8f0"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={3}
          startAngle={90}
          endAngle={450}
        >
          {categoryData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
