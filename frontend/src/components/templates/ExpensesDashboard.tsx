// app/expenses/page.tsx
'use client';
import React from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import { ExpensesMetrics } from '../organisms/ExpenseMetrics';
import { motion } from 'framer-motion';
import { OverviewChartSection } from '@/components/molecules/OverviewChartSection';
import { MetricCardsGrid } from '@/components/molecules/MetricCardsGrid';

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
      <div className="min-h-screen">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <OverviewChartSection data={mainData} />
          <MetricCardsGrid cards={cards} />
        </motion.section>
      </div>
    </PageTemplate>
  );
}
