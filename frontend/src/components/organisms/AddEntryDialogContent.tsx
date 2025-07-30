import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import CalendarPickerWithDialog from '@/components/molecules/AddEntryDialog/CalendarPickerWithDialog';
import CategorySelectWithDialog from '@/components/molecules/AddEntryDialog/CategorySelectWithDialog';
import CurrencySelect from '@/components/molecules/AddEntryDialog/CurrencySelect';
import TextAreaInputWithCharacterLimit from '@/components/molecules/AddEntryDialog/TextAreaInputWithCharacterLimit';
import EntryTypeTabs from '@/components/molecules/EntryTypeTabs';
import { FormField } from '@/components/molecules/FormField';
import TimePickerWithDialog from '@/components/molecules/TimePickerWithDialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Category } from '@/hooks/crud/useCategories';
import { EntryFormData, useCreateEntry } from '@/hooks/crud/useEntries';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddEntryDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createEntry, isLoading, isError } = useCreateEntry();
  const [formData, setFormData] = useState<EntryFormData>({
    type: '',
    name: '',
    amount: 0,
    currency: '',
    description: '',
    timestamp: new Date(),
    category: '',
  });
  const [includeTime, setIncludeTime] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const createTimestamp = () => {
    const timestamp = new Date(date);

    if (!includeTime) {
      timestamp.setHours(0, 0, 0, 0);
    } else if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      timestamp.setHours(hours, minutes, 0, 0);
    }

    return timestamp;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.name ||
      !formData.amount ||
      !formData.currency ||
      !formData.category
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (formData.amount <= 0) {
      toast.error('Please enter an amount.');
      return;
    }

    // set the timestamp based on date (and time)
    const timestamp = createTimestamp();
    const submissionData = {
      ...formData,
      timestamp: timestamp,
    };

    try {
      await createEntry(submissionData);
      props.setIsOpen(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  useEffect(() => {
    if (typeof isError === 'string') {
      toast.error(isError);
    }
  }, [isError]);

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
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormField label="Type">
              <EntryTypeTabs
                value={formData.type}
                onChange={(value: string) =>
                  setFormData({
                    ...formData,
                    type: value as 'income' | 'expense',
                  })
                }
              />
            </FormField>

            <FormField label="Name">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="(e.g. Gym membership, Netflix)"
                className="border-border focus-visible:border-ring w-full rounded-lg border p-2 focus:outline-none focus-visible:outline-none"
              />
              <p className="text-muted-foreground text-sm">
                The name of your entry, or the vendor of the transaction
              </p>
            </FormField>

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

            <FormField label="Date">
              <CalendarPickerWithDialog
                dateValue={date}
                onDateChange={(date: Date | undefined) => setDate(date)}
              />
              <div className="mt-2 flex items-center space-x-3">
                <Checkbox
                  id="include-time"
                  checked={includeTime}
                  onCheckedChange={(checked) => setIncludeTime(checked as boolean)}
                  className="border-border border data-[state=checked]:border-(--theme) data-[state=checked]:bg-(--theme)"
                />
                <Label htmlFor="include-time" className="text-sm">
                  Include specific time
                </Label>
                {includeTime && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <TimePickerWithDialog
                        value={time}
                        onChange={setTime}
                        format="24"
                        placeholder="Select time"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
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

            <FormField label="Description (optional)">
              <TextAreaInputWithCharacterLimit
                onValueChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                value={formData.description}
              />
            </FormField>

            {isError && typeof isError !== 'string' && <ErrorMessage message="Submission failed" />}

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

export default AddEntryDialogContent;
