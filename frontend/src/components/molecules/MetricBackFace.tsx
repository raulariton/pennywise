// components/molecules/MetricBackFace.tsx
import { CardFace } from '../atoms/CardFace';

interface MetricBackFaceProps {
  backTitle: string;
  backSubtitle: string;
  children?: React.ReactNode;
  trendValue?: string;
}

export const MetricBackFace: React.FC<MetricBackFaceProps> = ({
  backTitle,
  backSubtitle,
  children,
  trendValue,
}) => (
  <CardFace back>
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{backTitle}</h3>
        <p className="text-sm text-slate-500">{backSubtitle}</p>
      </div>

      <div className="flex-1">
        <div className="mb-4 h-32">{children}</div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="mb-1 text-xs font-medium text-slate-500 uppercase">Trend</p>
            <p className="text-sm font-semibold text-slate-800">{trendValue || '--'}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="mb-1 text-xs font-medium text-slate-500 uppercase">Average</p>
            <p className="text-sm font-semibold text-slate-800">2500</p>
          </div>
        </div>
      </div>
    </div>
  </CardFace>
);
