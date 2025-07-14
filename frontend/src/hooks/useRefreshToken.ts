import { useAuth } from '@/context/AuthContext';

// NOTE: this hook is a wrapper around the `refreshToken` method from AuthContext
//  not sure whether to keep it this way or not. it would require refactoring of the method calls
const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    return auth.refreshToken();
  };

  return { refresh };
};

export default useRefreshToken;
