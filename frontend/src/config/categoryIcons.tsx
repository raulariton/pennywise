import {
  ShoppingBasket,
  HousePlug,
  ShoppingCart,
  BusFront,
  Plane,
  Cross,
  Gamepad2,
  Gift,
  GraduationCap,
  CircleQuestionMark,
} from 'lucide-react';
import React from 'react';

interface CategoryIcon {
  component: React.ReactNode;
  color: string;
}

export const CATEGORY_ICONS: Record<string, CategoryIcon> = {
  'Groceries': {
    component: <ShoppingBasket/>,
    color: '#f43f5e'
  },
  'Utilities': {
    component: <HousePlug/>,
    color: '#a855f7'
  },
  'Shopping': {
    component: <ShoppingCart/>,
    color: '#ea580c'
  },
  'Transport': {
    component: <BusFront/>,
    color: '#6366f1'
  },
  'Travel': {
    component: <Plane/>,
    color: '#0d9488'
  },
  'Health': {
    component: <Cross/>,
    color: '#059669'
  },
  'Entertainment': {
    component: <Gamepad2/>,
    color: '#0284c7'
  },
  'Gifts': {
    component: <Gift/>,
    color: '#d97706'
  },
  'Education': {
    component: <GraduationCap/>,
    color: '#0891b2'
  },
  'Miscellaneous': {
    component: <CircleQuestionMark/>,
    color: '#525252'
  }
};

export function getCategoryIcon(categoryName: string): CategoryIcon {
  return CATEGORY_ICONS[categoryName] || CATEGORY_ICONS['Miscellaneous'];
}
