// components/atoms/ChartLegendItem.tsx
import { ColorDot } from './ColorDot';

interface ChartLegendItemProps {
  color: string;
  label: string;
}

export const ChartLegendItem: React.FC<ChartLegendItemProps> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <ColorDot color={color} />
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);
