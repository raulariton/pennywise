import React from 'react';

const SidebarButton = ({ onClick, label, icon }: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string, icon: React.ReactNode }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex w-full flex-row items-center rounded-md p-2 hover:bg-cyan-500/25 cursor-pointer"
    >
      {icon && React.isValidElement(icon) && React.cloneElement(icon, { size: 17 })}
      <span className="ml-3">{label}</span>
    </button>
  );
};

export default SidebarButton;