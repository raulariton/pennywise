// components/atoms/CustomTooltip.tsx
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
