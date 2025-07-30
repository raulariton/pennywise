import { TextHeading } from '../atoms/TextHeading';

export const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="space-y-0.5">
    <TextHeading>{title}</TextHeading>
    {subtitle && <p className="text-muted-foreground text-shadow-lg">{subtitle}</p>}
  </div>
);
