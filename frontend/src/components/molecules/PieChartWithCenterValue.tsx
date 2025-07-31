// components/molecules/PieChartWithCenterValue.tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CurrencyText } from '../atoms/CurrencyText';

interface PieChartWithCenterValueProps {
  data: { label: string; amount: number; color: string }[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  total: number;
}

export const PieChartWithCenterValue: React.FC<PieChartWithCenterValueProps> = ({
  data,
  activeIndex,
  setActiveIndex,
  total,
}) => (
  <div className="relative flex w-1/2 flex-col items-center justify-center">
    <div className="relative h-56 w-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            stroke="none"
            dataKey="amount"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {activeIndex !== null ? (
          <>
            <p className="text-sm text-muted-foreground">Amount</p>
            <CurrencyText amount={data[activeIndex].amount} />
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Total</p>
            <CurrencyText amount={total} />
          </>
        )}
      </div>
    </div>
  </div>
);
