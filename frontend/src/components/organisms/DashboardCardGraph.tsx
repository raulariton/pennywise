import { GraphBar } from '../atoms/GraphBar';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

export const DashboardGraph = ({ data, dataLabel, color }: { data: any; dataLabel: string; color: string }) => {
  const chartConfig: ChartConfig = {
    amount: {
      label: dataLabel,
      color: color,
    }
  }
  
  // Check if data is valid for charting
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-muted flex h-full w-full items-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium tracking-wide">Performance</h3>
          <p className="text-muted-foreground mt-1 text-base font-medium">12 Month Trend</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="30%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Expenses"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#spendingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
