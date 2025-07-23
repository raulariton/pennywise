import { Popover } from '../ui/popover';
import { PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  format?: '12' | '24';
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface TimeValue {
  hours: number;
  minutes: number;
  period?: 'AM' | 'PM';
}

const formatTime = ({ time, format } : { time: TimeValue, format: string }): string => {
  const hours = time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');

  if (format === '12') {
    return `${hours}:${minutes} ${time.period}`;
  }
  return `${hours}:${minutes}`;
};

const TimePickerTrigger = ({ value, disabled, timeValue, placeholder, onClick }) => (
  <Button
    variant="outline"
    type="button"
    className={cn(
      'w-fit justify-start text-left font-normal shadow-sm',
      !value && 'text-muted-foreground',
    )}
    disabled={disabled}
    onClick={onClick}
  >
    <Clock className="mr-2 h-4 w-4" />
    {/*{value ? formatTime(timeValue) : placeholder}*/}
    {value || placeholder}
  </Button>
)

// TODO: Review code, remove unused imports, and make it my code
const TimePickerWithDialog: React.FC<TimePickerProps> = ({
  value = '12:00',
  onChange = () => {},
  format = '12',
  placeholder = 'Select time',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState<TimeValue>(() => {
    if (value) {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      return {
        hours: format === '12' ? (hours === 0 ? 12 : hours > 12 ? hours - 12 : hours) : hours,
        minutes,
        period: format === '12' ? (period as 'AM' | 'PM') || 'AM' : undefined,
      };
    }
    return {
      hours: format === '12' ? 12 : 0,
      minutes: 0,
      period: format === '12' ? 'AM' : undefined,
    };
  });

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  // const formatTime = (time: TimeValue): string => {
  //   const hours = time.hours.toString().padStart(2, '0');
  //   const minutes = time.minutes.toString().padStart(2, '0');
  //
  //   if (format === '12') {
  //     return `${hours}:${minutes} ${time.period}`;
  //   }
  //   return `${hours}:${minutes}`;
  // };

  const updateTime = (newTime: Partial<TimeValue>) => {
    const updated = { ...timeValue, ...newTime };
    setTimeValue(updated);
    onChange(formatTime({ time: updated, format }));
  };

  const incrementHours = () => {
    const maxHours = format === '12' ? 12 : 23;
    const minHours = format === '12' ? 1 : 0;
    const newHours = timeValue.hours >= maxHours ? minHours : timeValue.hours + 1;
    updateTime({ hours: newHours });
  };

  const decrementHours = () => {
    const maxHours = format === '12' ? 12 : 23;
    const minHours = format === '12' ? 1 : 0;
    const newHours = timeValue.hours <= minHours ? maxHours : timeValue.hours - 1;
    updateTime({ hours: newHours });
  };

  const incrementMinutes = () => {
    const newMinutes = timeValue.minutes >= 59 ? 0 : timeValue.minutes + 1;
    updateTime({ minutes: newMinutes });
  };

  const decrementMinutes = () => {
    const newMinutes = timeValue.minutes <= 0 ? 59 : timeValue.minutes - 1;
    updateTime({ minutes: newMinutes });
  };

  const togglePeriod = () => {
    if (format === '12') {
      updateTime({ period: timeValue.period === 'AM' ? 'PM' : 'AM' });
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    const maxHours = format === '12' ? 12 : 23;
    const minHours = format === '12' ? 1 : 0;

    if (val >= minHours && val <= maxHours) {
      updateTime({ hours: val });
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    if (val >= 0 && val <= 59) {
      updateTime({ minutes: val });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'hours' | 'minutes') => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (type === 'hours') incrementHours();
      else incrementMinutes();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (type === 'hours') decrementHours();
      else decrementMinutes();
    }
  };

  useEffect(() => {
    if (value) {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      setTimeValue({
        hours: format === '12' ? (hours === 0 ? 12 : hours > 12 ? hours - 12 : hours) : hours,
        minutes,
        period: format === '12' ? (period as 'AM' | 'PM') || 'AM' : undefined,
      });
    }
  }, [value, format]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TimePickerTrigger
          timeValue={timeValue}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onClick={setIsOpen}
        />
      </DialogTrigger>
      <DialogContent className="w-auto p-10">
        <DialogHeader className="items-center">
          <DialogTitle>
            Select Time
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 scale-125">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={incrementHours}>
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Input
              ref={hoursRef}
              type="number"
              value={timeValue.hours.toString().padStart(2, '0')}
              onChange={handleHoursChange}
              onKeyDown={(e) => handleKeyDown(e, 'hours')}
              className="border border-border h-8 w-12 p-0 text-center focus-visible:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              min={format === '12' ? 1 : 0}
              max={format === '12' ? 12 : 23}
            />
            <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={decrementHours}>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          {/* Separator */}
          <div className="text-lg font-semibold">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={incrementMinutes}>
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Input
              ref={minutesRef}
              type="number"
              value={timeValue.minutes.toString().padStart(2, '0')}
              onChange={handleMinutesChange}
              onKeyDown={(e) => handleKeyDown(e, 'minutes')}
              className="border border-border h-8 w-12 p-0 text-center focus-visible:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              min={0}
              max={59}
            />
            <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={decrementMinutes}>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          {/* AM/PM for 12-hour format */}
          {format === '12' && (
            <div className="ml-2 flex flex-col items-center">
              <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={togglePeriod}>
                <ChevronUp className="h-3 w-3" />
              </Button>
              <div className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                {timeValue.period}
              </div>
              <Button variant="ghost" size="sm" type="button" className="h-6 w-8 p-0" onClick={togglePeriod}>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 scale-110 flex justify-between space-x-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              const now = new Date();
              const currentTime = {
                hours:
                  format === '12'
                    ? now.getHours() === 0
                      ? 12
                      : now.getHours() > 12
                        ? now.getHours() - 12
                        : now.getHours()
                    : now.getHours(),
                minutes: now.getMinutes(),
                period:
                  format === '12'
                    ? ((now.getHours() >= 12 ? 'PM' : 'AM') as 'AM' | 'PM')
                    : undefined,
              };
              setTimeValue(currentTime);
              onChange(formatTime({ time: currentTime, format }));
            }}
          >
            Now
          </Button>
          <Button variant="outline" size="sm" type="button" onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimePickerWithDialog;
