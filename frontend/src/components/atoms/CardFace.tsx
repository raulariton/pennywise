// components/atoms/CardFace.tsx
interface CardFaceProps {
  children: React.ReactNode;
  back?: boolean;
}

export const CardFace: React.FC<CardFaceProps> = ({ children, back = false }) => (
  <div
    className={`absolute inset-0 flex h-full w-full flex-col rounded-[2rem] ${
      back
        ? 'bg-white p-8 shadow-2xl backdrop-blur-xl'
        : 'bg-gradient-to-br from-white/80 to-white/60 shadow-lg backdrop-blur-2xl transition-all duration-500 group-hover:shadow-2xl'
    }`}
    style={{
      backfaceVisibility: 'hidden',
      transform: back ? 'rotateY(180deg)' : undefined,
    }}
  >
    {children}
  </div>
);
