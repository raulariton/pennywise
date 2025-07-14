'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '@/utils/apiClient';
import useRefreshToken from '@/hooks/useRefreshToken';

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
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const { refresh } = useRefreshToken();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Handle initialization of authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to refresh the token on initial load
        console.log("Attempting to refresh token on initialization...");
        await refresh();
      } catch (error) {
        // TODO: redirect to landing
        console.error('Failed to refresh token:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    console.log("isInitialized: ", isInitialized);

    // if not initialized, initialize
    if (!isInitialized) {
      initAuth();
    }
  }, []);

  /**
   * Update authentication state after successful login or registration.
   * @param token - The access token received from the server.
   */
  const login = (token: string) => {
    // set in-memory state
    setAccessToken(token);

    console.log('Access token set in state:', token);

    // decode token to extract user information
    try {
      const decodedToken: JWTPayload = jwtDecode<JWTPayload>(token);

      setUserEmail(decodedToken.email);
      setUserID(decodedToken.id);
      setUserFullName(decodedToken.fullName);
      setIsAuthenticated(true);

      // DEBUG
      console.log('User authenticated.');
    } catch (error) {
      alert('Failed to decode access token. Please log in again.');
      console.error('Failed to decode access token:', error);
      logout();
    }
  };

  /**
   * Clear/Reset authentication state on logout.
   */
  const logout = async () => {
    // call request to logout endpoint
    // to remove refresh token from cookies
    await apiClient.post('/auth/logout');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
