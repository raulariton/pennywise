'use client';

import PageTemplate from '@/components/templates/PageTemplate';
import { motion, MotionConfig } from 'framer-motion';
import React, { useState } from 'react';
import { DashboardCard } from '../organisms/DashboardCard';
import { IncomeExpenseChart } from '../organisms/IncomeExpenseChart';
import { TransactionTable } from '../organisms/TransactionTable';
import EntryModal from '../organisms/EntryModal';
import { Plus, TrendingDown, TrendingUp } from 'lucide-react';
import AddEntryDialog from '@/components/organisms/AddEntryDialog';
import DashboardCardTemplate from '@/components/templates/DashboardCardTemplate';
import { useFetchDashboardMetrics } from '@/hooks/crud/useEntries';
import { CardHeader } from '@/components/molecules/CardHeader';
import { CardFooter } from '@/components/molecules/CardFooter';
import { DashboardGraph } from '@/components/organisms/DashboardCardGraph';
import { cn } from '@/lib/utils';
import { CATEGORY_ICONS, getCategoryIcon } from '@/config/categoryIcons';

const positiveGradient = 'bg-gradient-to-r from-emerald-600 to-emerald-700';
const negativeGradient = 'bg-gradient-to-r from-red-800 to-red-900';

const positiveIcon = (icon: 'trendUp' | 'trendDown') => {

  return (
    <div className="rounded-full bg-emerald-800 text-white shadow-md p-2">
      {icon === 'trendUp' ? <TrendingUp color='currentColor'/>
        : <TrendingDown color='currentColor'/>}
    </div>
  )
}

const negativeIcon = (icon: 'trendUp' | 'trendDown') => {

  return (
    <div className="rounded-full bg-red-800 text-white shadow-md p-2">
      {icon === 'trendDown' ? <TrendingDown color='currentColor'/>
        : <TrendingUp color='currentColor'/>}
    </div>
  )
}

