import React, { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

type UseCharacterLimitProps = {
  onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  initialValue?: string;
};

const useCharacterLimit = ({ onValueChange, maxLength, initialValue = '' }: UseCharacterLimitProps) => {
  const [charCount, setCharCount] = useState(initialValue.length);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // check if the new string length exceeds the maxLength
    if (newValue.length <= maxLength) {
      onValueChange(e as React.ChangeEvent<HTMLTextAreaElement>);
      setCharCount(newValue.length);
    }
  };

  return {
    charCount,
    handleChange,
    maxLength,
  };
}

const TextAreaInputWithCharacterLimit = ({
  value,
  onValueChange,
  maxLength = 256,
}: {
  value: string | undefined;
  onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}) => {

  const { charCount, handleChange, maxLength: limit } = useCharacterLimit({ onValueChange, maxLength });

  return (
    <div>
      <Textarea
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        className="shadow-md"
      />
      <p className="text-muted-foreground mt-2 text-right text-xs">
        <span className="tabular-nums">{limit - charCount}</span> characters left
      </p>
    </div>
  );
};

export default TextAreaInputWithCharacterLimit;
