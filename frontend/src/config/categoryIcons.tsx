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
    color: 'rose-500'
  },
  'Utilities': {
    component: <HousePlug/>,
    color: 'purple-500'
  },
  'Shopping': {
    component: <ShoppingCart/>,
    color: 'violet-500'
  },
  'Transport': {
    component: <BusFront/>,
    color: 'indigo-500'
  },
  'Travel': {
    component: <Plane/>,
    color: 'teal-500'
  },
  'Health': {
    component: <Cross/>,
    color: 'emerald-500'
  },
  'Entertainment': {
    component: <Gamepad2/>,
    color: 'sky-500'
  },
  'Gifts': {
    component: <Gift/>,
    color: 'amber-700'
  },
  'Education': {
    component: <GraduationCap/>,
    color: 'cyan-500'
  },
  'Miscellaneous': {
    component: <CircleQuestionMark/>,
    color: 'neutral-500'
  }
};

export function getCategoryIcon(categoryName: string): CategoryIcon {
  return CATEGORY_ICONS[categoryName] || CATEGORY_ICONS['Miscellaneous'];
}
