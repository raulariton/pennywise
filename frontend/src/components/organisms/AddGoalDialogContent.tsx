import React, { useState } from 'react';
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
import { useCreateGoal } from '@/hooks/crud/useGoals'; // <-- make sure the hook path matches your project
import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import TextAreaInputWithCharacterLimit from '@/components/molecules/AddEntryDialog/TextAreaInputWithCharacterLimit';

const AddGoalDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createGoal, isLoading, isError } = useCreateGoal();

  const [formData, setFormData] = useState<{
    title: string;
    targetAmount: number;
    currentAmount?: number;
    dueDate?: string;
    description?: string; // optional if you later add description
  }>({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    dueDate: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.targetAmount) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await createGoal({
        title: formData.title,
        targetAmount: formData.targetAmount,
        currentAmount: formData.currentAmount ?? 0,
        dueDate: formData.dueDate || undefined,
      });

      console.log('Goal created successfully: ', formData);
      props.setIsOpen(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Financial Goal</DialogTitle>
        <DialogDescription>
          Define a financial goal you want to achieve over time.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Goal Title">
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Emergency Fund"
              />
            </FormField>

            <FormField label="Target Amount">
              <AmountInput
                currencyCode="USD"
                inputValue={formData.targetAmount}
                inputOnChange={(e) =>
                  setFormData({ ...formData, targetAmount: parseFloat(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Current Amount (optional)">
              <AmountInput
                currencyCode="USD"
                inputValue={formData.currentAmount || 0}
                inputOnChange={(e) =>
                  setFormData({ ...formData, currentAmount: parseFloat(e.target.value) })
                }
              />
            </FormField>

            <FormField label="Due Date (optional)">
              <input
                type="date"
                className="border rounded p-2 w-full"
                value={formData.dueDate || ''}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </FormField>

            {/* Optional description */}
            <FormField label="Description (optional)">
              <TextAreaInputWithCharacterLimit
                onValueChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                value={formData.description || ''}
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

export default AddGoalDialogContent;
