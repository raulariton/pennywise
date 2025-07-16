'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';

export interface JWTPayload {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  accessToken: string | null;
  userID: string | null;
  userEmail: string | null;
  userFullName: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isInitialized: false,
  accessToken: null,
  userID: null,
  userEmail: null,
  userFullName: null,
  login: () => {},
  logout: () => {},
  refreshToken: async () => null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<string>('');

  // NOTE: without using a useEffect to render toasts,
  //  they will not show up
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error, toast]);

  /**
   * Refreshes the access token using the refresh token cookie
   * @return The new access token if successful, or null if failed.
   */
  const refreshToken = async () => {
    try {
      // Make API call to refresh token
      const response = await apiClient.get('/auth/refresh');

      // Update authentication state with new token
      login(response.data.accessToken);

      return response.data.accessToken;
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        setError('Server error. Please try again later.');
      } else if (axios.isAxiosError(error) && error.response?.status === 403) {
        // 403 is thrown when the refresh token is invalid or expired
        setError('Session expired. Please log in again.');
      }
      return null;
    }
  };

  // Handle initialization of authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // get access token using refresh token
        await refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        router.replace('/');
      } finally {
        setIsInitialized(true);
      }
    };

    // if not initialized, initialize
    if (!isInitialized) {
      initAuth();
    }
  }, [isInitialized]);

  /**
   * Update authentication state after successful login or registration.
   * @param token - The access token received from the server.
   */
  const login = (token: string) => {
    // set in-memory state
    setAccessToken(token);

    // decode token to extract user information
    try {
      const decodedToken: JWTPayload = jwtDecode<JWTPayload>(token);

      setUserEmail(decodedToken.email);
      setUserID(decodedToken.id);
      setUserFullName(decodedToken.fullName);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to decode access token:', error);
      alert('Failed to decode access token. Please log in again.');
      logout();
    }
  };

  /**
   * Clear/Reset authentication state on logout.
   */
  const logout = async () => {
    // call request to logout endpoint
    // to remove refresh token from cookies
    await apiClient.get('/auth/logout');
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserEmail(null);
    setUserID(null);
    setUserFullName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        accessToken,
        userID,
        userEmail,
        userFullName,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
