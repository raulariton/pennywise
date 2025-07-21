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
  const { createEntry, loading, error } = useCreateEntry();
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

  return (
    <PageTemplate>
      <div className="min-h-screen">
        <div className="fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg transition hover:bg-blue-700"
          >
            + New Entry
          </button>
        </div>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-gray-100 bg-white"
        >
          <div className="mx-auto max-w-6xl px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-gray-900">Financial Dashboard</h1>
                <p className="mt-1 text-gray-500">Track your financial progress with clarity</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-sm font-medium text-gray-600">December 2024</p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="mx-auto max-w-6xl space-y-12 px-8 py-12">
          {/* Primary Metrics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="mb-6 text-lg font-light text-gray-700">Key Metrics</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <DashboardCard
                title="Total Balance"
                amount="$24,500"
                change={12.5}
                data={[
                  20000, 21500, 19800, 22300, 21900, 23100, 22800, 24200, 23600, 24800, 23900,
                  24500,
                ]}
              />
              <DashboardCard
                title="Monthly Income"
                amount="$6,800"
                change={5.2}
                data={[6200, 6400, 6100, 6600, 6300, 6700, 6500, 6900, 6600, 7000, 6750, 6800]}
              />
              <DashboardCard
                title="Net Worth"
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
            <h2 className="mb-6 text-lg font-light text-gray-700">Monthly Overview</h2>
            <IncomeExpenseChart />
          </motion.section>

          {/* Transaction Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-6 text-lg font-light text-gray-700">Recent Transactions</h2>
            <TransactionTable />
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-200 pt-8"
          >
            <div className="text-center text-sm text-gray-400">
              <p>Financial data is updated monthly • All amounts in USD</p>
            </div>
          </motion.footer>
        </div>
      </div>
      {showModal && <EntryModal />}
    </PageTemplate>
  );
}
