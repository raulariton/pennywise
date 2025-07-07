// components/molecules/HeroSideBlock.jsx

import Button from "@/components/atoms/Button/Button";
import GradientText from "@/components/atoms/GradientText/GradientText";

export default function HeroSideBlock({ text }: { text: string }) {
  return (
    <div className="max-w-xs">
      <GradientText>{text}</GradientText>
      <div className="mt-10">
        <Button />
      </div>
    </div>
  );
}
