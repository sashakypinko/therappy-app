import { GendersEnum } from '../../../../enums/genders.enum';
import { ServiceCategoriesEnum } from '../../../../enums/service-categories.enum';
import { IAttachment } from '../../attachment/dto/attachment.dto';
import { Schedule } from '../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import { IUser } from '../../user/dto/user.dto';
import { WorkingVisaTypesEnum } from '../../../../enums/working-visa-types.enum';
import { IService } from '../../service/dto/service.dto';

export interface ProviderAdditional {
  id?: number;
  checked: boolean;
  file?: IAttachment | File | null;
  additional_id?: number;
  media_id?: number;
  media?: IAttachment;
  filename?: string;
}

export type ProviderAdditionals = { [key: number]: ProviderAdditional | ProviderAdditional[] };

export type ProviderContact = { name: string; phone: string };
export type ProviderContacts = { [key: number]: ProviderContact };

export interface ProviderDetails {
  gender: GendersEnum;
  preferred_gender: GendersEnum;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  image: string | File | null;
  image_id?: number;
  description: string;
  category_id: ServiceCategoriesEnum;
  visa: WorkingVisaTypesEnum;
  abn: string;
  ahrpa_number: string;
  remedial_number: string;
  contacts: ProviderContacts;
  has_bank_details?: boolean;
}

export interface IProvider extends IUser {
  details: ProviderDetails;
  services: number[] | IService[];
  schedule: Schedule;
  schedule_overrides: Schedule;
  additionals?: ProviderAdditionals | ProviderAdditional[];
}
