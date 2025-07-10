// components/molecules/HeroSideBlock.jsx

import GetStartedButton from "@/components/atoms/GetStartedButton/GetStartedButton";
import GradientText from "@/components/atoms/GradientText/GradientText";

export default function HeroSideBlock({ text }: { text: string }) {
  return (
    <div className="max-w-xs">
      <GradientText>{text}</GradientText>
      <div className="mt-10">
        <GetStartedButton />
      </div>
    </div>
  );
}
