// components/atoms/TextLabel.tsx
interface TextLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const TextLabel: React.FC<TextLabelProps> = ({ children, className = '' }) => (
  <span className={`text-sm text-gray-600 ${className}`}>{children}</span>
);
