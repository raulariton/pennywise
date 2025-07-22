export const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`h-3 w-3 rounded-full ${color}`} />
    <span className="text-muted-foreground text-lg">{label}</span>
  </div>
);
