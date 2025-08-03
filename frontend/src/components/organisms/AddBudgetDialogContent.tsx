import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateBudget } from '@/hooks/crud/useBudget';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import CategorySelectWithId from '../molecules/CategorySelectWithId';

const AddBudgetDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createBudget, isLoading, isError } = useCreateBudget();

  const [formData, setFormData] = useState<{
    amount: number;
    categoryName: string;
    description?: string;
    month: string;
  }>({
    amount: 0,
    categoryName: '',
    description: '',
    // Default to current year-month
    month: new Date().toISOString().slice(0, 7),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.categoryName || !formData.month) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Convert YYYY-MM to YYYY-MM-01 to match backend normalization
      const fullMonthDate = `${formData.month}-01`;

      await createBudget({
        amount: formData.amount,
        categoryName: formData.categoryName,
        description: formData.description,
        month: fullMonthDate,
      });

      console.log('Budget created successfully: ', formData);
      props.setIsOpen(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Budget</DialogTitle>
        <DialogDescription>Define a planned budget for a specific category.</DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Amount">
              <AmountInput
                currencyCode="USD"
                inputValue={formData.amount}
                inputOnChange={(e) =>
                  setFormData({ ...formData, amount: parseFloat(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Category">
              <CategorySelectWithId
                currentCategory={formData.categoryName}
                setCategory={(categoryName) => {
                  setFormData({ ...formData, categoryName });
                }}
              />
            </FormField>

            <FormField label="Month">
              <input
                type="month"
                className="border rounded p-2 w-full"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              />
            </FormField>

            {isError && (
              <ErrorMessage message={typeof isError === 'string' ? isError : 'Submission failed'} />
            )}

            <div className="flex space-x-2">
              <Button className="flex-1" onClick={() => props.setIsOpen(false)} type="button">
                Cancel
              </Button>
              <Button className="flex-1" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddBudgetDialogContent;
