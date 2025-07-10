"use client";
import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
	id: string;
	email: string;
	fullName: string;
}

interface AuthContextType {
	isAuthenticated: boolean;
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

const AuthContext= createContext<AuthContextType>({
  isAuthenticated: false,
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

  /**
   * Update authentication state after successful login or registration.
   * @param token - The access token received from the server.
   */
  const login = (token: string) => {
    // set in-memory state
    setAccessToken(token);

    // decode token to extract user information
    try {
      const decodedToken: JWTPayload = jwtDecode(token);

      setUserEmail(decodedToken.email);
      setUserID(decodedToken.id);
      setUserFullName(decodedToken.fullName);
      setIsAuthenticated(true);

      // DEBUG
      console.log("User authenticated.");
    } catch (error) {
      console.error("Failed to decode access token:", error);
      logout();
    }
  }

  /**
   * Clear/Reset authentication state on logout.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserEmail(null);
    setUserID(null);
    setUserFullName(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
				accessToken,
        userID,
        userEmail,
        userFullName,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;