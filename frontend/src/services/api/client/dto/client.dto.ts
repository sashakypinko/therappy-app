import { IUser } from '../../user/dto/user.dto';
import { GendersEnum } from '../../../../enums/genders.enum';

export interface ClientDetails {
  gender: GendersEnum;
  preferred_gender: GendersEnum;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  image_id?: number;
  description: string;
}

export interface IClient extends IUser {
  details: ClientDetails;
}
