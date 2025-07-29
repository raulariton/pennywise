import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import useApiClientPrivate, { useApiClientPrivateFetcher } from '@/hooks/useApiClientPrivate';
import { Category } from '@/hooks/crud/useCategories';
import useToast from '@/hooks/useToast';

// types
export interface EntryFormData {
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  description?: string;
  timestamp: string;
  category: Category;
}

export interface Entry extends EntryFormData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Custom hook to fetch all entries (income/expense transactions)
 * of a user.
 * The request includes the user's access token stored in the auth context.
 */
export const useFetchEntries = () => {
  const { fetcher, isReady } = useApiClientPrivateFetcher();
  const { data, error, isLoading } = useSWR(isReady ? '/entries' : null, fetcher);
  const toast = useToast();

  // display toast on error
  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch entries. Please try again later.');
    }
  }, [error]);

  return {
    entries: data,
    isLoading: isLoading,
    isError: error,
  };
};

export const useCreateEntry = () => {
  const { apiClient } = useApiClientPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEntry = async (entryData: EntryFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/entries', entryData);
      const newEntry = response.data;

      await mutate('/entries');

      return newEntry;
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createEntry,
    isLoading: loading,
    isError: error,
  };
};
