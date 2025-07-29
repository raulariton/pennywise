import React from 'react';
import CurrencySymbol from '@/components/atoms/AddEntryDialog/CurrencySymbol';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const AmountInput = ({
  currencyCode,
  inputValue,
  inputOnChange,
}: {
  currencyCode: string;
  inputValue: number;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {currencyCode && <CurrencySymbol currencyCode={currencyCode} />}
      <Input
        className={cn(
          'rounded-e-none ps-8 shadow-none [&::-webkit-outer-spin-button]:appearance-none',
          '[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',
          'focus:outline-none focus-visible:ring-0',
          'text-xl',
        )}
        placeholder="0.00"
        type="number"
        step="0.01"
        value={inputValue}
        onChange={inputOnChange}
        onBlur={(e) => {
          const value = parseFloat(e.target.value) || 0;
          const rounded = Math.round(value * 100) / 100;
          inputOnChange({ target: { value: rounded.toString() } });
        }}
      />
    </>
  );
};

export default AmountInput;
