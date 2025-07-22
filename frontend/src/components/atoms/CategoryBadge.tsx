export const CategoryBadge = ({ name, color }: { name: string; color?: string }) => (
  <span
    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${color || 'bg-muted text-muted-foreground'}`}
  >
    {name}
  </span>
);
