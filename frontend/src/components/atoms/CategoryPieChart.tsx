'use client';

import { MonthPicker } from '@/components/organisms/MonthCalendar';
import { useState } from 'react';
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

interface CategoryData {
  name: string;
  value: number;
}

const sampleData: Record<string, CategoryData[]> = {
  '2025-07-01': [
    { name: 'Food', value: 850 },
    { name: 'Transport', value: 420 },
    { name: 'Shopping', value: 680 },
    { name: 'Entertainment', value: 320 },
  ],
  '2025-08-01': [
    { name: 'Food', value: 650 },
    { name: 'Transport', value: 500 },
    { name: 'Shopping', value: 720 },
    { name: 'Entertainment', value: 200 },
    { name: 'Bills', value: 400 },
  ],
};

export default function CategoryPieChart() {
  const [selectedMonth, setSelectedMonth] = useState<string>('2025-08-01');

  const data = sampleData[selectedMonth] || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
      </div>

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
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
