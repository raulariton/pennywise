import React from 'react';
import Logo from '@/components/atoms/Logo';
import SidebarLinkItem from '@/components/atoms/SidebarLinkItem';
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Goal,
  House, LogOut,
  Settings,
  TrendingUp,
} from 'lucide-react';
import SidebarButton from '@/components/atoms/SidebarButton';
import { useAuth } from '@/context/AuthContext';

const SidebarLinks = [
  { icon: <House />, label: 'Dashboard', href: '/dashboard' },
  { icon: <BanknoteArrowUp />, label: 'Incomes', href: '#' },
  { icon: <BanknoteArrowDown />, label: 'Expenses', href: '#' },
  { icon: <TrendingUp />, label: 'Statistics', href: '#' },
  { icon: <Goal />, label: 'Budgets & Goals', href: '#' },
];

const Sidebar = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
  }

  return (
    <div className="bg-card border-neutral-600 fixed top-0 left-0 z-100 flex h-screen w-64 flex-col border-r-1 p-4 text-white shadow-lg">
      {/* logo header */}
      <div className="mt-3 mb-6 flex items-center justify-center">
        <Logo size={'sm'} />
      </div>

      {/* divider */}
      <div className="bg-border mx-2 mb-4 h-px"></div>

      {/* navigation links */}
      <div className="flex-grow">
        <ul className="space-y-2">
          {SidebarLinks.map((link, index) => (
            <li key={index}>
              <SidebarLinkItem icon={link.icon} label={link.label} href={link.href} />
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-border mt-auto border-t pt-4">
        {/* settings link */}
        <SidebarLinkItem icon={<Settings />} label={'Settings'} href={'#'} />
        {/* logout */}
        <SidebarButton onClick={handleLogout} label={'Logout'} icon={<LogOut/>} />
      </div>
    </div>
  );
};

export default Sidebar;
