'use client';

import { useEffect, useState } from 'react';
import { useCreateEntry, EntryFormData } from '../../hooks/useEntries';
import { FormField } from '../molecules/FormField';
import { SelectInput } from '../atoms/SelectInput';
import { TextInput } from '../atoms/TextInput';
import { FormActions } from '../molecules/FormAction';
import { ErrorMessage } from '../atoms/ErrorMessage';
import { CategorySelect } from '../atoms/CategorySelect';
import { Category } from '@/hooks/useCategories';

const EntryModal = ({ onClose }: { onClose: () => void }) => {
  const { createEntry, loading, error } = useCreateEntry();
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
      await createEntry(formData);
      setShowModal(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        categoryName: selectedCategory.name,
      }));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!showModal) {
      onClose();
    }
  }, [showModal, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">New Financial Entry</h2>
          <p className="text-sm text-gray-500">Track your income or expense</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Type">
            <SelectInput
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })
              }
              options={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
              ]}
            />
          </FormField>

          <FormField label="Amount">
            <TextInput
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
              required
            />
          </FormField>

          <FormField label="Currency">
            <TextInput
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Description">
            <TextInput
              value={formData.description ?? ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional"
            />
          </FormField>

          <FormField label="Date">
            <TextInput
              type="date"
              value={formData.timestamp}
              onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Category">
            <CategorySelect
              value={selectedCategory}
              onChange={(category) => setSelectedCategory(category)}
              placeholder="Search or select a category"
            />
          </FormField>

          {error && (
            <ErrorMessage message={typeof error === 'string' ? error : 'Submission failed'} />
          )}

          <FormActions onCancel={() => setShowModal(false)} loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default EntryModal;
