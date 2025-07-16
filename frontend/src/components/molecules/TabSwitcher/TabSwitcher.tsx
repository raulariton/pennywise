'use client';
import TabButton from '@/components/atoms/TabButton/TabButton';
import React from 'react';

type TabSwitcherProps = {
  isActive: string;
  setIsActive: (value: 'Login' | 'Register') => void;
};

export default function TabSwitcher({ isActive, setIsActive }: TabSwitcherProps) {
  return (
    <div className="mb-8 flex rounded-full bg-gray-800/50 p-1">
      <TabButton
        isActive={isActive === 'Login'}
        onClick={() => setIsActive('Login')}
      >
        Login
      </TabButton>
      <TabButton
        isActive={isActive === 'Register'}
        onClick={() => setIsActive('Register')}
      >
        Register
      </TabButton>
    </div>
  );
}
