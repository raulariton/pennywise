import React from 'react';

interface DashboardTileProps {
  title: string;
  description: string;
  value: number | string;
}

const DashboardTile = () => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <span>Title</span>
      <span>Subtitle</span>
      <span className="text-lg font-semibold text-gray-300 mt-2">323.13</span>
    </div>
  );
};

export default DashboardTile;