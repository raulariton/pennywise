import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import EntryTypeTabs from '@/components/molecules/EntryTypeTabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Flag from 'react-flagkit';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CATEGORY_ICONS } from '@/config/categoryIcons';
import { Checkbox } from '@/components/ui/checkbox';
import TimePickerWithDialog from '@/components/molecules/TimePickerWithDialog';
import { AnimatePresence, motion } from 'framer-motion';
import { FormField } from '@/components/molecules/FormField';
import CountryFlag from '@/components/atoms/AddEntryDialog/CountryFlag';
import EntryCategoryItem from '@/components/atoms/AddEntryDialog/EntryCategoryItem';
import CurrencySymbol from '@/components/atoms/AddEntryDialog/CurrencySymbol';
import currencies from '@/config/currencies';
import CurrencySelect from '@/components/molecules/AddEntryDialog/CurrencySelect';
import AmountInput from '@/components/molecules/AddEntryDialog/AmountInput';
import CalendarPickerWithDialog from '@/components/molecules/AddEntryDialog/CalendarPickerWithDialog';
import TextAreaInputWithCharacterLimit from '@/components/molecules/AddEntryDialog/TextAreaInputWithCharacterLimit';
import CategorySelectWithDialog from '@/components/molecules/AddEntryDialog/CategorySelectWithDialog';
import { toast } from 'sonner';

/**
 * (e) => {
 *             const value = parseFloat(e.target.value) || '';
 *             setFormData({ ...formData, amount: value });
 *           }
 */

const AddEntryDialogContent = (props: { setIsOpen: (open: boolean) => void }) => {
  const { createEntry, isLoading, isError } = useCreateEntry();
  const [formData, setFormData] = useState<EntryFormData>({
    type: '',
    amount: 0,
    currency: '',
    description: '',
    timestamp: new Date().toISOString().split('T')[0],
    category: '',
  });
  const [includeTime, setIncludeTime] = useState(false);
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type || !formData.amount || !formData.currency || !formData.category) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await createEntry(formData);
      console.log('Entry created successfully: ', formData);
      props.setIsOpen(false);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

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

            <FormField label="Amount">
              <div className="w-full space-y-2">
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
              <CalendarPickerWithDialog />
              <div className="mt-2 flex items-center space-x-3">
                <Checkbox
                  id="include-time"
                  checked={includeTime}
                  onCheckedChange={(checked) => setIncludeTime(checked as boolean)}
                  className="border-gray-600 data-[state=checked]:border-(--theme) data-[state=checked]:bg-(--theme)"
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
                setFormData({...formData, description: e.target.value})
                }}
               value={formData.description}
              />
            </FormField>

            {/*TODO: add toast message*/}
            {isError && (
              <ErrorMessage message={typeof isError === 'string' ? isError : 'Submission failed'} />
            )}

            <div className="flex space-x-2">
              <Button
                className="flex-1"
                onClick={() => props.setIsOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                type="submit"
                disabled={isLoading}
              >
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
