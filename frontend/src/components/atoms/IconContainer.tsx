// components/atoms/IconContainer.tsx
export const IconContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative z-10 flex justify-center pb-6">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-2xl shadow-sm">
      {children}
    </div>
  </div>
);
