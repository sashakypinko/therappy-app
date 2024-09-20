import { useEffect, useState } from 'react';
import { AuthStorage } from '../services/storage/auth.storage';

const useWithSidebar = (): boolean | null => {
  const [withSidebar, setWithSidebar] = useState<boolean>(false);

  useEffect(() => {
    const user = AuthStorage.getUser();
    if (!user) {
      setWithSidebar(false);
    } else {
      setWithSidebar(!user?.withoutSidebar);
    }
  }, []);

  return withSidebar;
};

export default useWithSidebar;
