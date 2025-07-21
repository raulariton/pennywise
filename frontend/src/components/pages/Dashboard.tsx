'use client';

import PageTemplate from '@/components/templates/PageTemplate';
import useApiClientPrivate from '@/hooks/useApiClientPrivate';
import { DashboardCard } from '../atoms/DashboardCard';
import { MotionConfig, motion } from 'framer-motion';
import { IncomeExpenseChart } from '../atoms/IncomeExpenseChart';
import { TransactionTable } from '../atoms/TransactionTable';
import React, { useState } from 'react';
import { useCreateEntry, EntryFormData } from '../../hooks/useEntries';
import EntryModal from '../atoms/EntryModal';

export default function DashboardPage() {
  const apiClientPrivate = useApiClientPrivate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'income',
    amount: 0,
    currency: 'USD',
    description: '',
    timestamp: new Date().toISOString().split('T')[0],
    categoryName: '',
  });

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

  return (
    <PageTemplate
    navTitle="Dashboard"
    navSubtitle="Your financial overview at a glance">
      <div className="min-h-screen">
        {/* Primary Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="mb-3 text-2xl font-light">Key Metrics</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <DashboardCard
              title="Total Income"
              amount="$24,500"
              change={12.5}
              data={[
                20000, 21500, 19800, 22300, 21900, 23100, 22800, 24200, 23600, 24800, 23900,
                24500,
              ]}
            />
            <DashboardCard
              title="Total Expenses"
              amount="$6,800"
              change={5.2}
              data={[6200, 6400, 6100, 6600, 6300, 6700, 6500, 6900, 6600, 7000, 6750, 6800]}
            />
            <DashboardCard
              title="Top Spending Category"
              amount="$45,820"
              change={7.8}
              period="vs last quarter"
              data={[
                38000, 39500, 37200, 41800, 40300, 42900, 41600, 44200, 43100, 45600, 44200,
                45820,
              ]}
            />
          </div>
        </motion.section>

        {/* Cash Flow Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mt-6 mb-3 text-2xl font-light">This Month</h2>
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
          <TransactionTable />
        </motion.section>
      </div>
      {showModal && <EntryModal />}
    </PageTemplate>
  );
}
