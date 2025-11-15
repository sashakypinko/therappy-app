import { IClient } from './dto/client.dto';
import { GendersEnum } from '../../../enums/genders.enum';
import { UserStatusesEnum } from '../../../enums/user-statuses.enum';
import { UserTypesEnum } from '../../../enums/user-types.enum';

export const defaultClientDetailsValue = {
  gender: GendersEnum.MALE,
  preferred_gender: GendersEnum.ALL,
  phone: '',
  address: '',
  latitude: 0,
  longitude: 0,
  image: '',
  description: '',
};

const defaultClientValue: IClient = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  status: UserStatusesEnum.ACTIVE,
  type: UserTypesEnum.CLIENT,
  details: defaultClientDetailsValue,
};

export default defaultClientValue;
