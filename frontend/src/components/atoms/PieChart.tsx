// components/ModernPieChart.tsx
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

type PieDatum = { id: string; label: string; value: number; color?: string };

interface ModernPieChartProps {
  data: PieDatum[];
  height?: number;
}

export const ModernPieChart: React.FC<ModernPieChartProps> = ({ data, height = 300 }) => {
  return (
    <div style={{ height }} className="w-full">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 40, bottom: 60, left: 40 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={4}
        activeOuterRadiusOffset={10}
        colors={(datum) => datum.color ?? datum.data.color}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        arcLinkLabelsSkipAngle={12}
        arcLinkLabelsTextColor="#333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        tooltip={({ datum: { id, value, color } }) => (
          <div
            style={{
              padding: '6px 12px',
              background: '#fff',
              color: '#333',
              borderRadius: 4,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <strong style={{ color }}>{id}</strong>: ${value}
          </div>
        )}
        motionConfig="gentle"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateY: 40,
            itemsSpacing: 8,
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
};
