import { ModuleNameEnum } from '../modules/enums/module-name.enum';

export enum UserTypesEnum {
  ADMIN = 1,
  PROVIDER,
  CLIENT,
}

export const UserTypeModules = {
  [UserTypesEnum.ADMIN]: ModuleNameEnum.ADMIN,
  [UserTypesEnum.CLIENT]: ModuleNameEnum.CLIENT,
  [UserTypesEnum.PROVIDER]: ModuleNameEnum.PROVIDER,
};
