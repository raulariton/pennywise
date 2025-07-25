import React from 'react';
import Link from 'next/link';

interface SidebarLinkItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

const SidebarLinkItem = (props: SidebarLinkItemProps) => {

  const { icon, label, href } = props;

  return (
    <Link
      className="flex flex-row hover:bg-cyan-500/25 p-2 rounded-md items-center cursor-pointer"
      href={href}
    >
      <div className="text-foreground">{icon && React.isValidElement(icon) && React.cloneElement(icon, { size: 17, color: 'currentColor' })}</div>
      <span className="ml-3 text-foreground">{label}</span>
    </Link>
  );
};

export default SidebarLinkItem;