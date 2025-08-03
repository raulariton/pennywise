'use client';

import { QuickStats } from '@/components/atoms/QuickStats';
import AddBudgetDialog from '@/components/organisms/AddBudgetDialog';
import AddGoalDialog from '@/components/organisms/AddGoalDialog';
import BudgetList from '@/components/organisms/BudgetList';

import GoalList from '@/components/organisms/GoalList';
import { MonthPicker } from '@/components/organisms/MonthCalendar';
import PageTemplate from '@/components/templates/PageTemplate';
import { useFetchBudgets } from '@/hooks/crud/useBudget';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

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
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const { budgets, isLoading, isError } = useFetchBudgets(selectedMonth);
  const { budgetSum, spentSum } = (budgets || []).reduce(
    (acc: { budgetSum: number; spentSum: number }, budget: any) => {
      // backend response contains budget.amount and budget.spent
      acc.budgetSum += budget.budget ?? budget.amount ?? 0; // depending on your API field name
      acc.spentSum += budget.spent ?? 0;
      return acc;
    },
    { budgetSum: 0, spentSum: 0 },
  );

  const remainingSum = Math.max(budgetSum - spentSum, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTemplate navTitle="Budget & Goals" navSubtitle="Track your financial progress">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div></div>

              {/* Month Picker with better styling */}
              <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
            </div>

            {/* Quick Stats */}
            <QuickStats
              totalSpent={spentSum}
              totalBudget={budgetSum}
              totalRemaining={remainingSum}
            />
          </motion.div>

          {/* Main Content Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Budget List - Takes up majority of space */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Budget Categories
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Track spending across different categories
                    </p>
                  </div>
                  <div className="p-6">
                    <BudgetList month={selectedMonth} setIsOpen={setBudgetOpen} />
                  </div>
                </div>
              </div>

              {/* Goals List - Sidebar with optimal width */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden h-fit sticky top-6">
                  <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Financial Goals
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Monitor your progress
                    </p>
                  </div>
                  <div className="p-6">
                    <GoalList setIsOpen={setGoalsOpen} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dialogs */}
        <AddBudgetDialog isOpen={budgetOpen} setIsOpen={setBudgetOpen} />
        <AddGoalDialog isOpen={goalsOpen} setIsOpen={setGoalsOpen} />
      </div>
    </PageTemplate>
  );
};

export default Dashboard;
