import useApiClientPrivate, { useApiClientPrivateFetcher } from '@/hooks/useApiClientPrivate';
import useToast from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

// Types
export interface GoalFormData {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  dueDate?: string; // e.g. "2025-12-31"
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all financial goals for the authenticated user.
 */
export const useFetchGoals = () => {
  const { fetcher, isReady } = useApiClientPrivateFetcher();
  const { data, error, isLoading } = useSWR(isReady ? '/goals' : null, fetcher);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch goals. Please try again later.');
    }
  }, [error]);

  return {
    goals: data,
    isLoading,
    isError: error,
  };
};

/**
 * Create a new financial goal.
 */
export const useCreateGoal = () => {
  const { apiClient } = useApiClientPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createGoal = async (goalData: GoalFormData) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: goalData.title,
        targetAmount: goalData.targetAmount,
        currentAmount: goalData.currentAmount ?? 0,
        dueDate: goalData.dueDate,
      };

      const response = await apiClient.post('/goals', payload);
      const newGoal = response.data;

      // Refresh the /goals cache
      await mutate('/goals');

      return newGoal;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create goal';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createGoal,
    isLoading: loading,
    isError: error,
  };
};

/**
 * Update an existing financial goal.
 */
export const useUpdateGoal = () => {
  const { apiClient } = useApiClientPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateGoal = async (goalId: string, goalData: Partial<GoalFormData>) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: goalData.title,
        targetAmount: goalData.targetAmount,
        currentAmount: goalData.currentAmount,
        dueDate: goalData.dueDate,
      };

      const response = await apiClient.put(`/goals/${goalId}`, payload);
      const updatedGoal = response.data;

      // Refresh the /goals cache
      await mutate('/goals');

      return updatedGoal;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update goal';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateGoal,
    isLoading: loading,
    isError: error,
  };
};
