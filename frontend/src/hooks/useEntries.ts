'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export type EntryFormData = {
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  description?: string;
  timestamp: string;
  categoryName: string;
};

export interface Entry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  description: string;
  timestamp: string; // ISO string
  category: {
    id: string;
    name: string;
    description: string | null;
  };
}

export const useCreateEntry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEntry = async (formData: EntryFormData) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = Cookies.get('access-token');

      if (!accessToken) {
        throw new Error('Access token not found.');
      }

      const payload = {
        type: formData.type,
        amount: Number(formData.amount),
        currency: formData.currency,
        description: formData.description,
        timestamp: new Date(formData.timestamp),
        category: {
          name: formData.categoryName,
        },
      };

      const response = await axios.post('http://localhost:8000/entries/', payload, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to create entry';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createEntry,
    loading,
    error,
  };
};

export const useFetchEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = Cookies.get('access-token');
      const response = await axios.get('http://localhost:8000/entries/', {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      setEntries(response.data);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch entries.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, loading, error, refetch: fetchEntries };
};
