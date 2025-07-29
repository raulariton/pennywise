import React from 'react';
import Flag from 'react-flagkit';

const CountryFlag = ({ country }: { country: string }) => {
  return <Flag country={country} size={15} className="shadow-sm" />;
};

export default CountryFlag;
