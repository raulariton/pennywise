import React from 'react';
import { Navbar } from '@/components/organisms/Navbar/Navbar';
import { DashboardCard } from '@/components/atoms/DashboardCard';
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <DashboardCard
        title="Expenses"
        amount="$3,240"
        change={-8.2}
        data={[3800, 3600, 3900, 3500, 3700, 3400, 3600, 3300, 3500, 3200, 3350, 3240]}
      />
    </>
  );
};

export default Dashboard;
