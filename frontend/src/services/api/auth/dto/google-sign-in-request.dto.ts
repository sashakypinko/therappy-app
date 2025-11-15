import { UserTypesEnum } from '../../../../enums/user-types.enum';

export interface GoogleSignInRequestDto {
  type: UserTypesEnum;
  token: string;
}
