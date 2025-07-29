// components/molecules/OverviewChartSection.tsx
'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../atoms/CustomTooltip';

interface Props {
  data: any[];
}

export const OverviewChartSection: React.FC<Props> = ({ data }) => (
  <section className="mb-16 rounded-[2rem] border bg-white/70 p-12 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl">
    <div className="mb-10 text-center">
      <h2 className="mb-3 text-3xl font-light tracking-tight text-slate-900">Monthly Overview</h2>
      <p className="text-lg font-light text-slate-600">Expenses vs Budget Comparison</p>
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
