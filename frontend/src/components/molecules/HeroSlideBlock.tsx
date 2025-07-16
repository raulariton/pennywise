import GetStartedButton from '@/components/atoms/GetStartedButton';
import GradientText from '@/components/atoms/GradientText';

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
