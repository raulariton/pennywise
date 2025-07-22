import React, { useEffect, useRef, useState } from 'react';
import { useCategories, Category } from '@/hooks/useCategories';

interface Props {
  value: Category | null;
  onChange: (category: Category | null) => void;
  placeholder?: string;
}

export const CategorySelect: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Select a category',
}) => {
  const { categories, loading, error } = useCategories();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFiltered(categories.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, categories]);

  const handleSelect = (category: Category) => {
    onChange(category);
    setSearch(category.name);
    setShowOptions(false);
  };

  // Close dropdown on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowOptions(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowOptions(true);
          if (!e.target.value) onChange(null);
        }}
        placeholder={placeholder}
        onFocus={() => setShowOptions(true)}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />

      {showOptions && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-md">
          {loading && <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>}
          {error && <li className="px-4 py-2 text-sm text-red-500">{error}</li>}

          {!loading && filtered.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-500">No categories found</li>
          )}

          {!loading &&
            filtered.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleSelect(cat)}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              >
                {cat.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
