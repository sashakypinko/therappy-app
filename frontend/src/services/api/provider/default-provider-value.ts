import { IProvider } from './dto/provider.dto';
import { GendersEnum } from '../../../enums/genders.enum';
import { ServiceCategoriesEnum } from '../../../enums/service-categories.enum';
import { UserStatusesEnum } from '../../../enums/user-statuses.enum';
import { UserTypesEnum } from '../../../enums/user-types.enum';
import { ProviderContactTypesEnum } from './enums/provider-contact-types.enum';

export const defaultProviderDetailsValue = {
  gender: GendersEnum.MALE,
  preferred_gender: GendersEnum.ALL,
  phone: '',
  address: '',
  latitude: 0,
  longitude: 0,
  radius: 5000,
  image: '',
  description: '',
  category_id: ServiceCategoriesEnum.MASSAGE,
  visa: 0,
  abn: '',
  ahrpa_number: '',
  remedial_number: '',
  contacts: {
    [ProviderContactTypesEnum.REFERENCE]: {
      name: '',
      phone: '',
    },
    [ProviderContactTypesEnum.SECOND_REFERENCE]: {
      name: '',
      phone: '',
    },
  },
};

export const defaultProviderValue: IProvider = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  status: UserStatusesEnum.ACTIVE,
  type: UserTypesEnum.PROVIDER,
  details: defaultProviderDetailsValue,
  services: [],
  schedule: {},
  schedule_overrides: {},
  additionals: [],
};
