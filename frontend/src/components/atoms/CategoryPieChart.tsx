'use client';

import { MonthPicker } from '@/components/organisms/MonthCalendar';
import { useFetchBudgets } from '@/hooks/crud/useBudget';
import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#F97316',
  '#06B6D4',
  '#84CC16',
];

export default function CategoryPieChart() {
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString());
  const { budgets, isLoading } = useFetchBudgets(selectedMonth);

  // Transform budgets data into a format suitable for PieChart
  const data = useMemo(() => {
    if (!budgets) return [];

    return budgets.map((b: any) => ({
      name: b.category,
      value: b.spent ?? 0, // show spent amount per category
    }));
  }, [budgets]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
      </div>

      {isLoading && <div className="text-center py-8">Loading data...</div>}

      {!isLoading && data.length === 0 && (
        <div className="text-center py-8">No data available for this month.</div>
      )}

      {!isLoading && data.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-sm text-gray-700">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
