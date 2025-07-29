// components/molecules/BudgetSummary.tsx
import { CurrencyText } from '../atoms/CurrencyText';
import { TextLabel } from '../atoms/TextLabel';

interface BudgetSummaryProps {
  spent: number;
  budget: number;
  remaining: number;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ spent, budget, remaining }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <TextLabel>Spent</TextLabel>
      <CurrencyText amount={spent} />
    </div>
    <div className="flex items-center justify-between">
      <TextLabel>Budget</TextLabel>
      <CurrencyText amount={budget} />
    </div>
    <div className="flex items-center justify-between">
      <TextLabel>Remaining</TextLabel>
      <CurrencyText
        amount={remaining}
        className={remaining > 0 ? 'text-emerald-600' : 'text-red-600'}
      />
    </div>
  </div>
);
