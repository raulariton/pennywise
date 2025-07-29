'use client';

import React, { useState } from 'react';
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
import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Calendar,
  Plus,
  Settings,
  Bell,
  User,
} from 'lucide-react';
import PageTemplate from '@/components/templates/PageTemplate';
import BudgetOverviewChart from '@/components/organisms/BudgetOverviewChart';
import BudgetList from '@/components/organisms/BudgetList';
import GoalList from '@/components/organisms/GoalList';

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

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
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

const Dashboard: React.FC = () => {
  const budgetData = [
    {
      category: 'Food & Dining',
      spent: 847,
      budget: 1000,
      transactions: [
        { label: 'Restaurants', amount: 420 },
        { label: 'Groceries', amount: 280 },
        { label: 'Coffee Shops', amount: 90 },
        { label: 'Delivery', amount: 57 },
      ],
    },
    {
      category: 'Transportation',
      spent: 340,
      budget: 500,
      transactions: [
        { label: 'Gas', amount: 180 },
        { label: 'Public Transit', amount: 85 },
        { label: 'Uber/Lyft', amount: 75 },
      ],
    },
    {
      category: 'Entertainment',
      spent: 285,
      budget: 400,
      transactions: [
        { label: 'Movies', amount: 120 },
        { label: 'Streaming', amount: 65 },
        { label: 'Games', amount: 55 },
        { label: 'Events', amount: 45 },
      ],
    },
    {
      category: 'Shopping',
      spent: 520,
      budget: 600,
      transactions: [
        { label: 'Clothing', amount: 280 },
        { label: 'Electronics', amount: 150 },
        { label: 'Home & Garden', amount: 90 },
      ],
    },
  ];

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      target: 10000,
      current: 7500,
      deadline: 'Dec 2025',
      category: 'savings',
    },
    {
      id: '2',
      title: 'Investment Portfolio',
      target: 25000,
      current: 18500,
      deadline: 'Jun 2026',
      category: 'investment',
    },
    {
      id: '3',
      title: 'Pay Off Credit Card',
      target: 5000,
      current: 3200,
      deadline: 'Mar 2025',
      category: 'debt',
    },
    {
      id: '4',
      title: 'New MacBook Pro',
      target: 2500,
      current: 1200,
      deadline: 'Sep 2025',
      category: 'purchase',
    },
  ];

  const monthlyData = [
    { month: 'Jan', income: 5200, expenses: 3800 },
    { month: 'Feb', income: 5200, expenses: 4100 },
    { month: 'Mar', income: 5500, expenses: 3900 },
    { month: 'Apr', income: 5200, expenses: 4200 },
    { month: 'May', income: 5200, expenses: 3700 },
    { month: 'Jun', income: 5800, expenses: 4000 },
  ];

  return (
    <PageTemplate navTitle="Budget and Goals" navSubtitle="Track your budget and goals">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <BudgetOverviewChart totalSpent={3000} totalRemaining={500} totalBudget={3500} />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BudgetList budgets={budgetData} />
          </div>
          <GoalList goals={goals} />
        </div>
      </div>
    </PageTemplate>
  );
};

export default Dashboard;
