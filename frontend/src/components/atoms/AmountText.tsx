import currencies from '@/config/currencies';
import { getCurrencyInfo } from '@/components/atoms/AddEntryDialog/CurrencySymbol';

export const AmountText = ({
  amount,
  currencyCode,
  type,
}: {
  amount: number;
  currencyCode: string;
  type: 'income' | 'expense';
}) => {
  const prefix = type === 'income' ? '+' : '-';

  const currencyLocale = currencies.find(currency => currency.code === currencyCode)?.locale || 'en-US';

  const { symbol, symbolPosition } = getCurrencyInfo(currencyLocale, currencyCode);

  const amountText = symbolPosition === 'left' ?
    `${prefix}${symbol}${amount.toLocaleString()}` :
    `${prefix}${amount.toLocaleString()} ${symbol}`;

  return (
    <span className={type === 'income' ? 'text-emerald-600' : 'text-red-600'}>
      {amountText}
    </span>
  );
};
