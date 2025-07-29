import React from 'react';
import { cn } from '@/lib/utils';

const EntryTypeTabs = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
  const options = ['income', 'expense'];

  return (
    <div className="border border-border bg-background rounded-lg p-3">
      <div className="flex gap-2 w-full">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={cn(
              'flex-1 rounded-lg border border-border px-4 py-2 capitalize font-medium transition',
              `${
                value === option
                  ? 'bg-input'
                  : 'hover:bg-muted bg-background'
              }`,
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EntryTypeTabs;
