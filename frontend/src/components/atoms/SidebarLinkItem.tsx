import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

const SidebarLinkItem = (props: SidebarLinkItemProps) => {
  const { icon, label, href } = props;
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={`flex flex-row hover:bg-cyan-500/25 p-2 rounded-md items-center cursor-pointer ${isActive ? 'bg-cyan-500/25' : ''}`}
      href={href}
    >
      <div className="text-foreground">{icon && React.isValidElement(icon) && React.cloneElement(icon, { size: 17, color: 'currentColor' })}</div>
      <span className="ml-3 text-foreground">{label}</span>
    </Link>
  );
};

export default SidebarLinkItem;