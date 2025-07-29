// components/molecules/MetricFrontFace.tsx
import { CardFace } from '../atoms/CardFace';
import { MetricTitle } from '../atoms/MetricTitle';
import { MetricValue } from '../atoms/MetricValue';
import { MetricSubtitle } from '../atoms/MetricSubtitle';
import { TrendIndicator } from '../atoms/TrendIndicator';
import { IconContainer } from '../atoms/IconContainer';

interface MetricFrontFaceProps {
  title: string;
  value: string;
  subtitle: string;
  trendValue?: string;
  icon?: React.ReactNode;
}

export const MetricFrontFace: React.FC<MetricFrontFaceProps> = ({
  title,
  value,
  subtitle,
  trendValue,
  icon,
}) => (
  <CardFace>
    <div className="absolute inset-0 rounded-[2rem] border border-white/20 transition-colors duration-500 group-hover:border-indigo-100/60" />
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
      <MetricTitle>{title}</MetricTitle>
      <MetricValue>{value}</MetricValue>
      <MetricSubtitle>{subtitle}</MetricSubtitle>
      {trendValue && <TrendIndicator value={trendValue} />}
    </div>
    {icon && <IconContainer>{icon}</IconContainer>}
  </CardFace>
);
