// components/organisms/MetricCard.tsx
'use client';
import { MetricFrontFace } from '../molecules/MetricFrontFace';
import { MetricBackFace } from '../molecules/MetricBackFace';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  backTitle: string;
  backSubtitle: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  trendValue?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  backTitle,
  backSubtitle,
  icon,
  children,
  trendValue,
}: MetricCardProps) {
  return (
    <div className="group relative h-80 w-full" style={{ perspective: '1000px' }}>
      <div
        className="relative h-full w-full transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <MetricFrontFace
          title={title}
          value={value}
          subtitle={subtitle}
          trendValue={trendValue}
          icon={icon}
        />
        <MetricBackFace backTitle={backTitle} backSubtitle={backSubtitle} trendValue={trendValue}>
          {children}
        </MetricBackFace>
      </div>
    </div>
  );
}
