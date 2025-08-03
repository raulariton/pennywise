import EntryCategoryItem from '@/components/atoms/AddEntryDialog/EntryCategoryItem';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/config/categoryIcons';
import { Category } from '@/hooks/crud/useCategories';

function CategoriesGrid(props: { handleCategorySelect: (category: string) => void }) {
  return (
    <div className="items grid max-w-sm grid-cols-3 gap-2 p-3">
      {Object.entries(CATEGORY_ICONS).map(([name, iconData]) => (
        <EntryCategoryItem
          key={name}
          categoryName={name}
          categoryIcon={iconData.component}
          categoryColor={iconData.color}
          onClick={() => props.handleCategorySelect(name)}
        />
      ))}
    </div>
  );
}

function CategorySelectTrigger(props: {
  category: string | undefined;
  placeholder?: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant={'outline'}
      className={cn(
        'group hover:bg-background focus-visible:border-ring focus-visible:outline-ring/20 w-full justify-between px-3 text-base font-normal outline-offset-0 focus-visible:outline-[3px]',
        !props.category && 'text-muted-foreground',
        'shadow-sm',
      )}
      onClick={props.onClick}
      type="button"
    >
      <span className={cn('truncate', !props.category && 'text-muted-foreground')}>
        {props.category || props.placeholder || 'Select category'}
      </span>
    </Button>
  );
}

const CategorySelectWithDialog = (props: {
  currentCategory: any;
  setCategory: (categoryName: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (selectedCategory: string | undefined) => {
    props.setCategory(selectedCategory);
    console.log(selectedCategory);
    if (selectedCategory) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CategorySelectTrigger category={props.currentCategory} onClick={setIsOpen} />
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle className="text-center">Select Category</DialogTitle>
          </DialogHeader>
          <CategoriesGrid handleCategorySelect={handleCategorySelect} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategorySelectWithDialog;
