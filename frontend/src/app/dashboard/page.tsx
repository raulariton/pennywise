'use client';

import AddEntryFloatingButton from '@/components/atoms/AddEntryFloatingButton';
import { CardHeader } from '@/components/molecules/CardHeader';
import AddEntryDialog from '@/components/organisms/AddEntryDialog';
import { IncomeExpenseChart } from '@/components/organisms/IncomeExpenseChart';
import { TransactionTable } from '@/components/organisms/TransactionTable';
import PageTemplate from '@/components/templates/PageTemplate';
import { getCategoryIcon } from '@/config/categoryIcons';
import { useFetchDashboardMetrics } from '@/hooks/crud/useEntries';
import { cn } from '@/lib/utils';
import { motion, MotionConfig } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const positiveGradient = 'bg-gradient-to-r from-emerald-600 to-emerald-700';
const negativeGradient = 'bg-gradient-to-r from-red-800 to-red-900';

const positiveIcon = (icon: 'trendUp' | 'trendDown') => {
  return (
    <div className="rounded-full bg-emerald-800 text-white shadow-md p-2">
      {icon === 'trendUp' ? (
        <TrendingUp color="currentColor" />
      ) : (
        <TrendingDown color="currentColor" />
      )}
    </div>
  );
};

const negativeIcon = (icon: 'trendUp' | 'trendDown') => {
  return (
    <div className="rounded-full bg-red-800 text-white shadow-md p-2">
      {icon === 'trendDown' ? (
        <TrendingDown color="currentColor" />
      ) : (
        <TrendingUp color="currentColor" />
      )}
    </div>
  );
};

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
        className="group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500"
        style={{ background: 'var(--gradient-background)' }}
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(existsChange && {
            variants: { hovered: { opacity: 0, scale: 1 } },
            transition: { duration: 0.25 },
          })}
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
              className={cn(
                'flex h-full flex-col p-8 space-y-4 transition-colors duration-500',
                'bg-muted',
                (incomePercentChange > 2.5 && positiveGradient) ||
                  (incomePercentChange < -2.5 && negativeGradient),
              )}
            >
              <CardHeader title="Insights" />
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">{insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  );
};

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
        className="group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500"
        style={{ background: 'var(--gradient-background)' }}
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(existsChange && {
            variants: { hovered: { opacity: 0, scale: 1 } },
            transition: { duration: 0.25 },
          })}
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
              className={cn(
                'flex h-full flex-col p-8 space-y-4 transition-colors duration-500',
                'bg-muted',
                (expensePercentChange > 2.5 && negativeGradient) ||
                  (expensePercentChange < -2.5 && positiveGradient),
              )}
            >
              <CardHeader title="Insights" />
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">{insight}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  );
};

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
        className="group border-border relative w-full h-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500"
        style={{ background: 'var(--gradient-background)' }}
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          {...(topCategory && {
            variants: { hovered: { opacity: 0, scale: 1 } },
            transition: { duration: 0.25 },
          })}
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
              className="flex h-full flex-col p-8 space-y-8 justify-between transition-colors duration-500"
              style={{ backgroundColor: categoryColor }}
            >
              <CardHeader title={`Total spent on ${topCategory}`} />
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
  );
};

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateEntry = () => {
    setShowModal(true);
  };

  return (
    <PageTemplate title="Dashboard" subtitle="Your financial overview at a glance">
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
      <AddEntryDialog open={showModal} setOpen={setShowModal} />
      <AddEntryFloatingButton onClick={() => setShowModal(true)} />
    </PageTemplate>
  );
}
