import { CATEGORY_ICONS } from '@/config/categoryIcons';

export const CategoryBadge = (props: {name: string}) => {

  const color = CATEGORY_ICONS[props.name]?.color || '#525252'; // Miscellaneous color as default

  return (
    <span
    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium`}
    style={{ backgroundColor: color }}
    >
      {props.name}
    </span>
  );
};
