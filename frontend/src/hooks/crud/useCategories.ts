import useSWR from 'swr';
import { useApiClientPrivateFetcher } from '@/hooks/useApiClientPrivate';
import { CATEGORY_ICONS } from '@/config/categoryIcons';

// types
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

/**
 * Custom hook to fetch all entry categories
 * The request includes the user's access token stored in the auth context.
 * (Yes, this is a protected route :))
 */
export const useFetchCategories = () => {
  const fetcher = useApiClientPrivateFetcher();
  const { data, error, isLoading } = useSWR('/categories', fetcher);

  const defaultIcon = CATEGORY_ICONS['Miscellaneous'].component;
  const defaultColor = CATEGORY_ICONS['Miscellaneous'].color;

  // add icon and color to each category
  const categories = data?.map((category: Category) => {
    return {
      ...category,
      icon: CATEGORY_ICONS[category.name]?.component || defaultIcon, // replace with actual default icon
      color: CATEGORY_ICONS[category.name]?.color || defaultColor, // replace with actual default color
    };
  })

  return {
    categories,
    isLoading: isLoading,
    isError: error,
  };
};