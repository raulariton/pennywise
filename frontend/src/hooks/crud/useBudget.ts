import { Category } from '@/hooks/crud/useCategories';
import useApiClientPrivate, { useApiClientPrivateFetcher } from '@/hooks/useApiClientPrivate';
import useToast from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { useSWRCustom } from '@/hooks/crud/useEntries';

// Types
export interface BudgetFormData {
  amount: number;
  currency?: string;
  categoryName: string; // string = categoryId
  description?: string;
  month: string; // e.g. "2025-08-01"
}

export interface Budget {
  id: string;
  amount: number;
  category: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all budgets for the authenticated user.
 */
export const useFetchBudgets = (month: string | undefined) => {
  const { fetcher, isReady } = useApiClientPrivateFetcher();
  const toast = useToast();

  // Build the key dynamically based on the month param
  const { data, error, isLoading } = useSWRCustom(isReady ? `/budget/${month}` : null, fetcher)

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch budgets. Please try again later.');
    }
  }, [error, toast]);

  return {
    budgets: data,
    isLoading,
    isError: error,
  };
};

/**
 * Create a new budget plan.
 */

export const useCreateBudget = () => {
  const { apiClient } = useApiClientPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createBudget = async (budgetData: BudgetFormData) => {
    setLoading(true);
    setError(null);

    try {

      const response = await apiClient.post('/budget', budgetData);
      const newBudget = response.data;

      // Refresh the /budget cache
      await mutate(() => true);

      return newBudget;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create budget';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBudget,
    isLoading: loading,
    isError: error,
  };
};
