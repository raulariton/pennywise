import React from 'react';

const EntryCategoryItem = ({
  categoryName,
  categoryIcon,
  categoryColor,
  onClick
}: {
  categoryName: string;
  categoryIcon: React.ReactNode;
  categoryColor: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="hover:bg-accent flex min-w-0 flex-col items-center gap-2 rounded-md p-2"
      onClick={onClick}
    >
      <div className={`rounded-full p-2`} style={{ backgroundColor: categoryColor }}>
        {React.cloneElement(categoryIcon as React.ReactElement, { color: 'white', })}
      </div>
      <span className="px-1 text-center leading-tight break-words">{categoryName}</span>
    </button>
  )
};

export default EntryCategoryItem;
