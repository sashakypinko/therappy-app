import { useEffect, useState } from 'react';
import { AuthStorage } from '../services/storage/auth.storage';

const useAuthorized = (): boolean | null => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = AuthStorage.getUser();
    setIsAuthorized(!(user === null));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return isAuthorized;
};

export default useAuthorized;
