// components/atoms/SubtitleText.tsx
export default function SubtitleText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2 className={`text-2xl font-bold tracking-tight text-white ${className}`}>
      {children}
    </h2>
  );
}
