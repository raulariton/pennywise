// components/atoms/TextLabel.tsx
interface TextLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const TextLabel: React.FC<TextLabelProps> = ({ children, className = '' }) => (
  <span className={`text-muted-foreground ${className}`}>{children}</span>
);
