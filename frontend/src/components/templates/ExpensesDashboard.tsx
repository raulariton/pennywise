// app/expenses/page.tsx
'use client';
import React from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import { ExpensesMetrics } from '../organisms/ExpenseMetrics';

const mainData = [
  { month: 'Jan', expenses: 2800, budget: 4800 },
  { month: 'Feb', expenses: 3200, budget: 5200 },
  { month: 'Mar', expenses: 2900, budget: 4900 },
  { month: 'Apr', expenses: 3400, budget: 5100 },
  { month: 'May', expenses: 2700, budget: 4700 },
  { month: 'Jun', expenses: 3100, budget: 5300 },
  { month: 'Jul', expenses: 3247, budget: 5000 },
];

const cards = [
  {
    title: 'Total Spent',
    value: '$3,247',
    subtitle: 'This month',
    backTitle: 'Spending Trends',
    backSubtitle: 'Last 6 months overview',
    icon: '💳',
    trendValue: '+12%',
  },
  {
    title: 'Budget Status',
    value: '$1,753',
    subtitle: 'Remaining',
    backTitle: 'Budget Overview',
    backSubtitle: 'Utilization trends',
    icon: '💰',
    trendValue: '35%',
  },
  {
    title: 'Top Category',
    value: 'Food',
    subtitle: '$1,240 spent',
    backTitle: 'Category Breakdown',
    backSubtitle: 'Expense by category',
    icon: '📊',
    trendValue: '-',
  },
];

export default function ExpensesDashboard() {
  return (
    <PageTemplate navTitle="Expenses" navSubtitle="Track your expenses">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent)]" />
        <ExpensesMetrics mainData={mainData} cards={cards} />
      </div>
    </PageTemplate>
  );
}
