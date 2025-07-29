import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const CalendarPickerWithDialog = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'group hover:bg-background focus-visible:border-ring focus-visible:outline-ring/20 w-full justify-start px-3 text-left text-base font-normal outline-offset-0 focus-visible:outline-[3px]',
              !date && 'text-muted-foreground',
              'shadow-sm'
            )}
          >
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
            <span className={cn('truncate', !date && 'text-muted-foreground')}>
              {date ? format(date, 'dd/MM/yyyy') : 'Pick a date'}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle className="text-center">Select Date</DialogTitle>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="scale-110 justify-self-center p-4"
            disabled={(date) => date > new Date()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPickerWithDialog;