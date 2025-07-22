import { TextHeading } from '../atoms/TextHeading';

export const CardHeader = ({ title }: { title: string }) => (
  <div className="space-y-1">
    <TextHeading>{title}</TextHeading>
  </div>
);
