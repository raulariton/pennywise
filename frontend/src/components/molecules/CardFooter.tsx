import { ChangeIndicator } from '../atoms/ChangeIndicator';

export const CardFooter = ({ change, period }: { change: number; period: string }) => (
  <div className="flex items-center justify-between">
    <ChangeIndicator change={change} />
    <span className="text-muted-foreground text-xs">{period}</span>
  </div>
);
