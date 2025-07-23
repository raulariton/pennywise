import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import currencies from '@/config/currencies';
import CountryFlag from '@/components/atoms/AddEntryDialog/CountryFlag';
import { Label } from '@/components/ui/label';

const CurrencySelect = ({
  currentlySelectedCurrency,
  onSelectionChange,
}: {
  currentlySelectedCurrency: string;
  onSelectionChange: (currency: string) => void;
}) => {
  return (
    <Select value={currentlySelectedCurrency} onValueChange={onSelectionChange}>
      <SelectTrigger className="fit-content border-input bg-background text-muted-foreground inline-flex min-w-fit items-center rounded-s-none rounded-e-lg px-3 text-sm">
        <SelectValue
          placeholder="Select currency"
          className="border-input bg-background text-muted-foreground inline-flex items-center rounded-e-lg border px-3 text-sm"
        />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <CountryFlag country={currency.country} />
              <Label className="text-sm">{currency.code}</Label>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
