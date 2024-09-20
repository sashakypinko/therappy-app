import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { UserStatusesEnum } from '../../../../enums/user-statuses.enum';

export interface BankDetails {
  name: string;
  bank_name: string;
  bsb: string;
  account_number: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: UserTypesEnum;
  status: UserStatusesEnum;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  withoutSidebar?: boolean;
  redirect?: string;
  details?: object;
  image_id?: number;
  is_rate_us?: boolean;
}
