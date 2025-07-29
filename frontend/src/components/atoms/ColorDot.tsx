// components/atoms/ColorDot.tsx
interface ColorDotProps {
  color: string;
  size?: number;
}

export const ColorDot: React.FC<ColorDotProps> = ({ color, size = 12 }) => (
  <span
    className="rounded-full"
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      backgroundColor: color,
    }}
  />
);
