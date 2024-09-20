import { useEffect, useState } from 'react';
import { IUser } from '../services/api/user/dto/user.dto';
import { AuthStorage } from '../services/storage/auth.storage';
import { IProvider } from '../services/api/provider/dto/provider.dto';

const useAuthUser = (): IUser | null => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(AuthStorage.getUser());
  }, []);

  return user;
};

export default useAuthUser;
