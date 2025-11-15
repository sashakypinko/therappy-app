import { UserTypesEnum } from '../../../../enums/user-types.enum';

export interface SignUpRequestDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  type: UserTypesEnum;
}
