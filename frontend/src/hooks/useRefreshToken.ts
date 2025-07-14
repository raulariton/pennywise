import apiClient from '@/utils/apiClient';
import { useAuth } from '@/context/AuthContext';

const useRefreshToken = () => {
  const { login } = useAuth();

  const refresh = async () => {
    try {
      // NOTE: we use the non-protected api client because we don't
      //  need an access token to access the refresh endpoint.
      const response = await apiClient.get('/auth/refresh');

      // update the authentication context with the new access token
      login(response.data.accessToken);

      return response.data.accessToken;
    } catch (error) {
      // TODO: better error handling
      console.error('Failed to refresh access token:', error);
    }
  };

  return { refresh };
};

export default useRefreshToken;
