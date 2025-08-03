'use client';
import apiClient from '@/utils/apiClient';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import useRefreshToken from '@/hooks/useRefreshToken';
import { AxiosRequestConfig } from 'axios';

/**
 * Custom hook to get an API client with automatic token refresh
 * used to access protected routes (that require authentication).
 */
const useApiClientPrivate = () => {
  const auth = useAuth();
  const { refresh } = useRefreshToken();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    /**
     * interceptors act as middleware that allow for
     * intercepting requests and responses before handled
     * by .then() or .catch()
     */

    // request interceptor: before request is sent
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        // if Authorization header is not set, set it
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }

        return config;
      },
      (error) => {
        // default error handling, propagating to .catch()
        return Promise.reject(error);
      },
    );

    // response interceptor: before response is handled by .then() or .catch()
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      // add error handling
      async (error) => {
        // get failed request
        const prevRequest = error?.config;

        // if error is 401 (Unauthorized) and the request has not been retried yet
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // mark the request as sent to prevent infinite loop
          prevRequest.sent = true;

          // attempt to get a new access token using the refresh token
          const newAccessToken = await refresh();

          // if no new access token was received, return the error
          if (!newAccessToken) {
            // TODO: user should be logged out
            return Promise.reject(error);
          }

          // set the Authorization header with the new access token
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // retry the original request with the new access token
          return apiClient(prevRequest);
        }

        // if the error is not 401 or the request has already been retried, reject the promise
        return Promise.reject(error);
      },
    );

		// after setting up interceptors, mark the hook as ready
		setIsReady(true);

    return () => {
      // clean up interceptors on unmount
      // (when no longer in use in DOM)
      // (i.e. any component that uses this hook is unmounted)
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
      setIsReady(false);
    };

    /**
     * dependencies:
     * - auth: to update the hook when the access token changes
     * - refresh: to use the latest version of the refresh function
     */
  }, [auth, refresh]);

  return { apiClient, isReady };
};

/**
 * API client hook for private routes
 * should be used for making POST, PUT, DELETE requests to protected endpoints
 * GET requests can be made with this hook as well,
 * but it's recommended to use the fetcher function for SWR
 */
export default useApiClientPrivate;

// fetch hook
export const useApiClientPrivateFetcher = (config?: AxiosRequestConfig) => {
  const { apiClient, isReady } = useApiClientPrivate();

  // fetcher function for SWR
  const fetcher = async (url: string) => {
    if (!isReady) {
      throw new Error("API client is not ready");
    }
    const response = await apiClient.get(url, config);
    return response.data;
  }

  return { fetcher, isReady };
}
