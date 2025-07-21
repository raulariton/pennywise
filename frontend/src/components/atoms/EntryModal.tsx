'use client';

import axios from 'axios';
import React, { useState } from 'react';

import { useCreateEntry, EntryFormData } from '../../hooks/useEntries';

const EntryModal = () => {
  const { createEntry, loading, error } = useCreateEntry();
  const [showModal, setShowModal] = useState(true); // Toggle this manually or via props
  const [formData, setFormData] = useState<EntryFormData>({
    type: 'income',
    amount: 0,
    currency: 'USD',
    description: '',
    timestamp: new Date().toISOString().split('T')[0],
    categoryName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const created = await createEntry(formData);
      console.log('Entry created:', created);
      setShowModal(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">New Financial Entry</h2>
          <p className="text-sm text-gray-500">Track your income or expense</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Entry Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Currency</label>
            <input
              type="text"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              value={formData.timestamp}
              onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Category</label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;
