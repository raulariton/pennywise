import { Category } from '@/hooks/crud/useCategories';
import useApiClientPrivate, { useApiClientPrivateFetcher } from '@/hooks/useApiClientPrivate';
import useToast from '@/hooks/useToast';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

// types
export interface EntryFormData {
  type: 'income' | 'expense';
  name: string;
  amount: number;
  currency: string;
  description?: string;
  timestamp: Date;
  category: Category;
}

export interface Entry extends EntryFormData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useSWRCustom = (key, fetcher) => {
  const { data, error, isLoading } = useSWR(key, fetcher, {
    refreshInterval: 7500,
  });
  return {
    data,
    error,
    isLoading,
  };
}

/**
 * Custom hook to fetch all entries (income/expense transactions)
 * of a user.
 * The request includes the user's access token stored in the auth context.
 */
export const useFetchEntries = ({
  url,
  requestConfig,
}: {
  url: string;
  requestConfig?: AxiosRequestConfig;
}) => {
  const { fetcher, isReady } = useApiClientPrivateFetcher(requestConfig);
  const { data, error, isLoading } = useSWRCustom(isReady ? url : null, fetcher);
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

      await mutate(() => true); // revalidate all SWR keys

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

export const useFetchDashboardMetrics = () => {
  const { fetcher, isReady } = useApiClientPrivateFetcher({
    params: { currency: 'RON' }
  });
  const { data, error, isLoading } = useSWRCustom(isReady ? '/entries/dashboard-metrics' : null, fetcher);
  const toast = useToast();

  // display toast on error
  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch dashboard metrics. Please try again later.');
    }
  }, [error]);

  return {
    metrics: data,
    isLoading: isLoading,
    isError: error,
  };
}
