import { AuthStorage } from '../services/storage/auth.storage';
import { UserTypesEnum } from '../enums/user-types.enum';

const useRole = (): UserTypesEnum | null => {
  const user = AuthStorage.getUser();

  return user?.type || null;
};

export default useRole;
