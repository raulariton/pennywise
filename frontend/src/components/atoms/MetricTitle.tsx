// components/atoms/MetricTitle.tsx
export const MetricTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-6 text-base font-light tracking-widest text-slate-500 uppercase">{children}</h3>
);
