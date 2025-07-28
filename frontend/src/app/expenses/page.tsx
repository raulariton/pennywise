'use client';
import MetricCard from '@/components/atoms/MetricCard';
import MetricChart from '@/components/atoms/MetricChart';
import PageTemplate from '@/components/templates/PageTemplate';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';

const mainData = [
  { month: 'Jan', expenses: 2800, budget: 4800 },
  { month: 'Feb', expenses: 3200, budget: 5200 },
  { month: 'Mar', expenses: 2900, budget: 4900 },
  { month: 'Apr', expenses: 3400, budget: 5100 },
  { month: 'May', expenses: 2700, budget: 4700 },
  { month: 'Jun', expenses: 3100, budget: 5300 },
  { month: 'Jul', expenses: 3247, budget: 5000 },
];

const miniSpending = mainData.slice(1).map((d) => ({
  month: d.month,
  value: d.expenses,
}));

const miniBudget = [
  { month: 'Feb', used: 64, remaining: 36 },
  { month: 'Mar', used: 58, remaining: 42 },
  { month: 'Apr', used: 68, remaining: 32 },
  { month: 'May', used: 54, remaining: 46 },
  { month: 'Jun', used: 62, remaining: 38 },
  { month: 'Jul', used: 65, remaining: 35 },
];

const miniCategory = [
  { name: 'Food', value: 1240, color: '#6366f1' },
  { name: 'Transport', value: 890, color: '#8b5cf6' },
  { name: 'Shopping', value: 520, color: '#06b6d4' },
  { name: 'Bills', value: 380, color: '#10b981' },
  { name: 'Other', value: 217, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ExpensesDashboard() {
  const cards = [
    {
      title: 'Total Spent',
      value: '$3,247',
      change: '12% from last month',
      changeType: 'negative' as const,
      icon: '💳',
      iconBg: 'bg-gradient-to-br from-red-500 to-pink-600',
      type: 'spending' as const,
      expandedTitle: 'Spending Analysis',
      expandedSubtitle: 'Monthly spending trends and patterns',
    },
    {
      title: 'Budget Status',
      value: '$1,753',
      change: '35% remaining',
      changeType: 'positive' as const,
      icon: '💰',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      type: 'budget' as const,
      expandedTitle: 'Budget Overview',
      expandedSubtitle: 'Budget utilization across months',
    },
    {
      title: 'Top Category',
      value: 'Food',
      change: '$1,240 spent',
      changeType: 'negative' as const,
      icon: '📊',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      type: 'category' as const,
      expandedTitle: 'Category Breakdown',
      expandedSubtitle: 'Expense distribution by category',
    },
  ];

  return (
    <>
      <PageTemplate navTitle="Expenses" navSubtitle="Track your expenses">
        <div className="relative min-h-screen overflow-hidden">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-8 py-16">
            {/* Top Chart */}
            <section className="mb-16 rounded-[2rem] border bg-white/70 p-12 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl">
              <div className="mb-10 text-center">
                <h2 className="mb-3 text-3xl font-light tracking-tight text-slate-900">
                  Monthly Overview
                </h2>
                <p className="text-lg font-light text-slate-600">Expenses vs Budget Comparison</p>
              </div>
              <div className="h-[28rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mainData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stroke="#10b981"
                      fill="url(#budgetGradient)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#6366f1"
                      fill="url(#expensesGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Metrics Cards */}
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, idx) => (
                <MetricCard
                  title="Total Spent"
                  value="$3,247"
                  subtitle="This month"
                  backTitle="Spending Trends"
                  backSubtitle="Last 6 months overview"
                  icon="💳"
                  frontTrend="+12%"
                  frontChange="vs last month"
                  averageValue="200"
                  trendValue="-12%"
                >
                  <div className="h-full">
                    <MetricChart type="spending" />
                  </div>
                </MetricCard>
              ))}
            </section>
          </div>

          <style jsx global>{`
            .perspective-1000 {
              perspective: 1000px;
            }
            .transform-style-preserve-3d {
              transform-style: preserve-3d;
            }
            .backface-hidden {
              backface-visibility: hidden;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
          `}</style>
        </div>
      </PageTemplate>
    </>
  );
}
