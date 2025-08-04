import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import CategorySelectWithDialog from '@/components/molecules/AddEntryDialog/CategorySelectWithDialog';
import CurrencySelect from '@/components/molecules/AddEntryDialog/CurrencySelect';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BudgetFormData, useCreateBudget } from '@/hooks/crud/useBudget';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const AddBudgetDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createBudget, isLoading, isError } = useCreateBudget();

  const [formData, setFormData] = useState<BudgetFormData>({
    amount: 0,
    currency: 'USD', // Set a default currency instead of empty string
    categoryName: '',
    // Default to current year-month
    month: new Date().toISOString().slice(0, 7),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // More comprehensive validation
    const validationErrors: string[] = [];

    if (!formData.amount || formData.amount <= 0) {
      validationErrors.push('Amount must be greater than 0');
    }

    if (!formData.categoryName || formData.categoryName.trim() === '') {
      validationErrors.push('Category is required');
    }

    if (!formData.currency || formData.currency.trim() === '') {
      validationErrors.push('Currency is required');
    }

    if (!formData.month || formData.month.trim() === '') {
      validationErrors.push('Month is required');
    }

    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(', '));
      return;
    }

    try {
      // Convert YYYY-MM to YYYY-MM-01 to match backend normalization
      const fullMonthDate = `${formData.month}-01`;

      // Create the payload with proper validation
      const budgetPayload = {
        amount: Number(formData.amount), // Ensure it's a number
        currency: formData.currency.trim(),
        categoryName: formData.categoryName.trim(),
        month: fullMonthDate,
      };

      console.log('Submitting budget data:', budgetPayload);

      await createBudget(budgetPayload);

      console.log('Budget created successfully');
      toast.success('Budget created successfully!');
      props.setIsOpen(false);
    } catch (err) {
      console.error('Submission failed', err);
      // Error is handled by the hook, but we can show additional feedback
      toast.error('Failed to create budget. Please try again.');
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
            <FormField label="Amount *">
              <div className="w-full">
                <div className="relative flex rounded-lg shadow-sm">
                  <AmountInput
                    currencyCode={formData.currency}
                    inputValue={formData.amount}
                    inputOnChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setFormData({
                        ...formData,
                        amount: isNaN(value) ? 0 : value,
                      });
                    }}
                  />
                  <CurrencySelect
                    currentlySelectedCurrency={formData.currency}
                    onSelectionChange={(currency) => {
                      // Ensure currency is not empty
                      if (currency && currency.trim() !== '') {
                        setFormData({ ...formData, currency: currency.trim() });
                      }
                    }}
                  />
                </div>
              </div>
            </FormField>

            <FormField label="Category *">
              <CategorySelectWithDialog
                currentCategory={formData.categoryName}
                setCategory={(category: string) => {
                  if (category) {
                    setFormData({ ...formData, categoryName: category.trim() });
                  }
                }}
              />
            </FormField>

            <FormField label="Month *">
              <input
                type="month"
                className="border rounded p-2 w-full"
                value={formData.month}
                onChange={(e) => {
                  if (e.target.value) {
                    setFormData({ ...formData, month: e.target.value });
                  }
                }}
                required
              />
            </FormField>

            {isError && (
              <ErrorMessage message={typeof isError === 'string' ? isError : 'Submission failed'} />
            )}

            <div className="flex space-x-2">
              <Button
                className="flex-1"
                onClick={() => props.setIsOpen(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button className="flex-1" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Budget'
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
