import { GraphBar } from '../atoms/GraphBar';

export const DashboardGraph = ({ data, change }: { data: number[]; change: number }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const isPositive = change >= 0;

  return (
    <div className="bg-muted absolute inset-0 flex h-52 flex-col justify-between p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium tracking-wide">Performance</h3>
          <p className="text-muted-foreground mt-1 text-lg font-medium">12 Month Trend</p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {isPositive ? '+' : ''}
          {change}%
        </div>
      </div>

      <div className="flex flex-1 items-end justify-between px-2 pb-4">
        {data.map((value, index) => (
          <GraphBar
            key={index}
            value={value}
            maxValue={maxValue}
            minValue={minValue}
            index={index}
            isLast={index === data.length - 1}
            isPositive={isPositive}
          />
        ))}
      </div>

      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>Jan</span>
        <span>Dec</span>
      </div>
    </div>
  );
};
