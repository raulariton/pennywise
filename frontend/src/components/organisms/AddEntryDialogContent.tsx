import React, { useEffect, useState } from 'react';
import { DialogContent, DialogDescription, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { FormField } from '@/components/molecules/FormField';
import { SelectInput } from '@/components/atoms/SelectInput';
import { TextInput } from '@/components/atoms/TextInput';
import { CategorySelect } from '@/components/atoms/CategorySelect';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { FormActions } from '@/components/molecules/FormAction';
import { EntryFormData, useCreateEntry } from '@/hooks/crud/useEntries';
import { Category } from '@/hooks/crud/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AddEntryDialogContent = () => {

  const { createEntry, isLoading, isError } = useCreateEntry();
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<EntryFormData>({
    type: 'income',
    amount: 0,
    currency: 'USD',
    description: '',
    timestamp: new Date().toISOString().split('T')[0],
    category: '',
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

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       category: selectedCategory.name,
  //     }));
  //   }
  // }, [selectedCategory]);
  //
  // useEffect(() => {
  //   if (!showModal) {
  //     onClose();
  //   }
  // }, [showModal]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a new financial entry: income or expense.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Type">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
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

            {/*TODO: add toast message*/}
            {isError && (
              <ErrorMessage message={typeof isError === 'string' ? isError : 'Submission failed'} />
            )}

            <FormActions onCancel={() => setShowModal(false)} loading={isLoading} />
          </form>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddEntryDialogContent;