'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useFetchEntries } from '@/hooks/crud/useEntries';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const MonthlyCashFlowChart = () => {
  const {
    entries: data,
    isLoading,
    isError,
  } = useFetchEntries({
    url: '/entries/monthly-cash-flow',
    requestConfig: {
      params: { currency: 'RON' },
    }
  });

  const chartConfig = {
    income: {
      label: 'Income',
      color: 'var(--color-emerald-400)',
    },
    expense: {
      label: 'Expense',
      color: 'var(--color-red-400)',
    },
  } satisfies ChartConfig;

  useEffect(() => {
    toast.error(
      typeof isError === 'string'
        ? isError
        : 'Failed to fetch monthly cash flow data. Please try again later.',
    );
  }, [isError]);

  return (
    <ChartContainer config={chartConfig} className="h-[33vh] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent className="[&_.legend-indicator]:h-9 [&_.legend-indicator]:w-3" />} />
        <Bar dataKey="income" fill="var(--color-emerald-400)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-red-400)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default MonthlyCashFlowChart;