const ThisMonthIncomeDashboardCard = () => {
  const { metrics, isLoading, isError } = useFetchDashboardMetrics();

  const income = metrics?.totalIncomeThisMonth;
  const insight = metrics?.insights.income;
  const incomeDifference = metrics?.incomeDifference;
  const incomePercentChange = metrics?.incomePercentChange;
  const existsChange = incomeDifference !== 0 && Math.abs(incomeDifference) >= 2.5;

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.6,
      }}
    >
      <motion.div
        whileHover="hovered"
        className='group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500'
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(existsChange && { variants: { hovered: { opacity: 0, scale: 1 } }, transition: { duration: 0.25 } })}
          className="flex flex-col h-fit justify-between p-8 space-y-8"
        >
          <CardHeader title="Income" subtitle="This Month" />
          <div className="flex flex-1 items-center space-x-3">
            {incomePercentChange > 2.5 && positiveIcon('trendUp')}
            {incomePercentChange < -2.5 && negativeIcon('trendDown')}
            <span className="text-4xl font-semibold tracking-tight">{income} RON</span>
          </div>
        </motion.div>

        {existsChange && (
          <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          variants={{ hovered: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
          >
          <div
            className={cn("flex h-full flex-col p-8 space-y-4 transition-colors duration-500",
              'bg-muted',
              (incomePercentChange > 2.5 && positiveGradient) || (incomePercentChange < -2.5 && negativeGradient))}>
              <CardHeader title="Insights" />
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {insight}
                </p>
              </div>
          </div>
        </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

const ThisMonthExpensesDashboardCard = () => {
  const { metrics, isLoading, isError } = useFetchDashboardMetrics();

  // TODO: have types for all data returned by endpoints
  const expenses = metrics?.totalExpensesThisMonth;
  const insight = metrics?.insights.expenses;
  const expenseDifference = metrics?.expenseDifference;
  const expensePercentChange = metrics?.expensePercentChange;
  const existsChange = expenseDifference !== 0 && Math.abs(expenseDifference) >= 2.5;

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.6,
      }}
    >
      <motion.div
        whileHover="hovered"
        className='group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500'
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(existsChange && { variants: { hovered: { opacity: 0, scale: 1 } }, transition: { duration: 0.25 } })}
          className="flex flex-col justify-between p-8 space-y-8"
        >
          <CardHeader title="Expenses" subtitle="This Month" />
          <div className="flex flex-1 items-center space-x-3">
            {expensePercentChange > 2.5 && negativeIcon('trendUp')}
            {expensePercentChange < -2.5 && positiveIcon('trendDown')}
            <span className="text-4xl font-semibold tracking-tight">{expenses} RON</span>
          </div>
        </motion.div>

        {existsChange && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            variants={{ hovered: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <div
              className={cn("flex h-full flex-col p-8 space-y-4 transition-colors duration-500",
                'bg-muted',
                (expensePercentChange > 2.5 && negativeGradient) || (expensePercentChange < -2.5 && positiveGradient))}>
              <CardHeader title="Insights" />
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {insight}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

const TopSpendingCategoryDashboardCard = () => {
  const { metrics, isLoading, isError } = useFetchDashboardMetrics();

  if (isLoading) {
    return <div>ok</div>;
  }

  const topCategory = metrics?.topSpendingCategoryThisMonth?.category;
  const categoryAmount = metrics?.topSpendingCategoryThisMonth?.amount || 0;

  const { component: categoryIcon, color: categoryColor } = getCategoryIcon(topCategory);

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.6,
      }}
    >
      <motion.div
        whileHover="hovered"
        className='group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500'
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(topCategory && { variants: { hovered: { opacity: 0, scale: 1 } }, transition: { duration: 0.25 } })}
          className="flex flex-col justify-between p-8 space-y-4"
        >
          <CardHeader title="Top Spending Category" subtitle="This Month" />
          <div
            className="flex flex-1 items-center space-x-3 rounded-full w-fit p-3"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryIcon}
            <span className="text-xl font-semibold tracking-tight">{topCategory}</span>
          </div>
        </motion.div>

        {topCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            variants={{ hovered: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <div
              className='flex h-full flex-col p-8 space-y-8 justify-between transition-colors duration-500'
              style={{ backgroundColor: categoryColor }}
            >
              <CardHeader title={`Total spent on ${topCategory}`}/>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-white">
                  {categoryAmount.toFixed(2)} RON
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateEntry = () => {
    setShowModal(true);
  };

  /**
   * TODO: fetch total income in the last 30 days
   *  fetch total expense in the last 30 days
   *  fetch top spending category in the last 30 days
   *
   */
  /**
   * NOTE: if there are no entries, show only a "quickstart" guide
   *  see contra for inspiration
   */

  function NewEntryButton() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateEntry}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Entry
        </motion.button>
      </motion.div>
    );
  }

  function quickStatsBar() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Today</p>
          <p className="text-lg font-light text-slate-700">+$234</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">This Week</p>
          <p className="text-lg font-light text-slate-700">+$1,456</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Saved</p>
          <p className="text-lg font-light text-slate-700">$3,890</p>
        </div>
        <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Goal</p>
          <p className="text-lg font-light text-slate-700">78%</p>
        </div>
      </motion.div>
    );
  }

  function createEntryActionButtonMobile() {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCreateEntry}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 md:hidden"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    );
  }

  return (
    <PageTemplate navTitle="Dashboard" navSubtitle="Your financial overview at a glance">
      <div className="min-h-screen">
        {/* Primary Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="mb-3 text-2xl font-light">Key Metrics</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ThisMonthIncomeDashboardCard />
            <ThisMonthExpensesDashboardCard />
            <TopSpendingCategoryDashboardCard />
          </div>
        </motion.section>

        {/* Cash Flow Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mt-6 mb-3 text-2xl font-light">This Year</h2>
          {/* TODO: Add option to see weekly, 3 month and maybe custom date range chart */}
          <IncomeExpenseChart />
        </motion.section>

        {/* Transaction Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="mt-6 mb-3 text-2xl font-light">Recent Transactions</h2>
          {/*<motion.button*/}
          {/*  whileHover={{ scale: 1.05 }}*/}
          {/*  whileTap={{ scale: 0.95 }}*/}
          {/*  className="text-muted-foreground ml-2 text-sm font-medium transition-colors duration-200 hover:text-(--theme)"*/}
          {/*>*/}
          {/*  View All*/}
          {/*</motion.button>*/}
          <TransactionTable />
        </motion.section>
      </div>

      <AddEntryDialog/>
    </PageTemplate>
  );
}
