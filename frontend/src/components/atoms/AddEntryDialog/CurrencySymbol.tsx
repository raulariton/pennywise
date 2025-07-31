import React from 'react';
import { cn } from '@/lib/utils';
import currencies from '@/config/currencies';

export const getCurrencyInfo = (currencyLocale: string, currencyCode: string) => {
  if (!currencyCode) return { symbol: '', symbolPosition: 'left' };

  const formatter = new Intl.NumberFormat(currencyLocale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  });

  // formatToParts returns an array of objects representing the formatted parts of the currency
  // including the currency symbol, which can be used to determine its position
  const parts = formatter.formatToParts(1234.56);

  // find the currency symbol
  const currencyPart = parts.find((part) => part.type === 'currency');
  const symbol = currencyPart ? currencyPart.value : '';

  // compare indices to determine the position of the currency symbol
  const indexOfCurrencySymbol = parts.findIndex((part) => part.type === 'currency');
  const indexOfIntegerPart = parts.findIndex((part) => part.type === 'integer');
  const symbolPosition = indexOfCurrencySymbol < indexOfIntegerPart ? 'left' : 'right';

  return {
    symbol,
    symbolPosition,
  };
};

const CurrencySymbol = ({
  currencyCode,
  className
}: {
  currencyCode: string;
  className?: string;
}) => {

  const currencyLocale = currencies.find(currency => currency.code === currencyCode)?.locale || 'en-US';

  const { symbol, symbolPosition } = getCurrencyInfo(currencyLocale, currencyCode);

  // TODO: dynamic positioning of the currency symbol, and not
  //  hardcoded left and right values
  return (
    <span
      className={cn(
        'text-muted-foreground pointer-events-none absolute z-10 flex h-9 items-center text-xl',
        symbolPosition === 'left' ? 'left-3' : 'right-[7.5rem]',
        className
      )}
    >
      {symbol}
    </span>
  );
};

export default CurrencySymbol;
