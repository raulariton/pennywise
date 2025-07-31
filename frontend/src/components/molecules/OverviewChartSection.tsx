// components/molecules/OverviewChartSection.tsx
'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../atoms/CustomTooltip';

interface Props {
  data: any[];
}

export const OverviewChartSection: React.FC<Props> = ({ data }) => (
  <section className="mb-16 rounded-2xl border border-border bg-muted p-12 shadow-xl transition-all duration-500">
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-light">Your spending this month</h2>
    </div>
    <div className="h-[28rem]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="budget"
            stroke="#10b981"
            fill="url(#budgetGradient)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#6366f1"
            fill="url(#expensesGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </section>
);
