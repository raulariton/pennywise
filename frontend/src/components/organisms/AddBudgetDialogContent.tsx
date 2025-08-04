import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { FormField } from '@/components/molecules/FormField';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BudgetFormData, useCreateBudget } from '@/hooks/crud/useBudget';
import CurrencySelect from '@/components/molecules/AddEntryDialog/CurrencySelect';
import { Category } from '@/hooks/crud/useCategories';
import CategorySelectWithDialog from '@/components/molecules/AddEntryDialog/CategorySelectWithDialog';
import { useState } from 'react';

const AddBudgetDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createBudget, isLoading, isError } = useCreateBudget();

  const [formData, setFormData] = useState<BudgetFormData>({
    amount: 0,
    currency: '',
    category: '',
    // Default to current year-month
    month: new Date().toISOString().slice(0, 7),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.month) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Convert YYYY-MM to YYYY-MM-01 to match backend normalization
      const fullMonthDate = `${formData.month}-01`;

      await createBudget({
        ...formData,
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
              <div className="w-full">
                <div className="relative flex rounded-lg shadow-sm">
                  <AmountInput
                    currencyCode={formData.currency}
                    inputValue={formData.amount}
                    inputOnChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                  <CurrencySelect
                    currentlySelectedCurrency={formData.currency}
                    onSelectionChange={(currency) =>
                      setFormData({ ...formData, currency: currency })
                    }
                  />
                </div>
              </div>
            </FormField>

            <FormField label="Category">
              <CategorySelectWithDialog
                currentCategory={formData.category}
                setCategory={(category: Category) => {
                  setFormData({ ...formData, category: category });
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
