'use client';

import Logo from '@/components/atoms/Logo';
import { NavUser } from '@/components/nav-user';
import AddEntryDialog from '@/components/organisms/AddEntryDialog';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Goal, House, PlusCircle, Settings, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const data = [
  {
    user: {
      name: 'full name',
      email: 'email',
      avatar: '',
    },
  },
  {
    group: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: House,
      },
      {
        title: 'Statistics',
        url: '/statistics',
        icon: TrendingUp,
      },
      {
        title: 'Budgets & Goals',
        url: '/budget-goals',
        icon: Goal,
      },
    ],
  },
  {
    group: [],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  // AddEntryDialog state is managed here
  const [addEntryOpen, setAddEntryOpen] = React.useState(false);

  return (
    <>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Logo"
                className="bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground active:bg-transparent active:text-primary-foreground justify-center duration-200 ease-linear"
              >
                <Logo size={'sm'} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
        </SidebarHeader>
        <SidebarContent className="p-2">
          {/* main group */}
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                <SidebarMenuItem className="flex items-center gap-2">
                  <SidebarMenuButton
                    tooltip="Create a new entry"
                    className="bg-cyan-600 hover:bg-cyan-700 text-primary-foreground font-semibold duration-200 ease-linear"
                    onClick={() => setAddEntryOpen(true)}
                  >
                    <PlusCircle />
                    Add Entry
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data[1].group?.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      asChild
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon size={20} color="currentColor" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton asChild>
                <a href={'#'}>
                  <Settings size={20} color="currentColor" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
              <ThemeToggle />
            </SidebarMenuItem>
            <NavUser user={data[0].user} />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {/* AddEntryDialog rendered here, controlled by sidebar state */}
      <AddEntryDialog open={addEntryOpen} setOpen={setAddEntryOpen} />
    </>
  );
}
